import { useState, memo } from 'react';
import Image from 'next/image';


const Board = ({ blocks, handleClick, socket, lastMove, setLastMove, myMove, whosTurn, gameOver,
	hands,
	// myHand,
	communityCardsTest, currentDeckTest, revealHands, currentPot, currentStake
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
		// <div className="table border-2 border-solid border-black"></div>
		<div>
			<div className="rounded-md px-[1vw] bg-rose-200">
				<span className="text-xl font-semibold tracking-wide">You are: {myMove}</span><br />
				<span className="text-xl font-semibold tracking-wide">Your Stake: {currentStake}</span><br />
				<span className="text-xl font-semibold tracking-wide">Current Pot: {currentPot}</span>
			</div>

			<div className="block-row">
				<table class="bg-white text-gray-900 w-full shadow-none">
					<thead>
						<tr>
							<th class="bg-blue-700 text-white p-1">Your Hand</th>
							<th class="bg-blue-700 text-white p-1">Opponent's Hand</th>
						</tr>
					</thead>
					<tbody>
						<tr class="bg-blue-100 text-blue-900 ">
							<td class="p-2">
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
											h-[35vw] w-[21vw]
											2xl:h-[15vw] 2xl:w-[10vw]
											xl:h-[15vw] xl:w-[10vw]
											lg:h-[15vw] lg:w-[10vw]
											md:h-[10vw] md:w-[10vw]
											sm:h-[15vw] sm:w-[10vw]">
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
							<td class="p-2">
								<div className="flex items-center content-center justify-center text-center">
									{revealHands ?
										opponentHand.map((card, i) => {
											return (
												// <div className="mr-[0.5vw]">
												<Image
													src={`/images/${card}.svg`}
													width={90}
													height={135}
													alt={'1B'}
												/>
												// </div>
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
											<div className="relative mr-[0.2vw]
												h-[35vw] w-[21vw]
												2xl:h-[15vw] 2xl:w-[10vw]
												xl:h-[15vw] xl:w-[10vw]
												lg:h-[15vw] lg:w-[10vw]
												md:h-[10vw] md:w-[10vw]
												sm:h-[15vw] sm:w-[10vw]"
											>
												<Image
													src={`/images/1B.svg`}
													layout="fill"
													// width='90vw'
													// height='135vw'
													alt={'1B'}
												/>
											</div>
											<div className="relative mr-[0.2vw]
												h-[35vw] w-[21vw]
												2xl:h-[15vw] 2xl:w-[10vw]
												xl:h-[15vw] xl:w-[10vw]
												lg:h-[15vw] lg:w-[10vw]
												md:h-[10vw] md:w-[10vw]
												sm:h-[15vw] sm:w-[10vw]"
											>
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

			<div className="block-row items-center content-center justify-center text-center">
				<div className="mb-[0.2vh] bg-blue-700 text-white">
					<span className="text-xl font-semibold tracking-wide rounded-md">Community Cards {' '}</span>
				</div>
				<div className="flex gap-[0.9vw]">
					{communityCardsTest && communityCardsTest.map((card, i) => {
						if (card === '') {
							card = '1B'
						}
						return (
							<div className="relative
							h-[32vw] w-[19vw]
							2xl:h-[15vw] 2xl:w-[10vw]
							xl:h-[15vw] xl:w-[10vw]
							lg:h-[15vw] lg:w-[10vw]
							md:h-[10vw] md:w-[10vw]
							sm:h-[15vw] sm:w-[10vw]">
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