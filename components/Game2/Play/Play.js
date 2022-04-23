import Dice from '@/components/Game2/Dice/Dice';
import { useEffect, useState, useReducer, useCallback, Component, useRef, useMemo } from 'react';
import Image from 'next/image'
import axios from 'axios';
import { data } from 'autoprefixer';
import Shrek from 'public/images/latest.png';



const Play = ({ stats = [], game = [] }) => {

	// console.log(game)

	// Banker useStates
	// const bDie_1 = useRef(game.bDie_1);
	// const bDie_2 = useRef(game.bDie_2);
	// const bDie_3 = useRef(game.bDie_3);
	const [bDie_1, setBDie_1] = useState(game.bDie_1);
	const [bDie_2, setBDie_2] = useState(game.bDie_2);
	const [bDie_3, setBDie_3] = useState(game.bDie_3);
	const [bScore, setBScore] = useState(game.bScore);
	const bScoreRef = useRef(bScore);
	const bRef1 = useRef();
	const bRef2 = useRef();
	const bRef3 = useRef();
	const bIntervalID = useRef();


	// Player useStates
	// const pDie_1 = useRef(game.pDie_1);
	// const pDie_2 = useRef(game.pDie_2);
	// const pDie_3 = useRef(game.pDie_3);
	const [pDie_1, setPDie_1] = useState(game.pDie_1);
	const [pDie_2, setPDie_2] = useState(game.pDie_2);
	const [pDie_3, setPDie_3] = useState(game.pDie_3);
	const [pScore, setPScore] = useState(game.pScore)
	const pScoreRef = useRef(pScore);
	const [pBet, setPBet] = useState(game.pBet);
	const pRef1 = useRef();
	const pRef2 = useRef();
	const pRef3 = useRef();
	const pIntervalID = useRef();

	// game useStates
	const result = useRef(game.result);

	// api call to make bet

	const makeBet = (e) => {
		e.preventDefault();
		axios.patch('/api/gameAction/makeBet', {
			bet: e.target.bet.value * 1,
		})
			.then(res => {
				setPBet(res.data.bet);
				rollBankerDice();
			})
			.catch(err => {
				console.log(err)
			})
	}

	// function to calculate dice score
	const score = (dice) => {
		dice.sort();
		if (dice[0] === 0 || dice[1] === 0 || dice[2] === 0) {
			return 0;
		}
		if (dice[0] === dice[1] && dice[1] === dice[2]) return 10;
		if (dice.join() === "4,5,6") return 10;
		if (dice.join() === "1,2,3") return -1;
		if (dice[0] !== dice[1] && dice[1] !== dice[2] && dice[1] !== dice[3]) return 0;
		if (dice[0] === dice[1] || dice[1] === dice[2] || dice[1] === dice[3]) {
			const pointDie = dice[0] === dice[1] ? dice[2] : dice[0];
			return pointDie === 1 ? -1 : pointDie === 6 ? 10 : pointDie;
		}
	}

	// function to roll dice
	const rollBankerDice = () => {
		if (bScoreRef.current === null || bScoreRef.current === -2 || bScoreRef.current === 0) {
			bIntervalID.current = setInterval(() => {
				if (bScoreRef.current !== null && bScoreRef.current !== -2 && bScoreRef.current !== 0) {
					// gameResult(bScore.current, pScore.current);
					clearInterval(bIntervalID.current);
					return;
				}
				bRef1.current.rollDice();
				bRef2.current.rollDice();
				bRef3.current.rollDice();

			}, 2000);
		}
		else {
			console.log("dice not rolling as condition is false")
		}
	}

	// function to roll dice
	const rollPlayerDice = () => {
		if (pScoreRef.current === null || pScoreRef.current === -2 || pScoreRef.current === 0) {
			pIntervalID.current = setInterval(() => {
				if (pScoreRef.current !== null && pScoreRef.current !== -2 && pScoreRef.current !== 0) {
					// gameResult(bScore.current, pScore.current);
					clearInterval(pIntervalID.current);
					return;
				}
				pRef1.current.rollDice();
				pRef2.current.rollDice();
				pRef3.current.rollDice();

			}, 2000);
		}
		else {
			console.log("dice not rolling as condition is false")
		}
	}

	// logic for banker score ref
	useEffect(() => {
		bScoreRef.current = bScore;
	}, [bScore]);

	// logic for player score ref
	useEffect(() => {
		pScoreRef.current = pScore;
	}, [pScore]);

	useEffect(() => {
		setBScore(score([bDie_1, bDie_2, bDie_3]));
		setPScore(score([pDie_1, pDie_2, pDie_3]))
		console.log("")
		console.log("current banker score: " + bScore)
		console.log("current player score: " + pScore)
	}, [bDie_1, bDie_2, bDie_3, bScore, pDie_1, pDie_2, pDie_3, pScore])

	return (
		<>
			{/* <p>game is started</p> */}
			<div className="grid min-h-max it grid-cols-3 grid-rows-2 gap-2 w-auto h-auto">
				{/* container to show dice */}
				<div className="dice-container box row-start-1 row-span-1">
					<div className="grid overflow-hidden grid-cols-4 grid-rows-2 gap-2 w-full h-full my-auto">

						<div className="dice row-start-1 col-start-1 col-span-3">
							<p className="flex flex-col justify-center items-center font-bold text-4xl"> Banker Dice</p>
							<Dice refs={[bRef1, bRef2, bRef3, setBDie_1, setBDie_2, setBDie_3]} />
						</div>

						<div className="dice-result row-start-1 col-start-4 col-span-1">
							<div className="flex flex-col justify-center items-center h-full">
								{/* <button onClick={() => {
									rollBankerDice();
								}}>
									Roll Banker Dice
								</button> */}
								<p className="font-bold text-3xl">{"score: " + bScore}</p>
							</div>
						</div>

						<div className="dice row-start-2 col-start-1 col-span-3">
							<p className="flex flex-col justify-center items-center font-bold text-4xl">Player Dice</p>
							<Dice refs={[pRef1, pRef2, pRef3, setPDie_1, setPDie_2, setPDie_3]} />
						</div>

						<div className="dice-result row-start-2 col-start-4 col-span-1">
							<div className="flex flex-col justify-center items-center h-full">
								{/* <button onClick={() => {
									rollPlayerDice();
								}}>
									Roll Player Dice
								</button> */}
								<p className="font-bold text-3xl">{"score: " + pScore}</p>
							</div>
						</div>

					</div>
				</div>
				{/* container  to show ID, Token amount, Bet amount form with Bet button and Game Result*/}
				<div className="game-container box row-start-1 row-span-1 col-start-2 col-end-3 text-center">
					<div className="game-info">
						<p>Game ID: {game.id}</p>
						<p>Token Amount: {stats.gameTokens}</p>
						<p>Bet Amount: {pBet}</p>
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
						<p>HOTKEYS</p>
						<p>SPACE: bet</p>
						<p>E: halve bet</p>
						<p>R: double bet</p>
						<p>D: roll dice</p>
					</div>
				</div>
				{/* container to show game rules/outcomes/explanations */}
				<div className="game-rules box row-start-1 row-span-2 col-start-3 col-end-4">
					<table className="w-full min-h-[50vh] shadow-md">
						<thead>
							<tr>
								<th className="bg-red-700 text-white p-1 w-auto">Name</th>
								<th className="bg-red-700 text-white p-1 w-auto">Example</th>
								<th className="bg-red-700 text-white p-1 w-auto">Outcome</th>
								<th className="bg-red-700 text-white p-1 w-auto">Comment</th>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-red-100 text-black">
								<td className="">Triple</td>
								<td className="">
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142306.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142306.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142306.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
								</td>
								<td className="">WIN</td>
								<td className="">All three dice show the same number.<br /> 6-6-6 is the highest roll,<br />5-5-5 is the next highest, etc.<br />Any triple is an instant win.</td>
							</tr>
							<tr className="bg-red-200 text-black">
								<td className="">4-5-6</td>
								<td className="">
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142304.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142305.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142306.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
								</td>
								<td className="">WIN</td>
								<td className="">Sequential 4-5-6;<br /> this is an instant win.</td>
							</tr>
							<tr className="bg-red-100 text-black">
								<td className="">Points</td>
								<td className="">
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142304.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142304.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142305.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
								</td>
								<td className="">n points</td>
								<td className="">
									One pair plus any other value;<br /> the odd die is the point value.<br /> Possible point values range from 2 to 5<br />When the point value is 6, it is an instant win; <br />When the point value is 1, it is an instant loss.
								</td>
							</tr>
							<tr className="bg-red-200 text-black">
								<td className="">1-2-3</td>
								<td className="">
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142301.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142302.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142303.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
								</td>
								<td className="">LOSE</td>
								<td className="">Sequential 1-2-3;<br /> this is an instant loss.</td>
							</tr>
							<tr className="bg-red-100 text-black">
								<td className="">Indeterminate</td>
								<td className="">
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142303.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142305.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
									<Image
										src="https://cdn-icons-png.flaticon.com/512/142/142306.png"
										alt="Die_face_6b"
										// layout='fill'
										width={35}
										height={35}
									/>
								</td>
								<td className="">Re-Roll</td>
								<td className="">
									Any combination that does not result in a <br />triple, sequential, or points is an <br />indeterminate outcome and requires a re-roll.
								</td>
							</tr>
						</tbody>
					</table>
					<Image
						src={Shrek}
						alt="Hooman Shrek"
						// layout='fill'
						width={625}
						height={300}
					/>
					add feature to get more coins/ads/captcha/something? here
				</div>
				{/* container for chat/log */}
				<div className="box row-start-2 row-span-1 col-start-1 col-end-3">
					<Image
						src={Shrek}
						alt="Hooman Shrek"
						width={1265}
						height={435}
					/>
				</div>
			</div>
		</>
	);
}

export default Play;