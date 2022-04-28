// chat with list
// history with table

import { useEffect, useState, useReducer, useCallback, Component, useRef, useMemo } from 'react';
import Image from 'next/image'
import Dice from "react-dice-roll";
import styles from './Round.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// return roll combination of dice
// INSTANT WIN
// triple: All 3 dice are the same, 6-6-6 is the highest roll and 5-5-5 is the next highest and so on
// 4-5-6: Rolling 4-5-6 is an instant win
// x-x-6: Rolling a pair plus 6 is an instant win
// POINTS
// x-x-y: Rolling a pair plus any other value is a point where the odd die is the point value
// INSTANT LOSS
// x-x-1: Rolling a pair plus 1 is an instant loss
// 1-2-3: Rolling 1-2-3 is an instant loss
// INDETERMINATE
// x-y-z: Any combination that does not result in cases above is an intermediate outcome and requires a re-roll

const submitContact1 = async (event) => {
	event.preventDefault();
	const name = event.target.name.value;
	const res = await fetch(`https://api.agify.io/?name=${name}`);
	const result = await res.json();
	alert(`Hi ${name} your age is most likely: ${result.age}`);
};

const submitContact2 = async (event) => {
	event.preventDefault();
	const name = event.target.name.value;
	const res = await fetch('/api/apiLearn', {
		body: JSON.stringify({
			name: name,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});
	const result = await res.json();
	alert(`Is this your full name: ${result.name}`);
};

const submitBetTest = async (event) => {
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
	alert(`You bet: ${result.bet}`);
};


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
		<div className={styles.round}>
			<div className={styles.alphaButtons}>
				<button
					onClick={handleBankerDiceStart}
				// disabled={}
				>
					2. Roll Banker
				</button>
				<button
					onClick={handlePlayerDiceStart}>
					3. Roll Player
				</button>
				{/* button to clear dice value */}
				<button
					onClick={() => {
						setBDie_1(null);
						setBDie_2(null);
						setBDie_3(null);
						setBRoll(false);
					}}>
					Clear Banker Dice
				</button>
				<button
					onClick={() => {
						setPDie_1(null);
						setPDie_2(null);
						setPDie_3(null);
						setPRoll(false);
					}}>
					Clear Player Dice
				</button>
				<button
					onClick={() => {
						setBDie_1(null);
						setBDie_2(null);
						setBDie_3(null);
						setPDie_1(null);
						setPDie_2(null);
						setPDie_3(null);
						setBRoll(false);
						setPRoll(false);
					}}>
					Clear All Dice
				</button>
				{/* button to reset player bet */}
				<button
					onClick={() => {
						setPBet(0);
					}}>
					Reset Player Bet
				</button>
				{/* button to reset game */}
				<button
					onClick={() => {
						setBDie_1(null);
						setBDie_2(null);
						setBDie_3(null);
						setPDie_1(null);
						setPDie_2(null);
						setPDie_3(null);
						setBRoll(false);
						setPRoll(false);
						setPBet(0);
						setResult("");
						setBScore(0);
						setPScore(0);
						setBMoney(1000);
						setPMoney(1000);
					}}>
					Reset Game
				</button>
			</div>
			{console.log("")}
			{/* {console.log("1-2-3 instant loss: " + score([1, 2, 3]))}
			{console.log("1-1-1 instant win: " + score([1, 1, 1]))}
			{console.log("4-5-6 instant win: " + score([4, 5, 6]))}
			{console.log("5-5-1 instant loss: " + score([5, 5, 1]))}
			{console.log("2-2-1 instant loss: " + score([2, 2, 1]))} */}

			<div className={styles.game}>
				<h2 className={styles.Buser}> Banker</h2>
				<div className={styles.Bdie1}>
					<Dice
						onRoll={(value) => {
							setBDie_1(value);

						}}
						size={95}
						cheatValue={1}
						ref={bRef1}
						// disabled={bDie_1 !== null} />
						disabled={true} />
				</div>
				<div className={styles.Bdie2}>
					<Dice
						onRoll={(value) => {
							setBDie_2(value)
						}}
						size={95}
						cheatValue={1}
						ref={bRef2}
						// disabled={bDie_2 !== null} />
						disabled={true} />
				</div>
				<div className={styles.Bdie3}>
					<Dice
						onRoll={(value) => {
							setBDie_3(value)
						}}
						size={95}
						cheatValue={2}
						ref={bRef3}
						// disabled={bDie_3 !== null} />
						disabled={true} />
				</div>
				{/* {console.log("banker dice:", bDie_1, bDie_2, bDie_3)}
				{console.log("score:", bScore)} */}
				<h3 className={styles.Bresult}>{bScore === -2 ? "Roll Banker's dice" : pointChecker(bScore, "Banker")}</h3>

				<h2 className={styles.Puser}>Player</h2>
				<div className={styles.Pdie1}>
					<Dice
						onRoll={(value) => {
							setPDie_1(value)
							gameResult(bScore, pScore);
						}}
						size={95}
						ref={pRef1}
						cheatValue={1}
						disabled={pDie_1 !== null || pBet <= 0} />
				</div>
				<div className={styles.Pdie2}>
					<Dice
						onRoll={(value) => {
							setPDie_2(value)
							gameResult(bScore, pScore);
						}}
						size={95}
						ref={pRef2}
						cheatValue={1}
						disabled={pDie_2 !== null || pBet <= 0} />
				</div>
				<div className={styles.Pdie3}>
					<Dice
						onRoll={(value) => {
							setPDie_3(value)
							gameResult(bScore, pScore);
						}}
						size={95}
						ref={pRef3}
						cheatValue={3}
						disabled={pDie_3 !== null || pBet <= 0} />
				</div>
				{/* {console.log("player dice:", pDie_1, pDie_2, pDie_3)}
			{console.log("score:", pScore)} */}
				{/* <h3>{pScore == -2 ? "Roll Player's dice" : "score: " + pScore}</h3> */}
				<h3 className={styles.Presult}>{pointChecker(pScore, "Player")}</h3>
			</div>


			<div className={styles.betEl}>
				{/* form for the player to place bets */}

				{/* {console.log("player bet:", pBet)} */}

				{/* display money */}
				{/* <h2>Banker Money: ${bMoney}</h2> */}
				<h2>Username</h2>
				<h2>Tokens: {pMoney}</h2>
				<form onSubmit={submitBet1} className={styles.makeBet}>
					<label>
						Bet:
						<input type="number" name="bet" />
					</label>
					<input className={styles.betButton} type="submit" value="BET" />
				</form>

				<button onClick={notify}>Notify!</button>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					// rtl={true}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>

				{/* display game result */}
				{console.log(result)}
				<h2 className={styles.gameResult}>Game Result: {result ? result : "Please place a bet!"}</h2>


				<h1 className={styles.hotkeysTitle}>Hotkeys</h1>
				<p className={styles.hotkeys}>SPACE: bet</p>
				<p className={styles.hotkeys}>E: halve bet</p>
				<p className={styles.hotkeys}>R: double bet</p>
				<p className={styles.hotkeys}>D: roll dice</p>
			</div>

			<div className={styles.guideEl}>

				<table>
					<thead>
						<th>Name</th>
						<th>Example</th>
						<th>Outcome</th>
						<th>Comment</th>
					</thead>
					<tbody>
						<tr>
							<td>Triple</td>
							<td>
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
							<td>WIN</td>
							<td rowSpan={1} colSpan={1}>All three dice show the same number.<br /> 6-6-6 is the highest roll,<br />5-5-5 is the next highest, etc.<br />Any triple is an instant win.</td>
						</tr>

						<tr>
							<td>4-5-6</td>
							<td>
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
							<td>WIN</td>
							<td>Sequential 4-5-6;<br /> this is an instant win.</td>
						</tr>

						<tr>
							<td rowSpan={1} colSpan={1}>Points</td>
							<td>
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
							<td>n points</td>
							<td>One pair plus any other value; the odd die is the point value. Possible point values range from 2 to 5<br />When the point value is 6, it is an instant win; When the point value is 1, it is an instant loss.</td>
						</tr>

						<tr>
							<td>1-2-3</td>
							<td>
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
							<td>LOSE</td>
							<td>Sequential 1-2-3;<br /> this is an instant loss.</td>
						</tr>

						<tr>
							<td>Indeterminate</td>
							<td>
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
							<td>Re-roll</td>
							<td>Any combination that does not result in a triple, sequential, or points is an indeterminate outcome and requires a re-roll.</td>
						</tr>
					</tbody>
				</table>

			</div>


			<div className={styles.logEl}>
				{/* display game log
				<h2>CHAT / GAME LOG GOES HERE</h2>
				<h2>{"banker dice: " + bDie_1 + " " + bDie_2 + " " + bDie_3}</h2>
				<h2>{"score: " + bScore}</h2>
				<h2>{"player dice: " + pDie_1 + " " + pDie_2 + " " + pDie_3}</h2>
				<h2>{"score: " + pScore}</h2>
				<h2>{"player bet: " + pBet}</h2> */}
				<div className={styles.sideBar}>
					<ul className={styles.sideBarOptions} >
						<li className={styles.sideBarChatFrame}>
							<a className={styles.sideBarChat}>CHAT</a>
						</li>
						<li className={styles.sideBarHistoryFrame}>
							<a className={styles.sideBarHistory}>HISTORY</a>
						</li>
					</ul>
					<a className={styles.sideBarSetting}>S</a>
				</div>
				<div className={styles.logElContentBoxFrame}>
					<div className={styles.switchable_area}>
						<div>
							<div className={styles.logElContentBox}>
								<div className={styles.logElContentChat}>
									<div className={styles.logElContentChatGrid}>
										<div className={styles.idkHeader}>
											<a className={styles.idkHeaderRole}>Admin</a>
											<span className={styles.idkHeaderName}>THAAD</span>
										</div>
										<button className={styles.idkButton}>
											<i className={styles.idkButtonIcon}>X</i>
											{" "}unfriend
										</button>
										<ul className={styles.chatContent}>
											<li className={styles.chatContentItem}>
												<small className={styles.chatContentItemTime}>11:30</small>
												<a className={styles.chatContentItemUsername}>THAAD</a>
												:
												<span className={styles.chatContentItemMessage}> Hi this is my website!</span>
											</li>
											<li className={styles.chatContentItem}>
												<small className={styles.chatContentItemTime}>11:30</small>
												<a className={styles.chatContentItemUsername}>THAAD</a>
												:
												<span className={styles.chatContentItemMessage}> This is a very long message. This is a very long message. This is a very long message. This is a very long message. This is a very long message. </span>
											</li>
											<li className={styles.chatContentItem}>
												<small className={styles.chatContentItemTime}>11:31</small>
												<a className={styles.chatContentItemUsername}>Chat Bot</a>
												:
												<span className={styles.chatContentItemMessage}> test numbers: 123</span>
											</li>
											<li className={styles.chatContentItem}>
												<small className={styles.chatContentItemTime}>11:35</small>
												<a className={styles.chatContentItemUsername}>THAAD</a>
												:
												<span className={styles.chatContentItemMessage}> test empty message below</span>
											</li>
											<li className={styles.chatContentItem}>
												<small className={styles.chatContentItemTime}>11:35</small>
												<a className={styles.chatContentItemUsername}>Chat Bot</a>
												:
												<span className={styles.chatContentItemMessage}> </span>
											</li>
										</ul>
									</div>
								</div>
								<form className={styles.logElContentChatForm}>
									<div className={styles.input_group}>
										<input className={styles.input_chatMessage}></input>
										<div className={styles.input_chatMessageSend}>
											<button className={styles.input_chatMessageSendButton}>
												<i className={styles.input_chatMessageSendIcon}>send</i>
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
}

export default Round;