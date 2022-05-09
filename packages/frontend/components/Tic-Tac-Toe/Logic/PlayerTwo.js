export const playerTwo = (grid) => {

	console.log(grid)

	//all possible win combos, will be used to check states of these for possible moves
	const gridState = [
		['one', 'two', 'three'],
		['four', 'five', 'six'],
		['seven', 'eight', 'nine'],
		['one', 'four', 'seven'],
		['two', 'five', 'eight'],
		['three', 'six', 'nine'],
		['one', 'five', 'nine'],
		['three', 'five', 'seven']
	]

	//create a Set for each set of moves to be logged, use set to avoid duplicates during search
	let blockPlays = new Set()
	let winPlays = new Set()
	let plays = new Set()

	//loop through each win combo to check current state
	for (let play of gridState) {
		let X = 0 //track number of X and O move, where they do not matter only how many there are
		let O = 0 //only the free spots are needed to be tracked to know what a possible next move is
		let E = []

		for (let square of play) {
			let move = grid[square]
			move == "X" ? X++ : move == "O" ? O++ : E.push(square) //add the address of each empty square
		}

		if (X == 2 && E.length == 1) { //if the player has a win combo with 2 plays, add the empty box as a block
			E.map(e => blockPlays.add(e))
		} else if (O == 2 && E.length == 1) { //if the NPC has a win avail, add the empty box as a win
			E.map(e => winPlays.add(e))
		} else {
			E.map(e => plays.add(e)) //if there are no moves that require a block or win, add all empty blocks to RNG move list
		}
	}

	let nextPlays = []

	//break the sets up from their key/value pairs into an array that can be used to RNG the move.
	winPlays.size === 0 ?
		blockPlays.size === 0 ?
			plays.forEach((value) => nextPlays.push(value)) :
			blockPlays.forEach((value) => nextPlays.push(value)) :
		winPlays.forEach((value) => nextPlays.push(value))

	const PCplay = Math.floor(Math.random() * nextPlays.length)

	return nextPlays[PCplay]

}