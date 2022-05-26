import { useState, memo } from 'react';
import Image from 'next/image';


const Board = ({ blocks, handleClick, socket, lastMove, setLastMove, myMove, whosTurn, gameOver,
	hands,
	// myHand,
	communityCardsTest, currentDeckTest, revealHands, currentPot, currentStake, balance, currentTopStake
}) => {
	let myHand = ['1B', '1B']
	let opponentHand = ['1B', '1B']
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
					<tr className="bg-blue-100 text-blue-900 text-center">
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
							<th className="bg-rose-900 text-white text-[2vh]">Your Hand</th>
							<th className="bg-rose-900 text-white text-[2vh]">Opponent's Hand</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-blue-100 text-blue-900 ">
							<td className="p-2">
								<div className="flex items-center content-center justify-center text-center">
									{myHand && myHand.map((card, i) => {
										return (
											// <div className="mr-[0.2vw]">
											// <Image
											// 	src={`/images/${card}.svg`}
											// 	// layout="fill"
											// 	width='90'
											// 	height='135'
											// 	alt={card}
											// />
											// // </div>

											<div className="relative mr-[0.5vw]
											h-[14vh] w-[20vw]
											2xl:h-[18vh] 2xl:w-[6.5vw]
											xl:h-[19vh] xl:w-[9.5vw]
											lg:h-[19vh] lg:w-[11vw]
											md:h-[15vh] md:w-[10vw]
											sm:h-[15vh] sm:w-[10vw]">
												<Image
													src={`/images/${card}.svg`}
													layout="fill"
													// width='90vw'
													// height='135vw'
													alt={card}
												/>
											</div>
										)
									})}
								</div>
							</td>
							<td className="p-2">
								<div className="flex items-center content-center justify-center text-center">
									{revealHands ?
										opponentHand.map((card, i) => {
											return (
												<div className="relative mr-[0.5vw]
											h-[14vh] w-[20vw]
											2xl:h-[18vh] 2xl:w-[6.5vw]
											xl:h-[19vh] xl:w-[9.5vw]
											lg:h-[19vh] lg:w-[11vw]
											md:h-[15vh] md:w-[10vw]
											sm:h-[15vh] sm:w-[10vw]">
													<Image
														src={`/images/${card}.svg`}
														layout="fill"
														// width='90vw'
														// height='135vw'
														alt={card}
													/>
												</div>
											)
										})
										:
										// <>
										// 	<Image
										// 		src={`/images/1B.svg`}
										// 		// width={100}
										// 		// height={150}
										// 		width='90'
										// 		height='135'
										// 		alt={'1B'}
										// 	/>
										// 	<Image
										// 		src={`/images/1B.svg`}
										// 		// width={100}
										// 		// height={150}
										// 		width='90'
										// 		height='135'
										// 		alt={'1B'}
										// 	/>
										// </>

										<>
											<div className="relative mr-[0.5vw]
											h-[14vh] w-[20vw]
											2xl:h-[18vh] 2xl:w-[6.5vw]
											xl:h-[19vh] xl:w-[9.5vw]
											lg:h-[19vh] lg:w-[11vw]
											md:h-[15vh] md:w-[10vw]
											sm:h-[15vh] sm:w-[10vw]">
												<Image
													src={`/images/1B.svg`}
													layout="fill"
													// width='90vw'
													// height='135vw'
													alt={'1B'}
												/>
											</div>
											<div className="relative mr-[0.5vw]
											h-[14vh] w-[20vw]
											2xl:h-[18vh] 2xl:w-[6.5vw]
											xl:h-[19vh] xl:w-[9.5vw]
											lg:h-[19vh] lg:w-[11vw]
											md:h-[15vh] md:w-[10vw]
											sm:h-[15vh] sm:w-[10vw]">
												<Image
													src={`/images/1B.svg`}
													layout="fill"
													// width='90vw'
													// height='135vw'
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

				{/* <span className="text-xl font-semibold tracking-wide">Your hand: {' '}</span>
				<div className="flex gap-[0.4vw]">
					<>
						{myHand && myHand.map((card, i) => {
							return (
								<Image
									src={`/images/${card}.svg`}
									width={100}
									height={150}
									alt={card}
								/>
							)
						})}
					</>
				</div> */}
			</div>

			{/* <div className="block-row">
				<span className="text-xl font-semibold tracking-wide">Opponent's hand: {' '}</span>
				<div className="flex gap-[0.4vw]">
					{revealHands ?
						opponentHand.map((card, i) => {
							return (
								<Image
									src={`/images/${card}.svg`}
									width={100}
									height={150}
									alt={'1B'}
								/>
							)
						})
						:
						<>
							<Image
								src={`/images/1B.svg`}
								width={100}
								height={150}
								alt={'1B'}
							/>
							<Image
								src={`/images/1B.svg`}
								width={100}
								height={150}
								alt={'1B'}
							/>
						</>
					}
				</div>
			</div> */}

			<div className="block-row items-center content-center justify-center text-center bg-blue-100 h-fill">
				<div className="mb-[0.2vh] bg-rose-900 text-white">
					<span className="text-[2vh] font-semibold tracking-wide rounded-md">Community Cards {' '}</span>
				</div>
				<div className="flex gap-[0.6vw] p-[0.5vw] mt-1">
					{communityCardsTest && communityCardsTest.map((card, i) => {
						if (card === '') {
							card = '1B'
						}
						return (
							<div className="relative
							h-[14vh] w-[19vw]
							2xl:h-[18vh] 2xl:w-[6.5vw]
							xl:h-[19vh] xl:w-[9.5vw]
							lg:h-[20vh] lg:w-[11vw]
							md:h-[10vh] md:w-[10vw]
							sm:h-[15vh] sm:w-[10vw]">
								<Image
									src={`/images/${card}.svg`}
									layout="fill"
									// width='90vw'
									// height='135vw'
									alt={card}
								/>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default memo(Board);