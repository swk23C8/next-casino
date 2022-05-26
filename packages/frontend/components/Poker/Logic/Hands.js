export const handleHands = (args, socket) => {
	console.log(args)
	let myHand
	// loop through hand in hands and find my hand
	for (let i = 0; i < args.length; i++) {
		if (args[i][0] === socket.id) {
			myHand = args[i][1]
			console.log("My Hand: ")
			console.log(myHand)
		}
	}
	return args
}