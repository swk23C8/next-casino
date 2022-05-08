//accepts the current state of the game board as GRID, the state function of SETGRID
//the last player move as PLAYERMOVE, who made the last move as WHOSTURN and boolean to track single player game
//this functions will check to see if the last played move caused a win con or not
export const checkWinCon = (grid, setGrid, playerMove, whosTurn, me) => {
	console.log(me)
	const tempGrid = { ...grid, [playerMove]: whosTurn }

	function winner(tempGrid) {
		const boardState = [
			(tempGrid["one"] === tempGrid["two"] && tempGrid["one"] === tempGrid["three"] && tempGrid["one"] != ""),
			(tempGrid["four"] === tempGrid["five"] && tempGrid["four"] === tempGrid["six"] && tempGrid["four"] != ""),
			(tempGrid["seven"] === tempGrid["eight"] && tempGrid["seven"] === tempGrid["nine"] && tempGrid["seven"] != ""),
			(tempGrid["one"] === tempGrid["four"] && tempGrid["one"] === tempGrid["seven"] && tempGrid["one"] != ""),
			(tempGrid["two"] === tempGrid["five"] && tempGrid["two"] === tempGrid["eight"] && tempGrid["two"] != ""),
			(tempGrid["three"] === tempGrid["six"] && tempGrid["three"] === tempGrid["nine"] && tempGrid["three"] != ""),
			(tempGrid["one"] === tempGrid["five"] && tempGrid["one"] === tempGrid["nine"] && tempGrid["one"] != ""),
			(tempGrid["three"] === tempGrid["five"] && tempGrid["three"] === tempGrid["seven"] && tempGrid["three"] != "")
		]

		return boardState.find(winCon => winCon == true)
	}

	setGrid({ ...tempGrid })

	//if the last move matched a win con, update the boardstate GRID, and return the player who won
	if (winner(tempGrid)) {
		return me
		// return whosTurn
	}

	//checks to see if there are any more open spaces on the board, if not than end the game a draw
	const movesLeft = Object.values(tempGrid).filter(moves => moves === '').length
	if (movesLeft === 0) {
		return "No one"
	}

	//return null to not trigger win condition
	return ""

}