

// const objectGrid = {
// 	1: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	2: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	3: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	4: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	5: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	6: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	7: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	8: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	9: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// }
// console.log(objectGrid)

// const UltimateGrid = [
// 	[
// 		"1_1", "1_2", "1_3",
// 		"1_4", "1_5", "1_6",
// 		"1_7", "1_8", "1_9",
// 	],
// 	[
// 		"2_1", "2_2", "2_3",
// 		"2_4", "2_5", "2_6",
// 		"2_7", "2_8", "2_9",
// 	],
// 	[
// 		"3_1", "3_2", "3_3",
// 		"3_4", "3_5", "3_6",
// 		"3_7", "3_8", "3_9",
// 	],
// 	[
// 		"4_1", "4_2", "4_3",
// 		"4_4", "4_5", "4_6",
// 		"4_7", "4_8", "4_9",
// 	],
// 	[
// 		"5_1", "5_2", "5_3",
// 		"5_4", "5_5", "5_6",
// 		"5_7", "5_8", "5_9",
// 	],
// 	[
// 		"6_1", "6_2", "6_3",
// 		"6_4", "6_5", "6_6",
// 		"6_7", "6_8", "6_9",
// 	],
// 	[
// 		"7_1", "7_2", "7_3",
// 		"7_4", "7_5", "7_6",
// 		"7_7", "7_8", "7_9",
// 	],
// 	[
// 		"8_1", "8_2", "8_3",
// 		"8_4", "8_5", "8_6",
// 		"8_7", "8_8", "8_9",
// 	],
// 	[
// 		"9_1", "9_2", "9_3",
// 		"9_4", "9_5", "9_6",
// 		"9_7", "9_8", "9_9",
// 	],
// ]


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