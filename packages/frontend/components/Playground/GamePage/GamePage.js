import axios from 'axios';
import { useState } from 'react';
import Lobby from '@/components/Playground/Lobby/Lobby';
import Image from 'next/image'

const GamePage = ({ stats = [], game = [] }) => {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [userStats, setUserStats] = useState(stats);
	const [gameState, setGameState] = useState(game);
	const [sprites, setSprites] = useState(
		['adventurer', 'adventurer-neutral', 'avataaars', 'big-ears', 'big-ears-neutral', 'big-smile',
			'bottts', 'croodles', 'croodles-neutral', 'identicon', 'initials', 'micah', 'miniavs',
			'open-peeps', 'personas', 'pixel-art', 'pixel-art-neutral'
		]
	)
	const [randomSprite, setRandomSprite] = useState(sprites[Math.floor(Math.random() * sprites.length)]);


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

	const getRandomSprite = () => {
		return sprites[Math.floor(Math.random() * sprites.length)]
	}

	return !isGameStarted ? (
		<>

			<h1 className="flex justify-center text-xl font-medium text-black">
				This is a playground where we test things!
			</h1>
			<h1 className="flex justify-center text-xl font-medium text-black">
				Please feel free to try out the available features and report any bugs!
			</h1>
			<h2 className="flex justify-center text-2xl font-bold text-black py-5">
				Welcome to the Playground!
			</h2>
			<h2 className="text-center text-2xl font-bold text-black">
				⚠️Currently Testing Card Games (Go-Stop/Matgo) ⚠️
			</h2>



			<h2 className="text-center text-2xl font-bold text-black">
				<Image src={`https://avatars.dicebear.com/api/${randomSprite}/${stats.id}.svg`} height={100} width={100} alt="test" />
				<button
					onClick={() => {
						setRandomSprite(getRandomSprite());
						console.log("lol")
					}}
				>
					Get random sprite
				</button>
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
					// disabled={true}
				>
					Start Game (disabled currently)
				</button>
			</div>

		</>
	) : (
		<Lobby stats={stats} game={game} />
	)
}

export default GamePage;