import React, { useState, useEffect } from 'react';
import Block from './Block';
import Board from './Board'
import io from 'socket.io-client'
import { nanoid } from "nanoid"

export default function Game({ socket = null, inLobby = null, roomPlayers = null, bet = null }) {

	const [blocks, setBlock] = useState(Array(9).fill().map(() => Array(10).fill(null)))
	const [XTurn, setXTurn] = useState(true)
	const [lastMove, setLastMove] = useState(-1)
	const [turn, setTurn] = useState(0)

	let isWin = checkWin()
	let status;
	if (turn < 81) {
		console.log('turn ' + turn)
		status = isWin ? ('Winner is ' + isWin + '!') : ('Next Turn: ' + (XTurn ? "X" : "O"))
	} else {
		status = 'Tie!'
	}

	useEffect(() => {
		socket.on("receive_move", (data) => {
			console.log('receive_data ' + data.block + ' ' + data.square)
			// [blockNum, squareNum] = data
			// handleClick(data.block, data.square)
		})
	}, [socket])


	function handleClick(blockNum, squareNum) {
		if (!isWin) {
			console.log('isWin: ' + isWin)
			blocks[blockNum][squareNum] = XTurn ? "X" : "O"
			setBlock(blocks)
			setXTurn(!XTurn)
			console.log(blocks)
			console.log(checkBlockWin())
		}
	}

	function checkBlockWin() {
		if (lastMove < 0) {
			return null
		}
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (blocks[lastMove][a] && blocks[lastMove][a] === blocks[lastMove][b] && blocks[lastMove][a] === blocks[lastMove][c]) {
				blocks[lastMove][9] = blocks[lastMove][a]
				setBlock(blocks)
				return blocks[lastMove][a];
			}
		}
		return null;
	}

	function checkWin() {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (blocks[a][9] && blocks[a][9] === blocks[b][9] && blocks[a][9] === blocks[c][9]) {
				return blocks[a][9];
			}
		}
		return null;
	}



	return (
		<>
			<>lol</>
			<Board blocks={blocks} setBlock={setBlock} XTurn={XTurn} setXTurn={setXTurn} handleClick={handleClick}
				lastMove={lastMove} setLastMove={setLastMove} setTurn={setTurn} turn={turn} socket={socket} isWin={isWin}
			/>
			{/* <h3 className='status'>Next Turn: {XTurn ? "X" : "O"}</h3> */}
			<h3 className='status'>{status}</h3>

		</>
	)
}