import { useState, memo } from 'react';
import Image from 'next/image';


const Board = ({ blocks, handleClick, socket, lastMove, setLastMove, myMove, whosTurn, gameOver,
	hands,
	// myHand,
	communityCardsTest, currentDeckTest, revealHands, currentPot, currentStake, balance, currentTopStake, solvedHands
}) => {

	let myHand = ['1B', '1B']
	let opponentHand = ['1B', '1B']
	let fancySolvedHands = []

	if (solvedHands) {
		let rawSolvedHands = solvedHands[0].cards;
		// console.log(rawSolvedHands)
		let cookedSolvedHands = rawSolvedHands.map(card => {
			return {
				value: card.value,
				suit: card.suit
			}
		})
		// console.log(cookedSolvedHands)


		// const output = cookedSolvedHands.reduce((a, { value, suit }, i) => {
		// 	a.push(value + suit.toUpperCase());
		// 	return a;
		// }, []);
		// console.log(output);
		fancySolvedHands = cookedSolvedHands.map(a => a.value + a.suit.toUpperCase())


		// const someOutput = someInput.reduce((a, { someValue1, someValue2 }, i) => {
		// 	a.push(someValue1 + someValue2.toUpperCase());
		// 	return a;
		// }, []);
		// console.log(someOutput);
	}


	if (hands) {

		// loop through hand in hands and find my hand
		for (let i = 0; i < hands.length; i++) {
			if (hands[i][0] === socket.id) {
				myHand = hands[i][1]
				// console.log("My Hand: ")
				// console.log(myHand)
			}
			else {
				opponentHand = hands[i][1]
				// console.log("Opponent Hand: ")
				// console.log(opponentHand)
			}
		}
	}
	return (
		<div>
			<table className="bg-white text-gray-900 w-full shadow-none">
				<thead>
					<tr>
						<th className="bg-rose-700 text-white p-0 w-auto border border-black">Balance</th>
						<th className="bg-rose-700 text-white p-0 w-auto border border-black">Position</th>
						<th className="bg-rose-700 text-white p-0 w-auto border border-black">Stake</th>
						<th className="bg-rose-700 text-white p-0 w-auto border border-black">Top Bet</th>
						<th className="bg-rose-700 text-white p-0 w-auto border border-black">Pot</th>
					</tr>
				</thead>
				<tbody>
					<tr className="bg-purple-100 text-blue-900 text-center">
						<td className="p-1 border-x border-black">${balance}</td>
						<td className="p-1 border-x border-black">{myMove}</td>
						<td className="p-1 border-x border-black">${currentStake}</td>
						<td className="p-1 border-x border-black">${currentTopStake}</td>
						<td className="p-1 border-x border-black">${currentPot}</td>
					</tr>
				</tbody>
			</table>

			<div className="block-row">
				<table className="bg-white text-gray-900 w-full shadow-none">
					<thead>
						<tr>
							<th className="bg-rose-800 text-white text-[2vh]">Your Hand</th>
							<th className="bg-rose-800 text-white text-[2vh]">Opponent's Hand</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-purple-100 text-blue-900 ">
							<td className="">
								<div className="flex items-center content-center justify-center text-center">
									{myHand && myHand.map((card, i) => {
										if (fancySolvedHands.includes(card)) {
											return (
												<div className="relative mx-[0.2vw]
														h-[17vh] w-[23vw]
														2xl:h-[18vh] 2xl:w-[6.5vw]
														xl:h-[19vh] xl:w-[9.5vw]
														lg:h-[19vh] lg:w-[11vw]
														md:h-[15vh] md:w-[10vw]
														sm:h-[15vh] sm:w-[10vw]
														border-2 border-teal-400 rounded-lg">
													<Image
														src={`/images/${card}.svg`}
														layout="fill"
														// width='90vw'
														// height='135vw'
														alt={card}
													/>
												</div>
											)
										}
										else {
											return (
												<div className="relative mx-[0.2vw]
														h-[17vh] w-[23vw]
														2xl:h-[18vh] 2xl:w-[6.5vw]
														xl:h-[19vh] xl:w-[9.5vw]
														lg:h-[19vh] lg:w-[11vw]
														md:h-[15vh] md:w-[10vw]
														sm:h-[15vh] sm:w-[10vw]
														border-2 border-transparent rounded-lg">
													<Image
														src={`/images/${card}.svg`}
														layout="fill"
														// width='90vw'
														// height='135vw'
														alt={card}
													/>
												</div>
											)
										}
									})}
								</div>
							</td>
							<td className="">
								<div className="flex items-center content-center justify-center text-center">
									{revealHands ?
										opponentHand.map((card, i) => {
											if (fancySolvedHands.includes(card)) {
												return (
													<div className="relative mx-[0.2vw]
															h-[17vh] w-[23vw]
															2xl:h-[18vh] 2xl:w-[6.5vw]
															xl:h-[19vh] xl:w-[9.5vw]
															lg:h-[19vh] lg:w-[11vw]
															md:h-[15vh] md:w-[10vw]
															sm:h-[15vh] sm:w-[10vw]
															border-2 border-teal-400 rounded-lg">
														<Image
															src={`/images/${card}.svg`}
															layout="fill"
															// width='90vw'
															// height='135vw'
															alt={card}

														/>
													</div>
												)
											}
											else {
												return (
													<div className="relative mx-[0.2vw]
															h-[17vh] w-[23vw]
															2xl:h-[18vh] 2xl:w-[6.5vw]
															xl:h-[19vh] xl:w-[9.5vw]
															lg:h-[19vh] lg:w-[11vw]
															md:h-[15vh] md:w-[10vw]
															sm:h-[15vh] sm:w-[10vw]
															border-2 border-transparent rounded-lg">
														<Image
															src={`/images/${card}.svg`}
															layout="fill"
															// width='90vw'
															// height='135vw'
															alt={card}

														/>
													</div>
												)
											}
										})
										:
										<>
											<div className="relative mx-[0.2vw]
													h-[17vh] w-[23vw]
													2xl:h-[18vh] 2xl:w-[6.5vw]
													xl:h-[19vh] xl:w-[9.5vw]
													lg:h-[19vh] lg:w-[11vw]
													md:h-[15vh] md:w-[10vw]
													sm:h-[15vh] sm:w-[10vw]
													border-2 border-transparent rounded-lg">
												<Image
													src={`/images/1B.svg`}
													layout="fill"
													alt={'1B'}
												/>
											</div>
											<div className="relative mx-[0.2vw]
													h-[17vh] w-[23vw]
													2xl:h-[18vh] 2xl:w-[6.5vw]
													xl:h-[19vh] xl:w-[9.5vw]
													lg:h-[19vh] lg:w-[11vw]
													md:h-[15vh] md:w-[10vw]
													sm:h-[15vh] sm:w-[10vw]
													border-2 border-transparent rounded-lg">
												<Image
													src={`/images/1B.svg`}
													layout="fill"
													alt={'1B'}
												/>
											</div>
										</>
									}
								</div>
							</td>
						</tr>
					</tbody>
				</table>

			</div>


			<div className="block-row items-center content-center justify-center text-center bg-purple-100 h-fill">
				<div className="mb-[0.2vh] bg-rose-800 text-white">
					<span className="text-[2vh] font-semibold tracking-wide rounded-md">Community Cards {' '}</span>
				</div>
				<div className="flex gap-[0.01vw] mt-0">
					{communityCardsTest && communityCardsTest.map((card, i) => {
						if (card === '') {
							card = '1B'
						}
						if (fancySolvedHands.includes(card)) {
							return (
								<div className="relative
								h-[14vh] w-[19vw]
								2xl:h-[18vh] 2xl:w-[6.5vw]
								xl:h-[19vh] xl:w-[9.5vw]
								lg:h-[20vh] lg:w-[11vw]
								md:h-[10vh] md:w-[10vw]
								sm:h-[15vh] sm:w-[10vw]
								border-2 border-teal-400 rounded-lg">
									<Image
										src={`/images/${card}.svg`}
										layout="fill"
										// width='90vw'
										// height='135vw'
										alt={card}
									/>
								</div>
							)
						}
						else {
							return (
								<div className="relative
								h-[15vh] w-[20vw]
								2xl:h-[18vh] 2xl:w-[6.5vw]
								xl:h-[19vh] xl:w-[9.5vw]
								lg:h-[20vh] lg:w-[11vw]
								md:h-[10vh] md:w-[10vw]
								sm:h-[15vh] sm:w-[10vw]
								border-2 border-transparent rounded-lg">
									<Image
										src={`/images/${card}.svg`}
										layout="fill"
										// width='90vw'
										// height='135vw'
										alt={card}
									/>
								</div>
							)
						}
					})}
				</div>
			</div>
		</div>
	)
}

export default memo(Board);