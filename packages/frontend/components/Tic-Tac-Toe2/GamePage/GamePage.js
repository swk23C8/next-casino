// import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { useState } from 'react';
import Lobby from '@/components/Tic-Tac-Toe2/Lobby/Lobby';


const GamePage = ({ stats = [], game = [] }) => {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [userStats, setUserStats] = useState(stats);
	const [gameState, setGameState] = useState(game);

	const startGame = () => {
		setIsGameStarted(true);
	};

	let data = {
		// bDie_1: 0,
		// bDie_2: 0,
		// bDie_3: 0,
		// bScore: 0,
		// pDie_1: 0,
		// pDie_2: 0,
		// pDie_3: 0,
		// pScore: 0,
		pBet: 0,
		// result: "",
		userId: stats.id,
	};

	return !isGameStarted ? (
		<>

			<h1 className="flex justify-center text-xl font-medium text-black">
				This game is in early alpha stages.
			</h1>
			<h1 className="flex justify-center text-xl font-medium text-black">
				Please feel free to try out the available features and report any bugs!
			</h1>
			<h2 className="flex justify-center text-2xl font-bold text-black py-5">
				Welcome to ULTIMATE Tic Tac Toe!
			</h2>
			<h2 className="text-center text-2xl font-bold text-black">
				⚠️This is a multiplayer game that requires 2 people per game! ⚠️
			</h2>

			{/* button to initiate gameState by calling api */}
			<div className="flex justify-center py-5">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => {
						if ((userStats.id).startsWith('GUEST')) {
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
		<Lobby stats={stats} game={game} />
	)
}

export default GamePage;