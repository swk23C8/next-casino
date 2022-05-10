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
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkWinCon } from '@/components/Tic-Tac-Toe2/Logic/WinCon'


export default function Game({ socket = null, inLobby = null, roomPlayers = null, bet = null }) {

	const router = useRouter();
	const matchStart = { one: "", two: "", three: "", four: "", five: "", six: "", seven: "", eight: "", nine: "" }

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [grid, setGrid] = useState(matchStart)
	const [whosTurn, setWhosTurn] = useState('')
	const [gameOver, setGameOver] = useState(false)
	const [gameInfo, setGameInfo] = useState('Waiting for another player to connect....')
	const [myMove, setMyMove] = useState('')
	const opponent = useRef(null)
	const me = useRef(null)
	const winner = useRef();
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

	const notifyWin = () => toast.success('🦄 Wow so easy! You win!', {
		position: "top-left",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

	const notifyLose = () => toast.error('🦄 Wow so hard! You lose!', {
		position: "top-left",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

	const notifyPush = () => toast('🦄 Wow nice try! You tie!', {
		position: "top-left",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

	const notifyError = () => toast.error('🦄 Wow so error! Invalid!', {
		position: "top-left",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

	// api call to update token
	const updateToken = (e) => {
		if (me.current.username === "GUEST") {
			toast('🦄 Wow so GUEST! Free Game!', {
				position: "top-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
		else {
			axios.patch('/api/gameAction/updateToken', { e, })
				.then(res => {
					// setBalance(res.data.newToken);

					// emit to server to update balance
					socket.emit('updateBalance', res.data.newToken);
				})
				.catch(err => {
					// console.log(err)
					notifyError();
				})
		}
	}

	// only run if roomPlayers is not null
	let temp = null;
	if (roomPlayers) {
		if (roomPlayers.length === 2) {
			temp = (roomPlayers.filter(object => {
				return object.socketID !== socket.id;
			}))
			opponent.current = {
				username: temp[0].username,
				socketID: temp[0].socketID
			}
			temp = (roomPlayers.filter(object => {
				return object.socketID === socket.id;
			}))
			me.current = {
				username: temp[0].username,
				socketID: temp[0].socketID
			}
		}
	}

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
			checkMove(args.move, args.player, grid, args.me.username)
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
			socket.emit('move', { move: square, player: whosTurn, me: me.current }, () => {
				console.log(`Sent server move ${square} for player ${whosTurn}`)
			})
		}
	}

	function checkMove(nextMove, player = whosTurn, myGrid = grid, playerName) {
		const isWinner = checkWinCon(myGrid, setGrid, nextMove, player, playerName)
		if (isWinner) {
			winner.current = isWinner
			// setGameInfo(`${winner.current} has won!`)
			onOpen()
			if (winner.current === me.current.username) {
				console.log("token won: " + bet)
				updateToken("win");
				notifyWin();
				setGameInfo(`${winner.current} has won!`)
				// setGameInfo(`You won!`)
				// setPlayers(prevState => ({
				// 	...prevState,
				// 	[me.current.username]: {
				// 		...prevState[me.current.username],
				// 		winner: true,
				// 		turn: false,
				// 		loser: false,
				// 		draw: false,
				// 	}
				// }))
			}
			else if (winner.current === "tie") {
				console.log("Game tied, no token change")
				notifyPush();
			}
			else {
				console.log("token lost: " + bet)
				updateToken("loss");
				notifyLose();
				setGameInfo(`${winner.current} has won!`)
				// setGameInfo(`You lost!`)
				// setPlayers(prevState => ({
				// 	...prevState,
				// 	[me.current.username]: {
				// 		...prevState[me.current.username],
				// 		winner: false,
				// 		turn: false,
				// 		loser: true,
				// 		draw: false,
				// 	}
				// }))
			}

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
			<ToastContainer />
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
							{
								gameOver ? " " : (`It is ${whosTurn}'s turn!`)
								// gameOver ? (`${winner.current} won!`) : (`It is ${whosTurn}'s turn!`)
							}
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
				<Flex flexWrap="wrap" alignItems="center" justifyContent="center"
					width="20vw"
				>
					{Object.keys(grid).map((square, index) => {
						return (
							<>
								<Box as="button" p="1" borderWidth='5px' borderColor="grey"
									// width='10%' height='100px'
									boxSize="6vw"
									flexBasis="30%"
									backgroundColor=""
									onClick={() => handleClick(`${square}`)} key={"grid_" + index}
								>
									<Text fontSize="400%">
										{grid[square]}
									</Text>
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
						{/* <br />{"lasdfasdfol"} */}
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

				{/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
				</Modal> */}
			</>
		</>
	);
}