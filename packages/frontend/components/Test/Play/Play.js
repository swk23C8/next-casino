import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	useColorModeValue,
	Grid,
	GridItem
} from '@chakra-ui/react'
import { useRouter } from "next/router";
import {
	RefreshIcon,
	CheckIcon,
	XIcon,
} from '@heroicons/react/outline';
import { Box, Flex, Heading, Text, Center } from "@chakra-ui/layout";
import { useEffect, useRef, useState } from "react";
import { checkWinCon } from '@/components/Test/Logic/WinCon'
// import { playerTwo } from '@/components/Test/Logic/PlayerTwo';

export default function Game({ socket = null, inLobby = null, roomPlayers = null }) {

	// console.log(roomPlayers)
	// console.log(socket)

	// const opponent = {
	// 	username: null,
	// 	socketID: null
	// }





	const router = useRouter();
	const matchStart = { one: "", two: "", three: "", four: "", five: "", six: "", seven: "", eight: "", nine: "" }

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [grid, setGrid] = useState(matchStart)
	const [whosTurn, setWhosTurn] = useState('')
	const [gameOver, setGameOver] = useState(false)
	const [gameInfo, setGameInfo] = useState('Waiting for another player to connect....')
	const [myMove, setMyMove] = useState('')
	const opponent = useRef(null)

	const [players, setPlayers] = useState(
		{
			one: {
				name: '',
				symbol: '',
				score: 0,
				turn: false,
				winner: false,
				loser: false,
				draw: false,
			},
			two: {
				name: '',
				symbol: '',
				score: 0,
				turn: false,
				winner: false,
				loser: false,
				draw: false,
			}
		}
	)

	const winner = useRef();

	// only run if roomPlayers is not null
	let temp

	if (roomPlayers) {
		console.log("roomPlayers is not null")
		console.log(roomPlayers)
		if (roomPlayers.length === 2) {
			console.log("2 players in game")
			console.log(roomPlayers)

			temp = (roomPlayers.filter(object => {
				return object.socketID !== socket.id;
			}))
			console.log(temp[0].username)
			console.log(temp[0].socketID)
			opponent.current = {
				username: temp[0].username,
				socketID: temp[0].socketID
			}
			console.log(opponent.current)
			console.log("playing against: " + opponent.current.username)
		}
	}

	// useEffect(() => {
	// 	if (roomPlayers) {
	// 		console.log("roomPlayers is not null")
	// 		console.log(roomPlayers)
	// 		if (roomPlayers.length === 2) {
	// 			console.log("2 players in game")
	// 			console.log(roomPlayers)

	// 			let temp = (roomPlayers.filter(object => {
	// 				return object.socketID !== socket.id;
	// 			}))
	// 			console.log(temp)
	// 			setOpponent(temp)
	// 			console.log(opponent)
	// 			console.log("playing against: " + opponent[0].username)
	// 		}
	// 	}
	// }, [opponent])


	useEffect(() => {
		startGame()

		if (!socket) return;

		socket.once('ready', (args) => {
			setGameInfo(`Both players in room. Game will start shortly.....`)
		})

		socket.on("message", (args) => {
			console.log(args);
		});

		socket.on('myMove', args => {
			setGameInfo(`You will be playing as "${args}"`)
			onOpen()
			setMyMove(args)
			startGame()
		})

		socket.once('eBrake', (args) => {
			inLobby(true)
			// alert('The other player disconnected. Returning to Lobby....')
		})

	}, [])

	useEffect(() => {
		if (!socket) return;



		// when a player makes a move in an online game, the move is sent to the server then sent back to each
		//client at the same time, checkMove is run to see if that move would create a win and changes whos turn
		//it is on each client. The server has no logic of turn order or move state.
		socket.on('move', (args) => {
			socket.off('move') //required to ensure multiple listeners are not added on every re-render
			console.log(`Received move ${args.move} for player ${args.player}`)
			checkMove(args.move, args.player, grid)
		})

		//used to monitor how many instances of the 'move' listener are currently mounted
		// console.log(socket._callbacks.$move)

		return () => {
			if (socket) socket.off('move')
		}

	}, [socket, grid]);


	function handleClick(square) {
		//if game is already over, prevent any further board changes
		if (gameOver) {
			return;
		}

		// if its not your turn, prevent changes to the game board
		if (myMove !== whosTurn) {
			alert('It is not your turn yet!')
			return;
		}

		// if a square is clicked that has already has a move, prevent over-writes
		if (grid[square]) {
			grid[square] === whosTurn ? alert("You already went there!") :
				alert(grid[square] + " already went there!")
			return;
		}

		else {
			// send to sever the valid move and who made it, sending player as well to help prevent stale states
			socket.emit('move', { move: square, player: whosTurn }, () => {
				console.log(`Sent server move ${square} for player ${whosTurn}`)
			})
		}
	}

	function checkMove(nextMove, player = whosTurn, myGrid = grid) {
		const isWinner = checkWinCon(myGrid, setGrid, nextMove, player)
		if (isWinner) {
			console.log(isWinner)
			winner.current = isWinner
			setGameInfo(`${winner.current} has won!`)
			onOpen()
			setGameOver(true)
			return;
		}
		player === 'X' ? setWhosTurn('O') : setWhosTurn('X')
	}

	function startGame() {
		setGameOver(false)
		setGrid(matchStart)
		setWhosTurn('X')
	}

	const bg = useColorModeValue('blue.300', 'orange.200')


	return (
		<>

			{myMove ? (<>

				{/* START - MAIN INFO GRID ABOVE THE GAME BOARD */}
				<Grid templateRows={{ base: 'repeat (4, 1fr)', lg: 'repeat(2, 1fr)' }} templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4} mt='2' alignItems='center'>
					{/* Top Left box */}
					<GridItem gridArea={{ base: '3/1/ span 1 / span 1', lg: '1/1/ span 1 / span 1' }} w='100%' textAlign='center'>
						<Button
							onClick={() => {
								inLobby(true);
								socket.emit("leave");
							}}
						>
							Leave Game
						</Button>

					</GridItem>

					{/* Bottom Left box */}
					<GridItem></GridItem>

					{/* Top Middle Box (2 wide) */}
					<GridItem gridArea={{ base: '1/1/ span 1 / span 2', lg: '1/2/ span 1 / span 2' }} w='100%'>
						<Heading bg={bg} p='2' borderRadius='10px' textAlign='center' size='lg'>You are playing as {myMove} against {opponent.current.username}</Heading>
					</GridItem>

					{/* Borrom Middle Box (2 wide) */}
					<GridItem gridArea={{ base: '2/1/ span 1 / span 2', lg: '2/2/ span 1 / span 2' }} w='100%' textAlign='center'>
						<Heading p='2' size='lg'>
							{gameOver ? (`${winner.current} won!`) : (`It is ${whosTurn}'s turn!`)}
						</Heading>
					</GridItem>

					{/* Top Right box */}
					<GridItem gridArea={{ base: '3/2/ span 1 / span 1', lg: '1/4/ span 1 / span 1' }} w='100%' textAlign='center'>
						<Button
							rightIcon={<RefreshIcon />}
							onClick={() => socket.emit('rematch')}
						>
							Rematch?
						</Button>
					</GridItem>

					{/* Bottom Right Box */}
					<GridItem></GridItem>

				</Grid>
				{/* END - MAIN INFO GRID ABOVE THE GAME BOARD */}


				{/* START - GAME BOARD AREA */}
				<Flex flexWrap="wrap" alignItems="center" justifyContent="center" maxW="1000px">
					{Object.keys(grid).map((square, index) => {
						return (
							<>
								<Box as="button" p="1" borderWidth='5px' borderColor="grey" boxSize="12em" backgroundColor="" flexBasis="30%"
									onClick={() => handleClick(`${square}`)} key={"grid_" + index}
								>
									<Text fontSize="5em">{grid[square]}</Text>
								</Box>
							</>
						)
					})}

				</Flex>

				{/* START - GAME BOARD AREA */}

			</>) :
				(<>
					{/* INFO SECTION SHOWING WHEN WAITING FOR OPPONENT TO JOIN A ROOM AFTER CREATION AND ON JOIN */}
					<Heading textAlign={'center'} wordBreak='break-word'>
						{gameInfo}
						{/* <br />{"lol"} */}
					</Heading>
					<Button border='2px'
						onClick={() => {
							inLobby(true);
							socket.emit("leave");
						}}
						m='2'
					>
						Back to Lobby
					</Button>
				</>
				)
			}
			<>

				<Modal isOpen={isOpen} onClose={onClose} isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Tic Tac Toe</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Center>{gameInfo}</Center>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} onClick={onClose}>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		</>
	);
}