import { useState, useEffect } from 'react';


export default function Square({ squareNum, blockNum, blocks, setClickedSquare, socket, handleClick }) {


	return (
		<>
			<button className="square bg-white border-2 border-solid border-gray-300 float-left
				text-2xl font-bold w-[9vh] h-[9vh] mr-1 mt-1 text-center hover:bg-gray-400"
				onClick={
					() => {
						// console.log("Squarenum:  " + squareNum)
						setClickedSquare(squareNum + 1)
						// console.log(socket.id)
						handleClick(socket, blockNum, squareNum)
					}
				}
			>
				<span className="letter">{blocks[blockNum][squareNum]}</span>
			</button>
		</>
	)
}