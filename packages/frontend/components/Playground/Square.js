import { useState, useEffect } from 'react';


export default function Square({ squareNum, blockNum, blocks, setBlock, XTurn, setXTurn, handleClick, lastMove, setLastMove, setTurn, turn, socket, isWin }) {


	return (
		<button className=
			"square bg-white border-2 border-solid border-gray-300 float-left text-2xl font-bold w-16 h-16 mr-1 mt-1 text-center hover:bg-gray-400"
			onClick={
				() => {
					if (!isWin) {
						console.log("LastMove: " + lastMove)
						console.log("Squarenum:  " + squareNum)
						// if (lastMove === -1) {  // first move
						// 	setLastMove(squareNum)
						// 	handleClick(blockNum, squareNum)
						// 	setTurn(++turn)
						// 	socket.emit("send_move", { block: blockNum, square: squareNum })
						// }
						// else if (!blocks[blockNum][squareNum] && blockNum === lastMove && !blocks[blockNum][9]) {
						// 	setLastMove(squareNum)
						// 	handleClick(blockNum, squareNum)
						// 	setTurn(++turn)
						// 	socket.emit("send_move", { block: blockNum, square: squareNum })
						// }
						// else if (blocks[lastMove][9] && !blocks[blockNum][squareNum] && !blocks[blockNum][9]) {
						// 	setLastMove(squareNum)
						// 	handleClick(blockNum, squareNum)
						// 	setTurn(++turn)
						// 	socket.emit("send_move", { block: blockNum, square: squareNum })
						// }
					}
				}
			}
		>
			{/* {blockNum} - {squareNum} */}
			<span className="letter">{blocks[blockNum][squareNum]}</span>
		</button>
	)
}