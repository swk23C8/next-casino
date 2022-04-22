import Dice from '@/components/Game2/Dice/Dice';
import { useEffect, useState, useReducer, useCallback, Component, useRef, useMemo } from 'react';
import Image from 'next/image'
import axios from 'axios';
import { data } from 'autoprefixer';



const Play = ({ stats = [], game = [] }) => {

	// Banker useStates
	const bDie_1 = useRef(game.bDie_1);
	const bDie_2 = useRef(game.bDie_2);
	const bDie_3 = useRef(game.bDie_3);
	const bScore = useRef(game.bScore);
	const bRef1 = useRef();
	const bRef2 = useRef();
	const bRef3 = useRef();
	const bIntervalID = useRef();


	// Player useStates
	const pDie_1 = useRef(game.pDie_1);
	const pDie_2 = useRef(game.pDie_2);
	const pDie_3 = useRef(game.pDie_3);
	const pScore = useRef(game.pScore);
	const pBet = useRef(game.pBet);
	const pRef1 = useRef();
	const pRef2 = useRef();
	const pRef3 = useRef();
	const pIntervalID = useRef();

	// game useStates
	const result = useRef(game.result);

	// api call to make bet

	const makeBet = (e) => {
		e.preventDefault();
		axios.post('/api/gameAction/makeBet', {
			bet: pBet.current,
			userId: stats.id
		})
			.then(res => {
				console.log(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}




	return (
		<>
			<p>game is started</p>

			{/* container to show dice */}
			<div className="dice-container">
				<p>Banker Dice</p>
				<Dice refs={[bRef1, bRef2, bRef3, bDie_1, bDie_2, bDie_3]} />
				<button onClick={() => {
					bRef1.current.rollDice();
					bRef2.current.rollDice();
					bRef3.current.rollDice();
				}}>
					Roll Banker Dice
				</button>
				<p>Player Dice</p>
				<Dice refs={[pRef1, pRef2, pRef3, pDie_1, pDie_2, pDie_3]} />
				<button onClick={() => {
					pRef1.current.rollDice();
					pRef2.current.rollDice();
					pRef3.current.rollDice();
				}}>
					Roll Player Dice
				</button>
			</div>

			{/* container  to show ID, Token amount, Bet amount form with Bet button and Game Result*/}
			<div className="game-container">
				<div className="game-info">
					<p>ID: {game.id}</p>
					<p>Token Amount: {game.tokenAmount}</p>
					<p>Bet Amount: {game.betAmount}</p>
					<p>Game Result: {game.result}</p>
				</div>
				<div className="game-form">
					<p>Bet</p>
					<form
						onSubmit={
							makeBet
						}
					// className={ }
					>
						<label>
							Bet:
							<input type="number" name="bet" />
						</label>
						<input
							// className={styles.betButton}
							type="submit"
							value="BET"
						/>
					</form>
				</div>
			</div>

			{/* button to add token amount by 100 */}
			<button onClick={() => {
				// fetch('/api/gameAction/addToken', {
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 	},
				// 	body: JSON.stringify({
				// 		userId: stats.id,
				// 		tokenAmount: 100,
				// 	}),
				// })
				// 	.then(res => {
				// 		res.json()
				// 		console.log(res)
				// 	})
				// 	.then(data => {
				// 		console.log(data);
				// 		if (data.error) {
				// 			alert(data.error);
				// 		} else {
				// 			setGameState(data.game);
				// 			setUserStats(data.stats);
				// 		}
				// 	})
				// 	.catch(err => console.log(err));
			}}>
				Add 100 Tokens
			</button>

		</>
	);
}

export default Play;