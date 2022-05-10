import Square from '@/components/Playground/Square';


export default function Block({ blockNum, blocks, setBlock, handleClick }) {


	function renderSquare(i) {
		return (
			<Square squareNum={i} blockNum={blockNum} blocks={blocks} />
		)
	}


	return (
		<div className="table border-2 border-solid border-black"
			onClick={
				() => console.log('BlockNum:  ' + blockNum)
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
	)
}