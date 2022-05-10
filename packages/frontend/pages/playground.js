import Layout from "@/components/Layout";
import { useState } from "react";
import Board from "@/components/Playground/Board";

// const objectGrid = {
// 	1: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	2: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	3: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	4: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	5: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	6: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	7: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	8: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// 	9: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
// }
// console.log(objectGrid)

// const UltimateGrid = [
// 	[
// 		"1_1", "1_2", "1_3",
// 		"1_4", "1_5", "1_6",
// 		"1_7", "1_8", "1_9",
// 	],
// 	[
// 		"2_1", "2_2", "2_3",
// 		"2_4", "2_5", "2_6",
// 		"2_7", "2_8", "2_9",
// 	],
// 	[
// 		"3_1", "3_2", "3_3",
// 		"3_4", "3_5", "3_6",
// 		"3_7", "3_8", "3_9",
// 	],
// 	[
// 		"4_1", "4_2", "4_3",
// 		"4_4", "4_5", "4_6",
// 		"4_7", "4_8", "4_9",
// 	],
// 	[
// 		"5_1", "5_2", "5_3",
// 		"5_4", "5_5", "5_6",
// 		"5_7", "5_8", "5_9",
// 	],
// 	[
// 		"6_1", "6_2", "6_3",
// 		"6_4", "6_5", "6_6",
// 		"6_7", "6_8", "6_9",
// 	],
// 	[
// 		"7_1", "7_2", "7_3",
// 		"7_4", "7_5", "7_6",
// 		"7_7", "7_8", "7_9",
// 	],
// 	[
// 		"8_1", "8_2", "8_3",
// 		"8_4", "8_5", "8_6",
// 		"8_7", "8_8", "8_9",
// 	],
// 	[
// 		"9_1", "9_2", "9_3",
// 		"9_4", "9_5", "9_6",
// 		"9_7", "9_8", "9_9",
// 	],
// ]

// let grid1 = UltimateGrid[0]
// let grid2 = UltimateGrid[1]
// let grid3 = UltimateGrid[2]
// let grid4 = UltimateGrid[3]
// let grid5 = UltimateGrid[4]
// let grid6 = UltimateGrid[5]
// let grid7 = UltimateGrid[6]
// let grid8 = UltimateGrid[7]
// let grid9 = UltimateGrid[8]



// console.log(grid1)


export default function Playground() {
	const [blocks, setBlock] = useState(Array(9).fill().map(() => Array(9).fill("lol")))
	const [grid, setGrid] = useState(blocks)
	const [grid1, setGrid1] = useState(grid[0])
	const [grid2, setGrid2] = useState(grid[1])
	const [grid3, setGrid3] = useState(grid[2])
	const [grid4, setGrid4] = useState(grid[3])
	const [grid5, setGrid5] = useState(grid[4])
	const [grid6, setGrid6] = useState(grid[5])
	const [grid7, setGrid7] = useState(grid[6])
	const [grid8, setGrid8] = useState(grid[7])
	const [grid9, setGrid9] = useState(grid[8])

	console.log()




	return (
		<Layout>
			{/* Map through UltimateGrid and print 3x3 grids */}
			{/* {UltimateGrid.map((grid, index) => {
				return (
					<div key={index}>
						{grid.map((grid, index) => {
							return (
								<div key={index}>
									{grid}
								</div>
							)
						})}
					</div>
				)
			})} */}

			{/* <div className="board">
				<div className="board_row">
					<div className="board_cell">
						{grid1[0]}
					</div>
					<div className="board_cell">
						{grid1[1]}
					</div>
					<div className="board_cell">
						{grid1[2]}
					</div>
					<div className="board_cell">
						{grid1[3]}
					</div>
					<div className="board_cell">
						{grid1[4]}
					</div>
					<div className="board_cell">
						{grid1[5]}
					</div>
					<div className="board_cell">
						{grid1[6]}
					</div>
					<div className="board_cell">
						{grid1[7]}
					</div>
					<div className="board_cell">
						{grid1[8]}
					</div>
				</div>
				<div className="board_row">
					<div className="board_cell">
						{grid2[0]}
					</div>
					<div className="board_cell">
						{grid2[1]}
					</div>
					<div className="board_cell">
						{grid2[2]}
					</div>
					<div className="board_cell">
						{grid2[3]}
					</div>
					<div className="board_cell">
						{grid2[4]}
					</div>
					<div className="board_cell">
						{grid2[5]}
					</div>
					<div className="board_cell">
						{grid2[6]}
					</div>
					<div className="board_cell">
						{grid2[7]}
					</div>
					<div className="board_cell">
						{grid2[8]}
					</div>
				</div>
			</div> */}

			{/* justify-content: center;
			display: flex;
			padding: 100px;
			padding-top: 30px;
			padding-bottom: 30px; */}
			<Board blocks={blocks} />
		</Layout>
	);
}
