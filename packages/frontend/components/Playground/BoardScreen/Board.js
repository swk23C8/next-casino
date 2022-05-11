import Block from '@/components/Playground/BoardScreen/Block';

export default function Board({ blocks, handleClick, setClickedBlock, setClickedSquare }) {

	function renderBlock(i) {
		return (
			<Block blockNum={i} blocks={blocks} handleClick={handleClick}
				setClickedBlock={setClickedBlock} setClickedSquare={setClickedSquare}
			/>
		)
	}

	return (
		// pt-8 pb-8"
		<div className="board flex justify-center">
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