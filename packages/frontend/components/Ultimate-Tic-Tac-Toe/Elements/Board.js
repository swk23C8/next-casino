import React from 'react';
import Block from './Block'

export default function Board({ blocks, setBlock, XTurn, setXTurn, handleClick, lastMove, setLastMove, setTurn, turn, socket, isWin }) {

	function renderBlock(i) {
		return (
			<Block blockNum={i} blocks={blocks} setBlock={setBlock} XTurn={XTurn} setXTurn={setXTurn} handleClick={handleClick}
				lastMove={lastMove} setLastMove={setLastMove} setTurn={setTurn} turn={turn} socket={socket} isWin={isWin} />
		)
	}

	return (
		<div className="board">
			<div className="block-row">
				{renderBlock(0)}
				{renderBlock(3)}
				{renderBlock(6)}
			</div>
			<div className="block-row">
				{renderBlock(1)}
				{renderBlock(4)}
				{renderBlock(7)}
			</div>
			<div className="block-row">
				{renderBlock(2)}
				{renderBlock(5)}
				{renderBlock(8)}
			</div>
		</div>
	)
}