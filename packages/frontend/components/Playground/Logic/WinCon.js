//accepts the current state of the game board as GRID, the state function of SETGRID
//the last player move as PLAYERMOVE, who made the last move as WHOSTURN and boolean to track single player game
//this functions will check to see if the last played move caused a win con or not
export const checkWinCon = (grid, setGrid, block, square, whosTurn, playerName, myLastMove, setLastMove) => {

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


	const tempGrid = { ...grid }
	tempGrid[block][square] = whosTurn


	function checkBlockWin(tempGrid) {
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i]
			if (tempGrid[block][a] && tempGrid[block][a] === tempGrid[block][b] && tempGrid[block][a] === tempGrid[block][c]) {
				tempGrid[block][9] = tempGrid[block][a]
				return (
					tempGrid[block][9]
				)
			}
		}
		return false
	}

	// function to check if the board is won
	// condition: iterate through each block in a board to check if
	// 3 blocks in a row according to lines array is the same whosTurn
	function checkBoardWin(tempGrid) {
		for (let j = 0; j < lines.length; j++) {
			const [a, b, c] = lines[j]
			if (tempGrid[a][9] && tempGrid[a][9] === tempGrid[b][9] && tempGrid[a][9] === tempGrid[c][9]) {
				return (
					// console.log("board won by " + tempGrid[a][9])
					tempGrid[a][9]
				)
			}
		}
		return false
	}

	setGrid({ ...tempGrid })



	checkBlockWin(tempGrid)

	if (checkBoardWin(tempGrid)) {
		return playerName
	}

	//checks to see if there are any more open spaces on the board, if not than end the game a draw
	// const movesLeft = Object.values(tempGrid).filter(moves => moves === '').length

	const flatGrid = Object.values(tempGrid).flat()
	const movesLeft = flatGrid.filter(moves => moves === '').length


	// console.log(movesLeft);

	if (movesLeft === 0) {
		return "tie"
	}


	//return null to not trigger win condition
	return ""

}