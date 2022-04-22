// chat with list
// history with table

import { useEffect, useState, useReducer, useCallback, Component, useRef, useMemo } from 'react';
import Image from 'next/image'
import Dice from "react-dice-roll";
import styles from './Round.module.scss';


const Round = ({ stats = [] }) => {
	const [userStats, setUserStats] = useState(stats);

	// Banker useStates
	const [bDie_1, setBDie_1] = useState(null);
	const [bDie_2, setBDie_2] = useState(null);
	const [bDie_3, setBDie_3] = useState(null);
	const [bScore, setBScore] = useState(null);
	// const [bRoll, setBRoll] = useState(false);
	// const [bDice, setBDice] = useState([null, null, null]);

	// Player useStates
	const [pDie_1, setPDie_1] = useState(null);
	const [pDie_2, setPDie_2] = useState(null);
	const [pDie_3, setPDie_3] = useState(null);
	const [pScore, setPScore] = useState(null);
	const [pRoll, setPRoll] = useState(false);
	const [pMoney, setPMoney] = useState(1000);
	const [pBet, setPBet] = useState(0);

	// game useStates
	const [result, setResult] = useState(null);
	const [isRoundStarted, setIsRoundStarted] = useState(true)
	const [roundCount, setRoundCount] = useState(1)
	const [roundsStatistic, setRoundsStatistic] = useState([]);
	const [showRoundStatistic, setShowRoundStatistic] = useState(false);

	// testing react-toastify
	const notify = () => toast(result);

	return (
		<div className="max-h-screen flex flex-col">
			<div className="grid min-h-max it grid-cols-3 grid-rows-2 gap-2 w-auto h-auto">
				<div className="box row-start-1 row-span-1">
					<div className="grid overflow-hidden grid-cols-2 grid-rows-4 gap-2 w-auto h-auto">
						<div className="diceContainer row-start-1 row-span-2">
							<h2> Banker</h2>
							<div className="flex justify-center space-x-3">
								<div className="item w-32 h-32">
									<Dice
										onRoll={(value) => {
											setBDie_1(value);

										}}
										size={85}
										cheatValue={1}
										// ref={bRef1}
										// disabled={bDie_1 !== null} />
										disabled={true} />
								</div>
								<div className="item w-32 h-32">
									<Dice
										onRoll={(value) => {
											setBDie_2(value)
										}}
										size={85}
										cheatValue={1}
										// ref={bRef2}
										// disabled={bDie_2 !== null} />
										disabled={true} />
								</div>
								<div className="item w-32 h-32">
									<Dice
										onRoll={(value) => {
											setBDie_3(value)
										}}
										size={85}
										cheatValue={2}
										// ref={bRef3}
										// disabled={bDie_3 !== null} />
										disabled={true} />
								</div>
							</div>
						</div>

						<h3 className="diceResult row-start-1 row-span-2">{bScore === -2 ? "Roll Banker's dice" : "some point"}</h3>

						<div className="diceContainer row-start-3 row-span-2">
							<h2>Player</h2>
							<div className="flex justify-center space-x-3">
								<div className="item w-32 h-32">
									<Dice
										onRoll={(value) => {
											setPDie_1(value)
											gameResult(bScore, pScore);
										}}
										size={85}
										// ref={pRef1}
										cheatValue={1}
										disabled={pDie_1 !== null || pBet <= 0} />
								</div>
								<div className="item w-32 h-32">
									<Dice
										onRoll={(value) => {
											setPDie_2(value)
											gameResult(bScore, pScore);
										}}
										size={85}
										// ref={pRef2}
										cheatValue={1}
										disabled={pDie_2 !== null || pBet <= 0} />
								</div>
								<div className="item w-32 h-32">
									<Dice
										onRoll={(value) => {
											setPDie_3(value)
											gameResult(bScore, pScore);
										}}
										size={85}
										// ref={pRef3}
										cheatValue={3}
										disabled={pDie_3 !== null || pBet <= 0} />
								</div>
							</div>
						</div>

						<h3 className="diceResult row-span-2">{"some point"}</h3>
					</div>
				</div>
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
				<div className="box row-start-1 row-span-1 col-start-2 col-end-3">
					<div className="flex flex-col items-center">
						<div className="item">ID: {userStats.id}</div>
						<div className="item">Tokens: {userStats.gameTokens}</div>
						<div className="item">
							<form id="test"
								// onSubmit={submitBet1}
								className={styles.makeBet}>
								<label>
									Bet Amount:
									<input type="number" name="bet" />
								</label>
							</form>
						</div>
						<button form="test" className={styles.betButton}>
							BET
						</button>

						<div className="">GAME RESULT</div>
						<div className="">HOTKEYS</div>
						<div className="">SPACE: bet</div>
						<div className="">E: halve bet</div>
						<div className="">R: double bet</div>
						<div className="">D: roll dice</div>
					</div>
				</div>
				<div className="box row-start-1 row-span-2 col-start-3 col-end-4">
					<table className="w-full shadow-md">
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
			</div>
		</div>
	);

}

export default Round;