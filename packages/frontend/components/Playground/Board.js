import Block from '@/components/Playground/Block';

export default function Board({ blocks, setBlock, XTurn, setXTurn, handleClick, lastMove, setLastMove, setTurn, turn, socket, isWin }) {

	function renderBlock(i) {
		return (
			<Block blockNum={i} blocks={blocks} handleClick={handleClick}
			/>
		)
	}

	return (
		<div className="board flex justify-center p-28 pt-8 pb-8">
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