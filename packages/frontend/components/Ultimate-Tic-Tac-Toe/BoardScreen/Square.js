import { useState, useEffect, memo } from 'react';


const Square = ({ squareNum, blockNum, blocks, setClickedSquare, socket, handleClick, lastMove, setLastMove, myMove, whosTurn, gameOver }) => {
	// let className = "square bg-white border-2 border-solid border-gray-300 float-left text-2xl font-bold w-[9vh] h-[9vh] mr-1 mt-1 text-center hover:bg-gray-400";
	let className = "square bg-white border-2 border-solid border-gray-300 float-left text-2xl font-bold w-[8vh] h-[8vh] m-1 text-center hover:bg-gray-400";

	// // if (!isWin) {
	// if (lastMove >= 0 && blocks[lastMove][9] && !blocks[blockNum][squareNum]) {
	// 	if (lastMove !== blockNum && !blocks[blockNum][9]) {
	// 		// console.log('1')
	// 		// console.log(blocks[blockNum][9])
	// 		className += " bg-blue-200"
	// 	}
	// } else if (lastMove === blockNum && !blocks[blockNum][squareNum]) {
	// 	// console.log('2')
	// 	// console.log(blocks[blockNum][squareNum])
	// 	className += " bg-blue-200"
	// }
	// // }

	if (gameOver) {
		className = "square bg-gray-700 border-2 border-solid border-gray-300 float-left text-2xl font-bold w-[8vh] h-[8vh] mr-1 mt-1 text-center hover:bg-gray-600";
	}
	else {
		if (blocks[blockNum][9] === myMove) {
			className += " bg-blue-400"
		}
		else if (blocks[blockNum][9] !== (myMove&&'')) {
			className += " bg-red-400"
		}
		// else if (blocks[blockNum][9] !== (myMove&&'X') && blocks[blockNum][9] !== (myMove&&'O')) {
		// 	className += " bg-red-400"
		// }

		// if myMove and whosTurn is not equal set className+="bg-red-200" else set className+="bg-blue-200"
		if (myMove !== whosTurn) {
			if (lastMove >= 0 && blocks[lastMove][9] && !blocks[blockNum][squareNum]) {
				if (lastMove !== blockNum && !blocks[blockNum][9]) {
					// console.log('1')
					// console.log(blocks[blockNum][9])
					className += " bg-red-200"
				}
			}
			else if (lastMove === blockNum && !blocks[blockNum][squareNum]) {
				// console.log('2')
				// console.log(blocks[blockNum][squareNum])
				className += " bg-red-200"
			}
		}
		else {
			if (lastMove >= 0 && blocks[lastMove][9] && !blocks[blockNum][squareNum]) {
				if (lastMove !== blockNum && !blocks[blockNum][9]) {
					// console.log('1')
					// console.log(blocks[blockNum][9])
					className += " bg-blue-200"
				}
			}
			else if (lastMove === blockNum && !blocks[blockNum][squareNum]) {
				// console.log('2')
				// console.log(blocks[blockNum][squareNum])
				className += " bg-blue-200"
			}
		}
		// console.log(blocks[6][9] === myMove)
	}


	return (
		<>
			<button className={className}
				onClick={
					() => {
						// if (lastMove === -1) {  // first move
						// 	setLastMove(squareNum)
						// 	handleClick(socket, blockNum, squareNum, lastMove)
						// 	socket.emit("lastMove", { lastMove })
						// }
						// else if (!blocks[blockNum][squareNum] && blockNum === lastMove && !blocks[blockNum][9]) {
						// 	setLastMove(squareNum)
						// 	handleClick(socket, blockNum, squareNum, lastMove)
						// 	socket.emit("lastMove", { lastMove })
						// }
						// else if (blocks[lastMove][9] && !blocks[blockNum][squareNum] && !blocks[blockNum][9]) {
						// 	setLastMove(squareNum)
						// 	handleClick(socket, blockNum, squareNum, lastMove)
						// 	socket.emit("lastMove", { lastMove })
						// }
						// else {
						// 	console.log("invalid move")
						// }
						if (myMove === whosTurn) {
							if (lastMove === -1) {  // first move
								setLastMove(squareNum)
								handleClick(socket, blockNum, squareNum, lastMove)
								// socket.emit("lastMove", { lastMove })
							}
							else if (!blocks[blockNum][squareNum] && blockNum === lastMove && !blocks[blockNum][9]) {
								setLastMove(squareNum)
								handleClick(socket, blockNum, squareNum, lastMove)
								// socket.emit("lastMove", { lastMove })
							}
							else if (blocks[lastMove][9] && !blocks[blockNum][squareNum] && !blocks[blockNum][9]) {
								setLastMove(squareNum)
								handleClick(socket, blockNum, squareNum, lastMove)
								// socket.emit("lastMove", { lastMove })
							}
							else {
								console.log("invalid move")
							}
						}


						// setClickedSquare(squareNum)
						// // console.log(socket.id)
						// setLastMove(squareNum)
						// console.log(lastMove)
						// handleClick(socket, blockNum, squareNum, lastMove)
					}
				}
			>
				<span className="letter">{blocks[blockNum][squareNum]}</span>
			</button>
		</>
	)
}

export default memo(Square)