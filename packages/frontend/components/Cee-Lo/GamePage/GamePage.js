// import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { useState } from 'react';
import Play from '@/components/Cee-Lo/Play/Play';


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
		pBet: 0,
		result: "",
		userId: stats.id,
	};

	return !isGameStarted ? (
		<>
			{/* <p>{"user id: " + userStats.id}</p>
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
					<p>{"game pBet: " + gameState.pBet}</p>
					<p>{"game updatedAt: " + gameState.updatedAt}</p>
					<p>{"game createdAt: " + gameState.createdAt}</p>
					<p>{"game userId: " + gameState.userId}</p>
				</>
				: <>
					<p>no game stats</p>

				</>
			} */}

			<h1 className="text-center text-xl font-medium text-black-800">
				⚠️This game is in open beta stages.⚠️<br /><br />Please feel free to try out the available features and report any bugs!
			</h1>
			<h1 className="flex justify-center text-xl font-medium text-black-800">
				{/* Please feel free to try out the available features and report any bugs! */}
			</h1>
			<h2 className="flex justify-center text-2xl font-bold text-black-800 py-5">
				Welcome to Cee-Lo!
			</h2>
			<h2 className="text-center text-xl font-bold text-black">
				⚠️This is a single-player game that requires an account!⚠️
			</h2>

			{/* button to initiate gameState by calling api */}
			<div className="flex justify-center py-5">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => {
						if (userStats.id === 'GUEST') {
							// setGameState(data);
							startGame();
						}
						else {
							axios
								.put(`/api/gameState/${userStats.id}`, {
									data
								})
								.then(res => {
									setGameState(res.data);
								});
							startGame();
						}
					}}
				>
					Start Game
				</button>
			</div>

		</>
	) : (
		// <p>game is started</p>
		<Play stats={stats} game={game} />
	)
}

export default GamePage;