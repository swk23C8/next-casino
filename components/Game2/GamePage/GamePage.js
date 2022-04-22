// import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { useState } from 'react';
import Play from '@/components/Game2/Play/Play';




const GamePage = ({ stats = [], game = [] }) => {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [userStats, setUserStats] = useState(stats);
	const [gameState, setGameState] = useState(game);


	const startGame = () => {
		setIsGameStarted(true);
	};


	let data = {
		bDie_1: 0,
		bDie_2: 0,
		bDie_3: 0,
		bScore: 0,
		pDie_1: 0,
		pDie_2: 0,
		pDie_3: 0,
		pScore: 0,
		result: "",
		userId: stats.id,
	};


	return !isGameStarted ? (
		<>
			<p>{"user id: " + userStats.id}</p>
			<p>{"user type: " + userStats.userType}</p>
			<p>{"user name: " + userStats.name}</p>
			<p>{"user email: " + userStats.email}</p>
			<p>{"user email verified: " + userStats.emailVerified}</p>
			<p>{"user gameTokens: " + userStats.gameTokens}</p>
			<p>{"user creation day: " + userStats.createdAt}</p>

			{gameState
				? <>
					<p>{"game id: " + gameState.id}</p>
					<p>{"game bDie_1: " + gameState.bDie_1}</p>
					<p>{"game bDie_2: " + gameState.bDie_2}</p>
					<p>{"game bDie_3: " + gameState.bDie_3}</p>
					<p>{"game bScore: " + gameState.bScore}</p>
					<p>{"game pDie_1: " + gameState.pDie_1}</p>
					<p>{"game pDie_2: " + gameState.pDie_2}</p>
					<p>{"game pDie_3: " + gameState.pDie_3}</p>
					<p>{"game pDie_3: " + gameState.pDie_3}</p>
					<p>{"game pScore: " + gameState.pScore}</p>
					<p>{"game updatedAt: " + gameState.updatedAt}</p>
					<p>{"game createdAt: " + gameState.createdAt}</p>
					<p>{"game userId: " + gameState.userId}</p>
				</>
				: <>
					<p>no game stats</p>

				</>
			}

			{/* button to initiate gameState by calling api */}
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={() => {
					axios
						.put(`/api/gameState/${userStats.id}`, {
							data
						})
						.then(res => {
							setGameState(res.data);
						});
					startGame();
				}}
			>
				Start Game
			</button>

		</>
	) : (
		// <p>game is started</p>
		<Play stats={stats} game={game} />
	)
}

export default GamePage;