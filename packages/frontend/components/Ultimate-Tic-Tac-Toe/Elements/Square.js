import React from 'react';
import { useState, useEffect } from 'react';


export default function Square({ squareNum, blockNum, blocks, setBlock, XTurn, setXTurn, handleClick, lastMove, setLastMove, setTurn, turn, socket, isWin }) {

	// const [value, setValue] = useState("");
	// const [lastMove, setLastMove] = useState(null)

	let className = "square";
	if (!isWin) {
		if (lastMove >= 0 && blocks[lastMove][9] && !blocks[blockNum][squareNum]) {
			if (lastMove !== blockNum && !blocks[blockNum][9]) {
				console.log('1')
				className += " lastMove"
			}
		} else if (lastMove === blockNum && !blocks[blockNum][squareNum]) {
			console.log('2')
			className += " lastMove"
		}
	}

	return (
		<button className={className} onClick={() => {
			if (!isWin) {
				console.log("LastMove: " + lastMove)
				console.log("Squarenum:  " + squareNum)
				if (lastMove === -1) {  // first move
					setLastMove(squareNum)
					handleClick(blockNum, squareNum)
					setTurn(++turn)
					socket.emit("send_move", { block: blockNum, square: squareNum })
				}
				else if (!blocks[blockNum][squareNum] && blockNum === lastMove && !blocks[blockNum][9]) {
					setLastMove(squareNum)
					handleClick(blockNum, squareNum)
					setTurn(++turn)
					socket.emit("send_move", { block: blockNum, square: squareNum })
				}
				else if (blocks[lastMove][9] && !blocks[blockNum][squareNum] && !blocks[blockNum][9]) {
					setLastMove(squareNum)
					handleClick(blockNum, squareNum)
					setTurn(++turn)
					socket.emit("send_move", { block: blockNum, square: squareNum })
				}
			}
		}
		}>
			{/* {blockNum} - {squareNum} */}
			<span className="letter">{blocks[blockNum][squareNum]}</span>
		</button>
	)
}