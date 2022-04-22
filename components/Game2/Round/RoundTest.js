// import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';




const Round = ({ stats = [], gameState = [] }) => {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [userStats, setUserStats] = useState(stats);
	const [gameStats, setGameStats] = useState(gameState);

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

			{gameStats
				? <>
					<p>{"game id: " + gameStats.id}</p>
					<p>{"game bDie_1: " + gameStats.bDie_1}</p>
					<p>{"game bDie_2: " + gameStats.bDie_2}</p>
					<p>{"game bDie_3: " + gameStats.bDie_3}</p>
					<p>{"game bScore: " + gameStats.bScore}</p>
					<p>{"game pDie_1: " + gameStats.pDie_1}</p>
					<p>{"game pDie_2: " + gameStats.pDie_2}</p>
					<p>{"game pDie_3: " + gameStats.pDie_3}</p>
					<p>{"game pDie_3: " + gameStats.pDie_3}</p>
					<p>{"game pScore: " + gameStats.pScore}</p>
					<p>{"game updatedAt: " + gameStats.updatedAt}</p>
					<p>{"game createdAt: " + gameStats.createdAt}</p>
					<p>{"game userId: " + gameStats.userId}</p>
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
							setGameStats(res.data);
							console.log(res)
						});
						startGame();
				}}
			>
				Start Game
			</button>

		</>
	) : (
		<p>game is started</p>
	)
}

export default Round;