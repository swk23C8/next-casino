import React from 'react';
import Square from './Square'


export default function Block({ blockNum, blocks, setBlock, XTurn, setXTurn, handleClick, lastMove, setLastMove, setTurn, turn, socket, isWin }) {


	function renderSquare(i) {
		return (
			<Square squareNum={i} blockNum={blockNum} blocks={blocks}
				setBlock={setBlock} XTurn={XTurn} setXTurn={setXTurn}
				handleClick={handleClick} lastMove={lastMove} setLastMove={setLastMove}
				setTurn={setTurn} turn={turn} socket={socket} isWin={isWin} />
		)
	}


	return (
		<div className="block" onClick={() => console.log('BlockNum:  ' + blockNum)}>
			<div className="board-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className="board-row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="board-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</div>
	)
}