import { useState, memo } from 'react';
import Image from 'next/image';


const Board = ({ blocks, socket, lastMove, setLastMove, myMove, whosTurn, gameOver,
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
			{/* grid with 1 col and 3 rows */}
			{/* <div className="grid overflow-hidden grid-cols-1 grid-rows-3 gap-2 w-auto h-auto"> */}
			<div className="grid overflow-hidden grid-cols-1 gap-2 w-auto h-full bg-lime-200 rounded-lg border border-black mt-[1vh]">
				<div className="row-start-1 row-span-1 col-start-1 col-span-1 bg-lime-800 py-[0.5vh] rounded-lg">
					<div className="flex h-[10vh]">
						<div className="item w-[70vw] h-full">
							{/* Opponent Cards */}
							<div className="flex gap-[0.6vw]">
								{/* My Cards */}
								<div className="bg-[url('/images/hwatu/card_1.png')]
									bg-[-700% -400% / cover]
									h-[8.5vh] w-[3vw]
									bg-[length:800%_600%]"
								>
									{/* 화투 */}
								</div>
								<div className="bg-[url('/images/hwatu/card_1.png')]
									bg-[-700% -400% / cover]
									h-[8.5vh] w-[3vw]
									bg-[length:800%_600%]"
								>
									{/* 화투 */}
								</div>
								<div className="bg-[url('/images/hwatu/card_1.png')]
									bg-[-700% -400% / cover]
									h-[8.5vh] w-[3vw]
									bg-[length:800%_600%]"
								>
									{/* 화투 */}
								</div>
							</div>
						</div>
						<div className="w-[10vw] h-full">
							{/* <div className="grid overflow-hidden grid-cols-1 grid-rows-2 w-full"> */}
							<div className="flex-inline overflow-hidden w-full px-[4.5%]">
								<div className="w-[9vw] h-[6.2vh] justify-center">
									<div className="flex flex-wrap gap-[1%] h-full bg-lime-600 justify-center rounded-lg content-center">
										<div className="item w-1/6 py-[2%]">
											<div className="relative w-[1vw] h-[1.2vw]">
												<Image
													src={`/images/hwatu/card_back.jpg`}
													alt="card_back"
													layout="fill"
												// width={23}
												// height={25}
												/>
											</div>
										</div>
										<div className="item w-1/6 py-[1%]">
											<div className="relative w-[1vw] h-[1.2vw]">
												<Image
													src={`/images/hwatu/card_back.jpg`}
													alt="card_back"
													layout="fill"
												// width={23}
												// height={25}
												/>
											</div>
										</div>
										<div className="item w-1/6 py-[1%]">
											<div className="relative w-[1vw] h-[1.2vw]">
												<Image
													src={`/images/hwatu/card_back.jpg`}
													alt="card_back"
													layout="fill"
												// width={23}
												// height={25}
												/>
											</div>
										</div>
										<div className="item w-1/6 py-[1%]">
											<div className="relative w-[1vw] h-[1.2vw]">
												<Image
													src={`/images/hwatu/card_back.jpg`}
													alt="card_back"
													layout="fill"
												// width={23}
												// height={25}
												/>
											</div>
										</div>
										<div className="item w-1/6 py-[1%]">
											<div className="relative w-[1vw] h-[1.2vw]">
												<Image
													src={`/images/hwatu/card_back.jpg`}
													alt="card_back"
													layout="fill"
												// width={23}
												// height={25}
												/>
											</div>
										</div>
										<div className="item w-1/6 py-[1%]">
											<div className="relative w-[1vw] h-[1.2vw]">
												<Image
													src={`/images/hwatu/card_back.jpg`}
													alt="card_back"
													layout="fill"
												// width={23}
												// height={25}
												/>
											</div>
										</div>
										<div className="item w-1/6 py-[1%]">
											<div className="relative w-[1vw] h-[1.2vw]">
												<Image
													src={`/images/hwatu/card_back.jpg`}
													alt="card_back"
													layout="fill"
												// width={23}
												// height={25}
												/>
											</div>
										</div>
										<div className="item w-1/6 py-[1%]">
											<div className="relative w-[1vw] h-[1.2vw]">
												<Image
													src={`/images/hwatu/card_back.jpg`}
													alt="card_back"
													layout="fill"
												// width={23}
												// height={25}
												/>
											</div>
										</div>
										<div className="item w-1/6 py-[1%]">
											<div className="relative w-[1vw] h-[1.2vw]">
												<Image
													src={`/images/hwatu/card_back.jpg`}
													alt="card_back"
													layout="fill"
												// width={23}
												// height={25}
												/>
											</div>
										</div>
										<div className="item w-1/6 py-[1%]">
											<div className="relative w-[1vw] h-[1.2vw]">
												<Image
													src={`/images/hwatu/card_back.jpg`}
													alt="card_back"
													layout="fill"
												// width={23}
												// height={25}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="pt-[0.5vh]">
									<div className="w-[9vw] bg-lime-600 rounded-lg">
										<p className="text-white text-[2.3vh] font-extrabold tracking-widest text-center">
											2<a className="text-black">고 </a>
											2<a className="text-black">💩️ </a>
											1<a className="text-black">🔔</a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row-start-2 row-span-1 col-start-1 col-span-1">
					<div className="item w-[80vw] h-[45vh]">
						{/* Main Area */}
						<div class="item w-[70%] h-full">
							<div class="flex flex-wrap justify-center gap-1 h-full">
								<div class="item w-1/5 -space-x-[20%]">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
								</div>
								<div class="item w-1/5">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
								</div>
								<div class="item w-1/5">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
								</div>
								<div class="item w-1/5">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
								</div>
								<div class="item w-1/5 -space-x-[20%]">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>

								</div>
								<div class="item w-1/5">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
								</div>
								<div class="item w-1/5">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
								</div>
								<div class="item w-1/5">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
								</div>
								<div class="item w-1/5">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
								</div>
								<div class="item w-1/5">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
								</div>
								<div class="item w-1/5">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
								</div>
								<div class="item w-1/5">
									<div className="bg-[url('/images/hwatu/card_1.png')]
										bg-[-700% -400% / cover]
										h-[12vh] w-[4.2vw]
										bg-[length:800%_600%]"
									>
										{/* 화투 */}
									</div>
								</div>
							</div>
						</div>
						<div class="item w-[10%] h-full">
							<div class="flex-inline flex-wrap h-full">
								<div class="item w-full h-1/3">
									<div className="w-full border-2 border-black bg-lime-600 rounded">
										<p className="text-white text-[2.5vh] font-bold tracking-widest my-[10%] w-[7vw] text-center">
											3 Points
										</p>
									</div>
								</div>
								<div class="item w-auto h-1/3 ">
									<div className="bg-[url('/images/hwatu/card_back.jpg')]
										h-[14.5vh] w-[5.3vw]
										border-r-[#500] border-b-[#500]
										border-r-[0.5vw]	border-b-[0.5vw]
										rounded-tr-[13%] rounded-bl-[13%]
										text-center leading-[500%]"
									>
										x 19
									</div>
								</div>
								<div class="item w-auto h-1/3">
									<div className="w-full border-2 border-black bg-lime-600 rounded">
										<p className="text-white text-[2.5vh] font-bold tracking-widest my-[10%] w-[7vw] text-center">
											10 Points
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="item w-[20%] h-full">
							<div class="flex-inline flex-wrap h-full w-full">
								<div class="item w-auto h-2/5">
									{/* Opponent Profile */}
									<div class="flex items-center justify-between bg-red-200 rounded-lg p-5 w-[15vw] border border-black">
										<div class="space-y-5 font-medium">
											<div>GUEST</div>
											<div class="text-md text-gray-600">$100</div>
										</div>
										<img class="w-[5vw] h-[5vw] rounded-full" src="/images/feltCute.png" alt="Shrek" />
									</div>
								</div>
								<div class="item w-auto h-1/5">
									<div className="h-[8vh] w-[15vw] bg-red-400 rounded-lg border border-black">
										<p className="text-white text-[2.3vh] font-extrabold tracking-widest text-center py-[8%]">
											Leave Game
										</p>
									</div>
								</div>
								<div class="item w-auto h-2/5">
									{/* My Profile */}
									<div class="flex items-center justify-between bg-red-200 rounded-lg p-5 w-[15vw] border border-black">
										<div class="space-y-5 font-medium">
											<div>THAAD</div>
											<div class="text-md text-gray-600">$100</div>
										</div>
										<img class="w-[5vw] h-[5vw] rounded-full" src="/images/feltCute.png" alt="Shrek" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row-start-3 row-span-1 col-start-1 col-span-1 bg-lime-800 rounded-lg">
					<div className="item w-[80vw] h-[35vh]">
						<div class="flex flex-col h-full">
							<div class="item w-[80vw] h-1/3">
								<div className="flex">
									<div className="item w-[70vw] py-[2vh]">
										<div className="flex gap-[0.6vw]">
											{/* My Cards */}
											<div className="bg-[url('/images/hwatu/card_1.png')]
												bg-[-700% -400% / cover]
												h-[9vh] w-[3.2vw]
												bg-[length:800%_600%]"
											>
												{/* 화투 */}
											</div>
											<div className="bg-[url('/images/hwatu/card_1.png')]
												bg-[-700% -400% / cover]
												h-[9vh] w-[3.2vw]
												bg-[length:800%_600%]"
											>
												{/* 화투 */}
											</div>
											<div className="bg-[url('/images/hwatu/card_1.png')]
												bg-[-700% -400% / cover]
												h-[9vh] w-[3.2vw]
												bg-[length:800%_600%]"
											>
												{/* 화투 */}
											</div>
										</div>
									</div>
									<div className="w-[9vw] bg-lime-600 py-5 self-center rounded-lg">
										<p className="text-white text-[2.3vh] font-extrabold tracking-widest text-center">
											1<a className="text-black">고 </a>
											2<a className="text-black">💩️ </a>
											1<a className="text-black">🔔</a>
										</p>
									</div>
								</div>
							</div>
							<div class="item w-[80vw] h-2/3 bg-lime-800">
								{/* My Hand */}
								{/* <div className="flex gap-[0.6vw] p-[0.5vw] mt-1 border-4 border-white rounded-lg w-[79vw] place-content-start"> */}
								<div className="flex gap-[0.6vw] p-[0.5vw] mt-1 border-4 border-white rounded-lg w-[79vw] place-content-center">
									{communityCardsTest.map((card, index) => {
										return (
											<>
												<div className="bg-[url('/images/hwatu/card_1.png')]
													bg-[-700% -400% / cover]
													h-[18vh] w-[6vw]
													bg-[length:800%_600%]"
												>
													{/* 화투 */}
												</div>
												<div className="bg-[url('/images/hwatu/card_1.png')]
													bg-[-700% -400% / cover]
													h-[18vh] w-[6vw]
													bg-[length:800%_600%]"
												>
													{/* 화투 */}
												</div>
											</>
										)
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(Board);