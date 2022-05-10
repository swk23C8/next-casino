// import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { useState } from 'react';
import Play from '@/components/Poker/Play/Play';


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

			<h1 className="flex justify-center text-xl font-medium text-black">
				⚠️This game is in closed alpha stages.⚠️
			</h1>
			<h1 className="flex justify-center text-xl font-medium text-black">
				Please feel free to try out the available features and report any bugs!
			</h1>
			<h2 className="flex justify-center text-2xl font-bold text-black py-5">
				Welcome to Poker!
			</h2>
			<h2 className="text-center text-2xl font-bold text-black">
				⚠️This is a multiplayer game that requires more than 1 person!⚠️
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
		// <Play stats={stats} game={game} />
		<>Game is Not available for this account 😰</>
	)
}

export default GamePage;