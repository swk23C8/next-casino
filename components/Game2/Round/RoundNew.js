// chat with list
// history with table

import { useEffect, useState, useReducer, useCallback, Component, useRef, useMemo } from 'react';
import Image from 'next/image'
import Dice from "react-dice-roll";
import styles from './Round.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Round = () => {
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

	const submitBet1 = async (event) => {
		event.preventDefault();
		const bet = event.target.bet.value;
		const res = await fetch('/api/makeBet', {
			body: JSON.stringify({
				bet: bet,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		const result = await res.json();
		setPBet(Number(result.bet));
		console.log(`You bet: ${result.bet}`);
		console.log(result.bet);
		handleBankerDiceStart();
	};


	const submitBet2 = (event) => {
		const bet = event.target.bet.value;
		console.log("bet: ", bet);
	}


	const score = (dice) => {
		dice.sort();
		if (dice[0] === null || dice[1] === null || dice[2] === null) {
			return -2;
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

	const pointChecker = (score, currentPlayer) => {
		// check if die values are null
		if (score === -2) {
			return "Roll " + currentPlayer + "'s dice";
		}
		if (score === 10) {
			return "INSTANT WIN";
		}
		if (score === -1) {
			return "INSTANT LOSS";
		}
		if (score === 0) {
			// return "INDETERMINATE: ROLL AGAIN!";
			return "Roll " + currentPlayer + "'s dice";
		}
		return "score: " + score;

	}

	// reset round after round is finished
	const resetRound = () => {
		setBDie_1(null);
		setBDie_2(null);
		setBDie_3(null);
		setBScore(null);
		setPDie_1(null);
		setPDie_2(null);
		setPDie_3(null);
		setPScore(null);
		setPRoll(false);
		// setPMoney(1000);
		setPBet(0);
		setResult(null);
		setIsRoundStarted(true);
		setRoundCount(roundCount + 1);
		setShowRoundStatistic(false);
	}

	// game result finder
	const gameResult = () => {
		console.log(pMoney);
		console.log(pBet);
		if (bScoreRef.current === 10) {
			setResult("BANKER WINS");
			return "BANKER WINS";
		}
		else if (pScoreRef.current === 10) {
			setResult("PLAYER WINS");
			return "PLAYER WINS";
		}
		else if (pScoreRef.current === -2) {
			setResult("Please roll your dice!");
			return "Please roll your dice!";
		}
		else if (bScoreRef.current === pScoreRef.current) {
			setResult("PUSH");
			return "PUSH";
		}
		else if (bScoreRef.current > pScoreRef.current) {
			setResult("BANKER WINS");
			console.log(pMoney - pBet);

			setPMoney(currentMoney => currentMoney - pBet);
			return "BANKER WINS";
		}
		else if (bScoreRef.current < pScoreRef.current) {
			setResult("PLAYER WINS");
			console.log(pMoney + pBet);
			console.log(typeof pMoney);
			console.log(typeof pBet);
			setPMoney(currentMoney => currentMoney + pBet);
			return "PLAYER WINS";
		}
		else {
			setResult("Please place a bet!");
			return "Please place a bet!";
		}
	}

	const bRef1 = useRef();
	const bRef2 = useRef();
	const bRef3 = useRef();
	const bIntervalID = useRef();
	const bScoreRef = useRef(bScore);

	const pRef1 = useRef();
	const pRef2 = useRef();
	const pRef3 = useRef();
	const pIntervalID = useRef();
	const pScoreRef = useRef(pScore);
	// const pMoneyRef = useRef(pMoney);


	const handleBankerDiceStart = () => {
		console.log("testing case: " + bScoreRef.current)
		if (bScoreRef.current === null || bScoreRef.current === -2 || bScoreRef.current === 0) {
			bIntervalID.current = setInterval(() => {
				// setBScore(score([bDie_1, bDie_2, bDie_3]))
				if (bScoreRef.current !== null && bScoreRef.current !== -2 && bScoreRef.current !== 0) {
					console.log("stop dice case: " + bScoreRef.current)
					console.log("current banker: " + bScoreRef.current)
					console.log("current player: " + pScoreRef.current)
					// setBScore(score([bDie_1, bDie_2, bDie_3]))
					gameResult(bScore.current, pScore.current);
					clearInterval(bIntervalID.current);
					return;
				}
				console.log("roll dice case: " + bScoreRef.current)
				bRef1.current.rollDice();
				bRef2.current.rollDice();
				bRef3.current.rollDice();

			}, 2000);
		}
		else {
			console.log("dice not rolling as condition is false")
		}
	}

	const handlePlayerDiceStart = () => {
		if (pScoreRef.current === null || pScoreRef.current === -2 || pScoreRef.current === 0) {
			pIntervalID.current = setInterval(() => {
				if (pScoreRef.current !== null && pScoreRef.current !== -2 && pScoreRef.current !== 0) {
					setPScore(score([pDie_1, pDie_2, pDie_3]))
					gameResult(bScore.current, pScore.current);
					clearInterval(pIntervalID.current);
					resetRound();
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

	// // logic for player money ref
	// useEffect(() => {
	// 	pMoneyRef.current = pMoneyRef;
	// }, [pMoney]);

	useEffect(() => {
		if (bScore === 10) {
			setResult("BANKER WINS");
			setPDie_1(1);
			setPDie_2(2);
			setPDie_3(3);
		}

		setBScore(score([bDie_1, bDie_2, bDie_3]))
		setPScore(score([pDie_1, pDie_2, pDie_3]))
		// bScoreRef.current = bScore;
		console.log("useEffect current bScore on render: " + bScore);
		console.log("useEffect current pScore on render: " + pScore);

	}, [bDie_1, bDie_2, bDie_3, bScore, pDie_1, pDie_2, pDie_3, pScore]);

	return (
		<div className="max-h-screen flex flex-col">
			<div className="grid min-h-max it grid-cols-3 grid-rows-2 gap-2 w-auto h-auto">
				<div className="box row-start-1 row-span-1">
					<div className="grid overflow-hidden grid-cols-2 grid-rows-4 gap-2 w-auto h-auto">
						<div className="box row-start-1 row-span-2">
							<h2> Banker</h2>
							<div>
								<Dice
									onRoll={(value) => {
										setBDie_1(value);

									}}
									size={85}
									cheatValue={1}
									ref={bRef1}
									// disabled={bDie_1 !== null} />
									disabled={true} />

								<Dice
									onRoll={(value) => {
										setBDie_2(value)
									}}
									size={85}
									cheatValue={1}
									ref={bRef2}
									// disabled={bDie_2 !== null} />
									disabled={true} />

								<Dice
									onRoll={(value) => {
										setBDie_3(value)
									}}
									size={85}
									cheatValue={2}
									ref={bRef3}
									// disabled={bDie_3 !== null} />
									disabled={true} />
							</div>
						</div>

						<h3 className="box row-start-1 row-span-2">{bScore === -2 ? "Roll Banker's dice" : pointChecker(bScore, "Banker")}</h3>

						<div className="box row-start-3 row-span-2">
							<h2>Player</h2>
							<div>
								<Dice
									onRoll={(value) => {
										setPDie_1(value)
										gameResult(bScore, pScore);
									}}
									size={85}
									ref={pRef1}
									cheatValue={1}
									disabled={pDie_1 !== null || pBet <= 0} />
								<Dice
									onRoll={(value) => {
										setPDie_2(value)
										gameResult(bScore, pScore);
									}}
									size={85}
									ref={pRef2}
									cheatValue={1}
									disabled={pDie_2 !== null || pBet <= 0} />
								<Dice
									onRoll={(value) => {
										setPDie_3(value)
										gameResult(bScore, pScore);
									}}
									size={85}
									ref={pRef3}
									cheatValue={3}
									disabled={pDie_3 !== null || pBet <= 0} />
							</div>
						</div>

						<h3 className="box row-span-2">{pointChecker(pScore, "Player")}</h3>
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
					<div className="grid grid-cols-2 grid-rows-2 gap-2 w-auto h-auto">
						<h2>Betting</h2>
						<div className="box row-start-1 row-span-2">
							<h3>Banker</h3>
							<div className="grid grid-cols-2 grid-rows-2 gap-2 w-auto h-auto">
								<div className="box row-start-1 row-span-2">
									<h4>Bet</h4>
									<input
										type="number"
										value={pBet}
										onChange={(e) => {
											setPBet(e.target.value)
										}}
										min="0"
										max="100"
										step="1"
										disabled={pBet > 0} />
								</div>
								<div className="box row-start-1 row-span-2">
									<h4>Betting</h4>
									<button
										className="button"
										onClick={() => {
											setPBet(pBet + 1)
										}}
										disabled={pBet > 0}>
										+
									</button>
									<button
										className="button"
										onClick={() => {
											setPBet(pBet - 1)
										}}
										disabled={pBet <= 0}>
										-
									</button>
								</div>
							</div>
						</div>
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
					add feature to get more coins/ads/something? here
				</div>
			</div>
		</div>
	);

}

export default Round;