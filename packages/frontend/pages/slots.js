import Head from 'next/head';
// import Layout from '@/components/Layout';
import Layout3 from '@/components/Layout3';
import GamePage from '@/components/Slots/GamePage/GamePage';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

import dynamic from 'next/dynamic'
const PixiApp = dynamic(
	() => import('../components/Slots/PixiApp/PixiApp'),
	{ ssr: false }
);

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const redirect = {
		redirect: {
			destination: '/',
			permanent: false,
		},
	};

	// Check if the user is authenticated
	if (!session) {
		return redirect;
	}

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

const Game = ({ stats = [], game = [] }) => {

	return (
		<>
			<Layout3 />
			<Head>
				<title>Slots | Game</title>
				<meta name="description" content="Game page" />
			</Head>
			{/* <GamePage stats={stats} game={game} /> */}
			<PixiApp />
		</>
	);
};

export default Game;
