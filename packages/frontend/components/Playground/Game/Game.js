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
import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	SliderMark,
	Tooltip,
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
import { checkWinCon } from '@/components/Playground/Logic/WinCon';
import { handleHands } from '@/components/Playground/Logic/Hands';
import Board from "@/components/Playground/BoardScreen/Board";

const Game = ({ socket = null, setInLobby = null, roomPlayers = null, bet = null, room = null, setInGame = null, balance = null }) => {
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
	const [myHand, setMyHand] = useState()
	const [dealtCards, setDealtCards] = useState(false)

	const [currentDeckTest, setCurrentDeckTest] = useState()
	const [hands, setHands] = useState(['1B', '1B'])
	const [communityCardsTest, setCommunityCardsTest] = useState(['1B', '1B', '1B', '1B', '1B'])
	const [revealHands, setRevealHands] = useState(false)


	const [sliderValue, setSliderValue] = useState(5)
	const [showTooltip, setShowTooltip] = useState(false)
	const [currentPot, setCurrentPot] = useState(bet)
	const [currentStake, setCurrentStake] = useState()

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
		// startGame()
		if (!socket) return;
		socket.once('ready', (args) => {
			setGameInfo(`Both players in room. Game will start shortly.....`)
		})
		socket.on('myMove', args => {
			setGameInfo(`You will be playing as "${args}"`)
			onOpen()
			setMyMove(args)
			// if args is Big Blind set currentStake to bet and if args is Small Blind set currentStake to bet / 2
			if (args === 'Big Blind') {
				setCurrentStake(bet)
			}
			else if (args === 'Small Blind') {
				setCurrentStake(bet / 2)
			}
			startGame()
		})

		socket.once('eBrake', (args) => {
			setInLobby(true)
			setInGame(false)
			// alert('The other player disconnected. Returning to Lobby....')
		})

		socket.on('resetDeck', (args) => {
			console.log("resetDeck")
			console.log(args)
			setCurrentDeckTest(args)
		})
	}, [])

	useEffect(() => {
		if (!socket) return;

		// receive my hand
		socket.on('hands', (args) => {
			console.log("lol")
			setHands(args)
			socket.off('hands')
		})
		socket.on('currentDeck', (args) => {
			console.log("received currentDeck")
			setCurrentDeckTest(args)
			console.log(currentDeckTest)

			socket.off('currentDeck')
		})
		socket.on('communityCards', (args) => {
			console.log("received communityCards")
			setCommunityCardsTest(args)
			console.log(communityCardsTest)
			socket.off('communityCards')
		})
		socket.on('solveHands', (args) => {
			console.log("received solveHands")

			let winner = roomPlayers.filter(object => {
				return object.socketID === args[1];
			})
			// console.log(winner[0].username)
			// setGameInfo(`${args[1] === 'win' ? '🦄 Wow so easy! You win!': '🦄 Wow so hard! You lose!'}`)
			// setGameInfo(`"${args[1]}" won the game`)
			setGameInfo(`${winner[0].username} won the game`)
			onOpen()

			console.log(args)
			setRevealHands(true)
			socket.off('solveHands')
		})
		return () => {
			if (socket) socket.off('hands')
			if (socket) socket.off('currentDeck')
			if (socket) socket.off('communityCards')
			if (socket) socket.off('solveHands')
		}
	}, [socket, myHand, communityCardsTest, currentDeckTest]);

	// useEffect(() => {
	// 	if (!socket) return;
	// 	console.log("All Hands: ")
	// 	console.log(hands)
	// 	console.log("My Socket: ")
	// 	console.log(socket.id)

	// 	// loop through hand in hands and find my hand
	// 	for (let i = 0; i < hands.length; i++) {
	// 		if (hands[i][0] === socket.id) {
	// 			setMyHand(hands[i][1])
	// 			console.log("My Hand: ")
	// 			console.log(myHand)
	// 		}
	// 	}
	// }, [hands]);


	// useEffect(() => {
	// 	if (!socket) return;
	// 	socket.on('communityCards', (args) => {
	// 		console.log("communityCards")
	// 		console.log(args)
	// 		setCommunityCardsTest(args)
	// 		socket.off('communityCards')
	// 	})
	// 	return () => {
	// 		if (socket) socket.off('lastMove')
	// 	}
	// }, [socket, communityCardsTest]);

	function getHands(args, socket) {
		const allHands = handleHands(args, socket)
		// console.log(allHands)
	}

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
			// send to sever the valid move and who made it, sending player as well to help prevent stale states
			socket.emit('test', { block: block, square: square, player: whosTurn, me: me.current }, () => {
				console.log(`Sent server move ${square} for player ${whosTurn}`)
			})
			setTurnsLeft(turnsLeft - 1)
		}
	}

	function startGame() {
		setGameOver(false)
		setGrid(matchStart)
		setWhosTurn('Small Blind')

		setCurrentDeckTest(room.deck)
		setInGame(true)
	}

	const bg = useColorModeValue('blue.300', 'orange.200')

	// inside 1 Board > 9 Blocks in each Board > 9 Squares in each Block
	return (
		<>
			<ToastContainer />
			{myMove ? (
				<>
					{/* START - MAIN INFO GRID ABOVE THE GAME BOARD */}
					<Grid templateRows={{ base: 'repeat (4, 1fr)', lg: 'repeat(2, 1fr)' }}
						templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
						gap={1.5}
						mt='2.5vh'
						alignItems='center'
					>
						{/* Top Left box */}
						<GridItem gridArea={{ base: '4/1/ span 1 / span 1', lg: '1/1/ span 1 / span 1' }} w='100%' textAlign='center'>
							<Button
								onClick={() => {
									setInLobby(true);
									setInGame(false);
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
							<Heading bg={bg} p='0.5' borderRadius='10px' textAlign='center' size='lg'>
								{/* 🤜🆚🤛 */}
								You 🆚 {opponent.current.username}
							</Heading>
							<Heading pt='1' size='sm' textAlign='center'>
								{/* if whosTurn is equals myMove */}
								{whosTurn === myMove ? (
									<>
										<Text color='green.500'>
											It's your turn!
										</Text>
									</>
								) : (

									<>
										<Text color='red.500'>
											It's not your turn yet!
										</Text>
									</>
								)}
								{/* <span>Press 'Deal Cards' to get your Hand!</span> */}
							</Heading>
						</GridItem>

						{/* Borrom Middle Box (2 wide) */}
						<GridItem gridArea={{ base: '2/1/ span 1 / span 2', lg: '2/2/ span 1 / span 2' }} w='100%' textAlign='center'>

							<Button
								onClick={() => {
									socket.emit("deal", [currentDeckTest]);
									console.log("sent current deck")
									console.log(currentDeckTest)
								}}
								width='25%'
								m={1}
								bg={'orange.200'}
							>
								Deal Cards
							</Button>
							<Button
								onClick={() => {
									socket.emit("communityCards", [currentDeckTest, communityCardsTest]);
									console.log("sent current deck")
									console.log(currentDeckTest)
									console.log("sent communityCards")
									console.log(communityCardsTest)
								}}
								width='35%'
								m={1}
								bg={'orange.200'}
							>
								Community Card
							</Button>
							<Button
								onClick={() => {
									socket.emit("testPoker", [currentDeckTest, communityCardsTest, hands]);
								}}
								width='25%'
								m={1}
								bg={'orange.200'}
							>
								Showdown
							</Button>
							{/* <Button
								onClick={() => {
									socket.emit("resetDeck", socket.id);
								}}
								width='30%'
								m={1}
								bg={'orange.200'}
							>
								Reset Deck
							</Button> */}
						</GridItem>

						{/* Borrom Middle Box (2 wide) */}
						<GridItem gridArea={{ base: '3/1/ span 1 / span 2', lg: '3/2/ span 1 / span 2' }} w='100%' textAlign='center'>

							<Button
								onClick={() => {
									console.log("call")
								}}
								width='25%'
								m={1}
								bg={'orange.300'}
							>
								Call
							</Button>
							<Button
								onClick={() => {
									console.log("raise")
								}}
								width='25%'
								m={1}
								bg={'orange.300'}
							>
								Raise
							</Button>
							<Button
								onClick={() => {
									console.log("fold")
								}}
								width='25%'
								m={1}
								bg={'orange.300'}
							>
								Fold
							</Button>
							<div className="flex">
								<>
									<Slider
										id='slider'
										defaultValue={5}
										min={0}
										max={100}
										colorScheme='teal'
										onChange={(v) => setSliderValue(v)}
										onMouseEnter={() => setShowTooltip(true)}
										onMouseLeave={() => setShowTooltip(false)}
										mb={2}
										ml={2}
									>
										<SliderMark value={25} mt='5' ml='-2.5' fontSize='sm'>
											25%
										</SliderMark>
										<SliderMark value={50} mt='5' ml='-2.5' fontSize='sm'>
											50%
										</SliderMark>
										<SliderMark value={75} mt='5' ml='-2.5' fontSize='sm'>
											75%
										</SliderMark>
										<SliderTrack bg='rgb(254 205 211)'>
											<SliderFilledTrack bg='rgb(244 63 94)' />
										</SliderTrack>
										<Tooltip
											hasArrow
											bg='rgb(190 18 60)'
											color='white'
											placement='top'
											isOpen={showTooltip}
											label={`${sliderValue}%`}
										>
											<SliderThumb bg='rgb(120 113 108)' />
										</Tooltip>
									</Slider>
								</>
								<Button
									onClick={() => {
										console.log("Confirm Raise")
									}}
									width='30%'
									m={2}
									bg={'orange.400'}
								>
									Confirm
								</Button>
							</div>
						</GridItem>

						{/* Top Right box */}
						<GridItem gridArea={{ base: '4/2/ span 1 / span 1', lg: '1/4/ span 1 / span 1' }} w='100%' textAlign='center'>
							<Button
								rightIcon={<RefreshIcon />}
								onClick={() => socket.emit('rematch')}
							>
								Rematch?
							</Button>
						</GridItem>

						{/* Bottom Right Box */}
						<GridItem>

						</GridItem>

					</Grid>
					{/* END - MAIN INFO GRID ABOVE THE GAME BOARD */}


					{/* START - GAME BOARD AREA */}
					<Flex flexWrap="wrap" alignItems="center" justifyContent="center"
					// width="45vw"
					// mb={4}
					>

						<Board
							blocks={grid}
							hands={hands}
							myHand={myHand}
							handleClick={handleClick}
							socket={socket}
							lastMove={lastMove}
							setLastMove={setLastMove}
							myMove={myMove}
							whosTurn={whosTurn}
							gameOver={gameOver}
							communityCardsTest={communityCardsTest}
							currentDeckTest={currentDeckTest}
							revealHands={revealHands}
							currentPot={currentPot}
							currentStake={currentStake}
							balance={balance}
						/>

					</Flex>

					{/* END - GAME BOARD AREA */}

				</>) : (
				<>
					{/* INFO SECTION SHOWING WHEN WAITING FOR OPPONENT TO JOIN A ROOM AFTER CREATION AND ON JOIN */}
					<Heading textAlign={'center'} wordBreak='break-word'>
						{gameInfo}
					</Heading>
					<Button border='2px'
						onClick={() => {
							setInLobby(true);
							setInGame(false);
							socket.emit("leave");
						}}
						m='2'
					>
						Back to Lobby
					</Button>
				</>
			)}
			<>
				<Modal isOpen={isOpen} onClose={onClose} isCentered>
					<ModalOverlay width='100%' height='100%' />
					<ModalContent top="-5%">
						<ModalHeader>Heads up Texas Hold'em</ModalHeader>
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