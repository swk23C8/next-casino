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
import { checkWinCon } from '@/components/Ultimate-Tic-Tac-Toe/Logic/WinCon';
import Board from "@/components/Ultimate-Tic-Tac-Toe/BoardScreen/Board";

const Game = ({ socket = null, inLobby = null, roomPlayers = null, bet = null }) => {
	// const matchStart = Array(9).fill().map((_, index) =>
	// 	Array(9).fill(index + 1)
	// )
	const matchStart = Array(9).fill().map((_, index) =>
		Array(10).fill("")
	)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [grid, setGrid] = useState(matchStart)
	const [clickedBlock, setClickedBlock] = useState("NULL")
	const [clickedSquare, setClickedSquare] = useState("NULL")
	const [whosTurn, setWhosTurn] = useState('')
	const [gameOver, setGameOver] = useState(false)
	const [gameInfo, setGameInfo] = useState('Waiting for another player to connect....')
	const [myMove, setMyMove] = useState('')
	const opponent = useRef(null)
	const me = useRef(null)
	const winner = useRef();
	const [lastMove, setLastMove] = useState(-1)
	const [turnsLeft, setTurnsLeft] = useState(81)

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
		if ((me.current.username).startsWith('GUEST')) {
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
					// emit to server to update balance
					socket.emit('updateBalance', res.data.newToken);
				})
				.catch(err => {
					// console.log(err)
					notifyError();
				})
		}
	}

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
		socket.on('test', (args) => {
			socket.off('test') //required to ensure multiple listeners are not added on every re-render
			// console.log(`Received move ${args.move} for player ${args.player}`)
			checkMove(args.block, args.square, args.player, grid, args.me.username)
		})

		// // receive opponent's lastMove for valid blocks
		socket.on('lastMove', (args) => {
			socket.off('lastMove')
			setLastMove(args.lastMove)
		})

		// socket.emit("lastMove", { lastMove })

		//used to monitor how many instances of the 'move' listener are currently mounted
		// console.log(socket._callbacks.$move)
		return () => {
			if (socket) socket.off('test')
			if (socket) socket.off('lastMove')
		}
	}, [socket, grid, lastMove]);


	useEffect(() => {
		if (!socket) return;

		if (myMove === whosTurn) {
			socket.emit("lastMove", { lastMove })
		}

		return () => {
			if (socket) socket.off('lastMove')
		}
	}, [socket, lastMove]);


	function handleClick(socket, block, square) {

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
		if (grid[block][square]) {
			grid[block][square] === whosTurn ? alert("You already went there!") :
				alert(grid[block][square] + " already went there!")
			return;
		}

		// if the block is already won, prevent changes to the that block
		if (grid[block][9] !== '') {
			grid[block][9] === whosTurn ? alert('You won this block!') :
				alert(grid[block][9] + ' already won the block!')
			return;
		}

		else {
			// setLastMove(square)
			// send to sever the valid move and who made it, sending player as well to help prevent stale states
			socket.emit('test', { block: block, square: square, player: whosTurn, me: me.current }, () => {
				console.log(`Sent server move ${square} for player ${whosTurn}`)
			})
			setTurnsLeft(turnsLeft - 1)
		}
	}

	function checkMove(block, square, player = whosTurn, myGrid = grid, playerName, myLastMove = lastMove) {
		const isWinner = checkWinCon(myGrid, setGrid, block, square, player, playerName, myLastMove)
		if (isWinner) {
			winner.current = isWinner
			// setGameInfo(`${winner.current} has won!`)
			onOpen()
			if (winner.current === me.current.username) {
				console.log("token won: " + bet)
				updateToken("win");
				notifyWin();
				setGameInfo(`${winner.current} has won!`)
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

	// inside 1 Board > 9 Blocks in each Board > 9 Squares in each Block
	return (
		<>
			<ToastContainer />
			{myMove ? (<>
				{/* START - MAIN INFO GRID ABOVE THE GAME BOARD */}
				<Grid templateRows={{ base: 'repeat (4, 1fr)', lg: 'repeat(2, 1fr)' }} templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1} mt='2' alignItems='center'>
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
						<Heading bg={bg} p='2' borderRadius='10px' textAlign='center' size='md'>You are playing as {myMove} against {opponent.current.username}</Heading>
					</GridItem>

					{/* Borrom Middle Box (2 wide) */}
					<GridItem gridArea={{ base: '2/1/ span 1 / span 2', lg: '2/2/ span 1 / span 2' }} w='100%' textAlign='center'>
						<Heading size='lg'>
							{
								gameOver ? "GAMEOVER" : (`It is ${whosTurn}'s turn!`)
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
					// width="45vw"
					mb={4}
				>
					{/* <div>
						<p>clicked on block: {clickedBlock}</p>
						<p>clicked on square: {clickedSquare}</p>
					</div> */}
					<Board
						blocks={grid}
						setClickedBlock={setClickedBlock}
						setClickedSquare={setClickedSquare}
						handleClick={handleClick}
						socket={socket}
						lastMove={lastMove}
						setLastMove={setLastMove}
						myMove={myMove}
						whosTurn={whosTurn}
						gameOver={gameOver}
					/>

				</Flex>

				{/* END - GAME BOARD AREA */}

			</>) :
				(<>
					{/* INFO SECTION SHOWING WHEN WAITING FOR OPPONENT TO JOIN A ROOM AFTER CREATION AND ON JOIN */}
					<Heading textAlign={'center'} wordBreak='break-word'>
						{gameInfo}
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
					<ModalOverlay width='100%' height='100%' />
					<ModalContent top="-5%">
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

export default Game;