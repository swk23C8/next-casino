import Square from '@/components/Playground/BoardScreen/Square';
import { useState } from 'react';

export default function Block({ blockNum, blocks, setClickedBlock, setClickedSquare }) {

	function renderSquare(i) {
		return (
			<Square squareNum={i} blockNum={blockNum} blocks={blocks}
				setClickedSquare={setClickedSquare}
			/>
		)
	}


	return (
		<>
			<div className="table border-2 border-solid border-black"
				onClick={
					() => {
						// console.log('BlockNum:  ' + blockNum)
						setClickedBlock(blockNum+1)
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