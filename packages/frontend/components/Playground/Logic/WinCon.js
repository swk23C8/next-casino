//accepts the current state of the game board as GRID, the state function of SETGRID
//the last player move as PLAYERMOVE, who made the last move as WHOSTURN and boolean to track single player game
//this functions will check to see if the last played move caused a win con or not
export const checkWinCon = (grid, setGrid, block, square, whosTurn, playerName) => {

	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]

	// console.log("block: " + block)
	// console.log("square: " + square)
	// console.log("whosTurn: " + whosTurn)
	// console.log("playerName: " + playerName)

	const tempGrid = { ...grid }
	tempGrid[block][square] = whosTurn

	// // log first block
	// for (let i = 0; i < 9; i++) {
	// 	console.log(tempGrid[0][i])
	// }

	// function to check if a block is won
	// condition: iterate through each square in a block to check if
	// 3 squares in a row according to lines array is the same whosTurn
	function checkBlockWin() {
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i]
			if (tempGrid[block][a] && tempGrid[block][a] === tempGrid[block][b] && tempGrid[block][a] === tempGrid[block][c]) {
				tempGrid[block][9] = tempGrid[block][a]
				return console.log("block " + block + " won by " + tempGrid[block][9])
			}
		}
		return false
	}

	// function to check if the board is won
	// condition: iterate through each block in a board to check if
	// 3 blocks in a row according to lines array is the same whosTurn
	function checkBoardWin() {
		for (let j = 0; j < lines.length; j++) {
			const [a, b, c] = lines[j]
			if (tempGrid[a][9] && tempGrid[a][9] === tempGrid[b][9] && tempGrid[a][9] === tempGrid[c][9]) {
				return console.log("board won by " + tempGrid[a][9])
			}
		}
	}

	checkBlockWin()
	checkBoardWin()
	setGrid({ ...tempGrid })


	//return null to not trigger win condition
	return ""

}