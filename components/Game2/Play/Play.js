import Dice from '@/components/Game2/Dice/Dice';
import { useEffect, useState, useReducer, useCallback, Component, useRef, useMemo } from 'react';
import Image from 'next/image'
import axios from 'axios';
import { data } from 'autoprefixer';



const Play = ({ stats = [], game = [] }) => {

	// console.log(game)

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
				bRef1.current.rollDice();
				bRef2.current.rollDice();
				bRef3.current.rollDice();
			})
			.catch(err => {
				console.log(err)
			})
	}

	


	return (
		<>
			{/* <p>game is started</p> */}
			<div className="grid min-h-max it grid-cols-3 grid-rows-2 gap-2 w-auto h-auto">
				{/* container to show dice */}
				<div className="dice-container box row-start-1 row-span-1">
					<div className="grid overflow-hidden grid-cols-2 grid-rows-4 gap-2 w-auto h-auto">
						<div className="diceContainer row-start-1 row-span-2">
							<p>Banker Dice</p>
							<Dice refs={[bRef1, bRef2, bRef3, bDie_1, bDie_2, bDie_3]} />
						</div>
						<div className="diceResult row-start-1 row-span-2">
							<button onClick={() => {
								bRef1.current.rollDice();
								bRef2.current.rollDice();
								bRef3.current.rollDice();
							}}>
								Roll Banker Dice
							</button>
						</div>
						<div className="diceContainer row-start-3 row-span-2">
							<p>Player Dice</p>
							<Dice refs={[pRef1, pRef2, pRef3, pDie_1, pDie_2, pDie_3]} />
						</div>
						<div className="diceResult row-span-2">
							<button onClick={() => {
								pRef1.current.rollDice();
								pRef2.current.rollDice();
								pRef3.current.rollDice();
							}}>
								Roll Player Dice
							</button>
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
								<th className="bg-blue-700 text-white p-1 w-auto">Name</th>
								<th className="bg-blue-700 text-white p-1 w-auto">Example</th>
								<th className="bg-blue-700 text-white p-1 w-auto">Outcome</th>
								<th className="bg-blue-700 text-white p-1 w-auto">Comment</th>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-blue-100 text-black">
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
							<tr className="bg-blue-200 text-black">
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
							<tr className="bg-blue-100 text-black">
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
							<tr className="bg-blue-200 text-black">
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
							<tr className="bg-blue-100 text-black">
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
					add feature to get more coins/ads/captcha/something? here
				</div>
				{/* container for chat/log */}
				<div className="box row-start-2 row-span-1 col-start-1 col-end-3">
					<div className="grid overflow-hidden grid-cols-12 grid-rows-6 gap-1">
						<div className="box2 row-start-1 row-span-1 col-start-1 col-span-12">1</div>
						<div className="box2 row-start-2 row-span-3 col-start-1 col-span-1">2</div>
						<div className="box2 row-start-5 row-span-3 col-start-1 col-span-1">3</div>
						<div className="box2 row-start-2 row-span-6 col-start-2 col-span-11">4</div>
						<div className="box2 row-start-8 row-span-1 col-start-1 col-span-11">5</div>
						<div className="box2 row-start-8 row-span-1 col-start-12 col-span-1">6</div>
					</div>
					<div className="grid overflow-hidden grid-cols-12 grid-rows-6 gap-1">
						<div className="box2 row-start-1 row-span-1 col-start-1 col-span-12">1</div>
						<div className="box2 row-start-2 row-span-3 col-start-1 col-span-1">2</div>
						<div className="box2 row-start-5 row-span-3 col-start-1 col-span-1">3</div>
						<div className="box2 row-start-2 row-span-6 col-start-2 col-span-11">4</div>
						<div className="box2 row-start-8 row-span-1 col-start-1 col-span-11">5</div>
						<div className="box2 row-start-8 row-span-1 col-start-12 col-span-1">6</div>
					</div>
					<div className="grid overflow-hidden grid-cols-12 grid-rows-3 gap-1">
						<div className="box2 row-start-2 row-span-3 col-start-1 col-span-1">2</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Play;