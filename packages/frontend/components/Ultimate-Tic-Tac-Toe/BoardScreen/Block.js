import Square from '@/components/Ultimate-Tic-Tac-Toe/BoardScreen/Square';
import { useState, memo } from 'react';

const Block = ({ blockNum, blocks, setClickedBlock, setClickedSquare, socket, handleClick, lastMove, setLastMove, myMove, whosTurn, gameOver }) => {

	function renderSquare(i) {
		return (
			<Square squareNum={i} blockNum={blockNum} blocks={blocks}
				setClickedSquare={setClickedSquare} socket={socket} handleClick={handleClick}
				clickedBlock={setClickedBlock}
				lastMove={lastMove} setLastMove={setLastMove}
				myMove={myMove} whosTurn={whosTurn}
				gameOver={gameOver}
			/>
		)
	}


	return (
		<>
			<div className="table border-2 border-solid border-black"
				onClick={
					() => {
						// console.log('BlockNum:  ' + blockNum)
						setClickedBlock(blockNum)
						// console.log(socket)

					}
				}
			>
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
			</div >
		</>
	)
}

export default memo(Block);