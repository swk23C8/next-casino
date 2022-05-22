

import { useState } from "react";
import Head from 'next/head';
// import Layout from '@/components/Layout';
import Layout3 from '@/components/Layout3';
import GamePage from '@/components/Playground/GamePage/GamePage';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';


export async function getServerSideProps(context) {
	const session = await getSession(context);
	const redirect = {
		redirect: {
			destination: '/',
			permanent: false,
		},
	};

	// Check if the user is authenticated
	// If not, assign guest profile
	if (!session) {
		const randomGuest = "GUEST_" + Math.floor(Math.random() * 100) + 1;
		return {
			props: {
				stats: {
					createdAt: 'N/A',
					email: 'GUEST@DOMAIN.COM',
					emailVerified: null,
					gameTokens: 0,
					id: randomGuest,
					image: '',
					name: randomGuest,
					userType: "GUEST",
				},
				game: {
					bDie_1: 0,
					bDie_2: 0,
					bDie_3: 0,
					bScore: 0,
					createdAt: "",
					id: randomGuest + "_game",
					pBet: 0,
					pDie_1: 0,
					pDie_2: 0,
					pDie_3: 0,
					pScore: 0,
					result: "",
					updatedAt: "",
					userId: randomGuest,
				}
			}
		}
	}
	else {
		// Retrieve the authenticated user
		const stats = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		// Retrive the user's game state
		const game = await prisma.gameState.findUnique({
			where: { userId: stats.id },
		});

		// Pass the data to the Stats page
		return {
			props: {
				stats: JSON.parse(JSON.stringify(stats)),
				game: JSON.parse(JSON.stringify(game)),
			},
		};
	}
}

const Playground = ({ stats = [], game = [] }) => {
	return (
		<>
			<Layout3 />
			<Head>
				<title>Playground | Game</title>
				<meta name="Playground" content="Game page" />
			</Head>
			<div className="mx-[1vw]">
				<GamePage stats={stats} game={game} />
			</div>
		</ >
	);
}

export default Playground;