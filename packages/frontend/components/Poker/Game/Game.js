import Shrek from 'public/images/feltCute.png';
import Image from 'next/image'
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
import Board from "@/components/Poker/BoardScreen/Board";


const Game = ({ socket = null, setInLobby = null, roomPlayers = null, bet = null,
	room = null,
	// room,
	setInGame = null, balance = null }) => {
	const matchStart = Array(9).fill().map((_, index) =>
		Array(10).fill("")
	)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [grid, setGrid] = useState(matchStart)
	const [clickedBlock, setClickedBlock] = useState("NULL")
	const [clickedSquare, setClickedSquare] = useState("NULL")
	const [whosTurn, setWhosTurn] = useState('')
	const [gameOver, setGameOver] = useState(false)
	const [gameInfo, setGameInfo] = useState('Waiting for another player to connect..')
	const [myMove, setMyMove] = useState('')
	const opponent = useRef(null)
	const me = useRef(null)
	const winner = useRef();
	const [lastMove, setLastMove] = useState(-1)
	const [myHand, setMyHand] = useState()
	const [dealtCards, setDealtCards] = useState(false)

	const newDeck = useRef(null)
	const [currentDeckTest, setCurrentDeckTest] = useState(null)
	const [hands, setHands] = useState(['1B', '1B'])
	const [communityCardsTest, setCommunityCardsTest] = useState(['1B', '1B', '1B', '1B', '1B'])
	const [revealHands, setRevealHands] = useState(false)

	const [sliderValue, setSliderValue] = useState(5)
	const [showTooltip, setShowTooltip] = useState(false)
	const [roomSB, setRoomSB] = useState(bet + bet / 2)
	const [roomBB, setRoomBB] = useState(bet)
	const [currentPot, setCurrentPot] = useState(bet + bet / 2)
	const [currentTopStake, setCurrentTopStake] = useState(bet)
	const [currentStake, setCurrentStake] = useState(0)
	const [gameMessage, setGameMessage] = useState()
	const [checkOrCall, setCheckOrCall] = useState()
	const [slider, setSlider] = useState(false)
	const [finalSliderValue, setFinalSliderValue] = useState(0)
	const [solvedHands, setSolvedHands]	= useState(null)

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
		else if (currentPot === 0) {
			toast('🦄 Wow! Free Game!', {
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
					console.log(err)
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
			setGameInfo(`Both players in room. Game will start shortly..`)
		})
		socket.on('myMove', args => {
			setGameInfo(`You will be playing as "${args}"`)
			onOpen()
			setMyMove(args)
			// if args is Big Blind set currentStake to bet and if args is Small Blind set currentStake to bet / 2
			if (args === 'BB') {
				setCurrentStake(bet)
			}
			else if (args === 'SB') {
				setCurrentStake(bet / 2)
			}
			startGame()

		})

		socket.once('eBrake', (args) => {
			setInLobby(true)
			setInGame(false)
			// alert('The other player disconnected. Returning to Lobby....')
		})
	}, [])

	useEffect(() => {
		if (!socket) return;
		if (hands === ['1B', '1B']) {
			setGameMessage(
				<Text color='green.500'>
					Dealer is Shuffling the Deck
				</Text>
			)
		}
		else if (gameOver) {
			setGameMessage(
				<Text color='Crimson' fontSize='lg'>
					Game Over! Press Leave or Rematch
				</Text>
			)
		}
		else if (whosTurn === myMove) {
			setGameMessage(
				<Text color='green.500'>
					It's your turn!
				</Text>
			)
		}
		else {
			setGameMessage(
				<Text color='red.500'>
					{"Waiting for " + whosTurn + " to play..."}
				</Text>
			)
		}

		if (currentStake === currentTopStake) {
			setCheckOrCall('Check')
		}
		else if (currentStake < currentTopStake) {
			setCheckOrCall('Call')
		}


		// receive my hand
		socket.on('hands', (args) => {
			setHands(args)
			socket.off('hands')
		})
		socket.on('currentDeck', (args) => {
			setCurrentDeckTest(args)

			socket.off('currentDeck')
		})
		socket.on('communityCards', (args) => {
			setCommunityCardsTest(args)
			socket.off('communityCards')
		})
		socket.on('solveHands', (args) => {
			console.log(args)
			setSolvedHands(args)
			let winner = roomPlayers.filter(object => {
				return object.socketID === args[1];
			})
			// setGameInfo(`${args[1] === 'win' ? '🦄 Wow so easy! You win!': '🦄 Wow so hard! You lose!'}`)
			// setGameInfo(`"${args[1]}" won the game`)

			// setGameInfo(`${winner[0].username} won with ✨${args[0].descr}✨`)
			// setGameInfo(winner[0].username + " won the game with " + "✨" + args[0].descr + "✨")

			if (args[1] === socket.id) {
				setGameMessage(
					<Text color='green.500'>
						You won with ✨{args[0].descr}✨
					</Text>
				)
				setGameInfo(`You won with ✨${args[0].descr}✨`)
				updateToken(currentPot - currentStake)
			}
			else {
				setGameMessage(
					<Text color='red.500'>
						{winner[0].username} won with ✨{args[0].descr}✨
					</Text>
				)
				setGameInfo(`${winner[0].username} won with ✨${args[0].descr}✨`)
				updateToken(-currentStake)
			}
			onOpen()

			setRevealHands(true)
			setGameOver(true)
			socket.off('solveHands')
		})
		socket.on('call', (args) => {
			// console.log(args)
			// console.log(myMove)
			if (args[0] !== myMove) {
				toast('✔️👌 Call/Check Sent!', {
					position: "top-left",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			else {
				toast('✔️👌 Call/Check Received!', {
					position: "top-left",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}

			setWhosTurn(args[0])
			setCurrentPot(args[1])
		})
		socket.on('raise', (args) => {
			if (args[0] !== myMove) {
				toast('📈☝️ Raise Sent!', {
					position: "top-left",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			else {
				toast('📈☝️ Raise Received!', {
					position: "top-left",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			setWhosTurn(args[0])
			setCurrentPot(args[1])
			setCurrentTopStake(args[3])
		})
		socket.on('fold', (args) => {
			if (args[0] === myMove) {
				if (currentPot === 0) {
					toast('🏆 Your Opponent Folded!', {
						position: "top-left",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
				else {
					toast('🏆 Your Opponent Folded!', {
						position: "top-left",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					updateToken(currentPot - currentStake)
				}
			}
			else {
				if (currentPot === 0) {
					toast('😭 You Folded!', {
						position: "top-left",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
				else {
					toast('😭 You Folded!', {
						position: "top-left",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					updateToken(-currentStake)
				}
			}

			if (myMove === 'BB') {
				setMyMove('SB')
				setCurrentStake(bet / 2)

			}
			else if (myMove === 'SB') {
				setMyMove('BB')
				setCurrentStake(bet)
			}
			setGameOver(true)
			setRevealHands(true)
		})
		socket.on('resetDeck', (args) => {
			setCurrentDeckTest(args)
			newDeck.current = args
			// setCommunityCardsTest(['1B', '1B', '1B', '1B', '1B'])
			// setHands(['1B', '1B'])
			socket.off('resetDeck')
		})
		return () => {
			if (socket) socket.off('hands')
			if (socket) socket.off('currentDeck')
			if (socket) socket.off('communityCards')
			if (socket) socket.off('solveHands')
			if (socket) socket.off('call')
			if (socket) socket.off('raise')
			if (socket) socket.off('fold')
			if (socket) socket.off('resetDeck')
		}
	}, [socket, myHand, communityCardsTest, currentDeckTest, currentTopStake, gameOver]);

	// run useEffect once after 2 seconds currentDeckTest is received
	useEffect(() => {
		if (!socket) return;
		// if (currentDeckTest && !deckLoaded.current) {
		// 	asyncFn2()
		// }
		if (currentDeckTest) {
			if (currentDeckTest.length === 52) {
				asyncFn2()
			}
		}
	}, [currentDeckTest])

	const asyncFn2 = async () => {
		// Your logic here
		let longerDeck
		if (newDeck.current) {
			if (newDeck.current.length < currentDeckTest.length) {
				longerDeck = currentDeckTest
			}
			else {
				longerDeck = newDeck.current
			}
		}
		else {
			longerDeck = currentDeckTest
		}
		setGameOver(false)
		setRevealHands(false)
		setSolvedHands(null)
		setTimeout(() => {
			// send to server to start game
			socket.emit("deal", [longerDeck]);
		}, 1000)

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
		setSolvedHands(null)
		// setGrid(matchStart)
		setWhosTurn('SB')
		setCurrentDeckTest(room.deck)
		setInGame(true)
	}



	const bg = useColorModeValue('red.100', 'orange.200')

	// inside 1 Board > 9 Blocks in each Board > 9 Squares in each Block
	return (
		<>
			<ToastContainer />
			{myMove ? (
				<>
					{/* START - MAIN INFO GRID ABOVE THE GAME BOARD */}
					<Grid templateRows={{ base: 'repeat (5, 1fr)', lg: 'repeat(2, 0fr)' }}
						templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
						gap={1.5}
						mt='0.7vh'
						alignItems='center'
						// maxWidth={'50%'}
						width={{ base: '97vw', md: '50%', lg: '50%', xl: '33%' }}
					>
						{/* Top Left box */}
						<GridItem gridArea={{ base: '5/1/ span 1 / span 1', lg: '1/1/ span 1 / span 1' }} w='100%' textAlign='center'>
							<Button
								onClick={() => {
									setInLobby(true);
									setInGame(false);
									socket.emit("leavePoker");
								}}
								bg={'red.300'}
								disabled={!gameOver}
								mb='1.5vh'
								height='3.5vh'
							// size={{ base: '20vh', sm: '20vh', md: '20vh', lg: '20vh', xl: '20vh' }}
							// size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'lg' }}
							>
								Leave Game
							</Button>

						</GridItem>

						{/* Bottom Left box */}
						<GridItem></GridItem>

						{/* Top Middle Box (2 wide) */}
						<GridItem gridArea={{ base: '1/1/ span 1 / span 3', lg: '1/2/ span 1 / span 2' }} w='100%'>
							<Heading bg={bg} p='1.5' px='1.5vw' borderRadius='10px' textAlign='center'
								noOfLines={3} fontSize={{ base: '5vw', md: '2.1vw', lg: '1.5vh', xl: '2vh' }}>
								You <br />🆚<br /> {opponent.current.username}
							</Heading>
							<Heading pt='1' size='md' textAlign='center'>
								<Text color='green.500'>
									{gameMessage}
								</Text>
								{/* {whosTurn === myMove ?
									(
										<>
											<Text color='green.500'>
												It's your turn!
											</Text>
										</>
									) :
									(
										<>
											<Text color='red.500'>
												It's not your turn yet!
											</Text>
										</>
									)
								} */}
							</Heading>
						</GridItem>

						{/* Borrom Middle Box (2 wide) */}
						<GridItem gridArea={{ base: '2/1/ span 1 / span 3', lg: '2/1/ span 1 / span 4' }} w='100%' textAlign='center'>
							<div className="flex items-center content-center justify-center text-center">
								<div className="relative mr-[1vw]
											h-[10vh] w-[10vh]
											2xl:h-[10vh] 2xl:w-[10vh]
											xl:h-[10vh] xl:w-[10vh]
											lg:h-[10vh] lg:w-[10vh]
											md:h-[10vh] md:w-[10vh]
											sm:h-[10vh] sm:w-[10vh]">
									<Image
										src={Shrek}
										layout="fill"
										// width='90vw'
										// height='135vw'
										alt={"Shrek"}
									/>
								</div>
								<div className="relative mr-[0vw]
											h-[10vh] w-[10vh]
											2xl:h-[10vh] 2xl:w-[10vh]
											xl:h-[10vh] xl:w-[10vh]
											lg:h-[10vh] lg:w-[10vh]
											md:h-[10vh] md:w-[10vh]
											sm:h-[10vh] sm:w-[10vh]">
									<Image
										src={Shrek}
										layout="fill"
										// width='90vw'
										// height='135vw'
										alt={"Shrek"}
									/>
								</div>
							</div>
							{/* <Image src={Shrek} alt="Shrek" height={110} width={110} />
							<Image src={Shrek} alt="Shrek" height={110} width={110} /> */}
							{/* <Button
								onClick={() => {
									socket.emit("deal", [currentDeckTest]);
								}}
								width='25%'
								m={1}
								bg={'orange.200'}
							>
								Deal Cards
							</Button> */}
							{/* <Button
								onClick={() => {
									socket.emit("communityCards", [currentDeckTest, communityCardsTest]);
								}}
								width='35%'
								m={1}
								bg={'orange.200'}
							>
								Community Card
							</Button> */}
							{/* <Button
								onClick={() => {
									socket.emit("testPoker", [currentDeckTest, communityCardsTest, hands]);
								}}
								width='25%'
								m={1}
								bg={'orange.200'}
							>
								Showdown
							</Button> */}
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
						<GridItem gridArea={{ base: '3/1/ span 1 / span 3', lg: '3/1/ span 1 / span 4' }} w='100%' textAlign='center'>

							<Button
								onClick={() => {
									socket.emit('call', [socket.id, whosTurn, currentStake, currentTopStake, currentPot, communityCardsTest, currentDeckTest, myMove, hands]);
									setCurrentStake(currentTopStake);
								}}
								width='25%'
								height='3.5vh'
								m={1}
								bg={'orange.400'}
								disabled={(!(whosTurn === myMove) || gameOver)}

							>
								{checkOrCall}
							</Button>

							{/* <Button
								onClick={() => {
									setSlider(!slider);
								}}
								width='25%'
								height='30px'
								m={1}
								bg={'orange.300'}
								disabled={!(whosTurn === myMove)}
							>
								Raise
							</Button> */}


							<Button
								onClick={() => {
									socket.emit('fold', [socket.id, whosTurn, currentStake, currentTopStake, currentPot, roomBB, roomSB]);
								}}
								width='25%'
								height='3.5vh'
								m={1}
								bg={'orange.400'}
								disabled={(!(whosTurn === myMove) || gameOver)}
							>
								Fold
							</Button>
							<div className="flex mt-[1vh] mb-[1vh]">
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
										step={1}
										mb={2}
										ml={1}
										mr={2}
										disabled=
										{
											!(whosTurn === myMove) || (slider === true) || gameOver
										}
										onChangeEnd={
											(val) => {
												// Math.round(((val * currentPot * 0.01) + Number.EPSILON) * 100) / 100
												// setFinalSliderValue(Math.round(((val * currentPot * 0.01) + Number.EPSILON) * 100) / 100)
												setFinalSliderValue(val * currentPot * 0.01)
											}
										}
									>
										<SliderMark value={25} mt='4' ml='-2.5' fontSize='sm'>
											25%
										</SliderMark>
										<SliderMark value={50} mt='4' ml='-2.5' fontSize='sm'>
											50%
										</SliderMark>
										<SliderMark value={75} mt='4' ml='-2.5' fontSize='sm'>
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
											label={"$" + parseFloat((sliderValue * currentPot * 0.01).toFixed(2))}
										// label={`$${sliderValue*currentPot*0.01}`}
										>
											<SliderThumb bg='rgb(120 113 108)' />
										</Tooltip>
									</Slider>
								</>
								<Button
									onClick={() => {
										socket.emit('raise', [socket.id, whosTurn, currentStake, currentTopStake, currentPot, finalSliderValue]);
										setCurrentStake(Math.round(((currentStake + finalSliderValue) + Number.EPSILON) * 100) / 100)

										// setCurrentStake(currentStake + finalSliderValue);
									}}
									width='19%'
									height='35px'
									m={1}
									bg={'orange.400'}
									disabled=
									{
										!(whosTurn === myMove) || (slider === true) || gameOver
									}
								>
									Raise
								</Button>
							</div>
						</GridItem>

						{/* Top Right box */}
						<GridItem gridArea={{ base: '5/3/ span 1 / span 1', lg: '1/4/ span 1 / span 1' }} w='100%' textAlign='center'>
							<Button
								// rightIcon={<RefreshIcon />}
								onClick={
									() => {
										socket.emit('rematch')
										setWhosTurn('SB')
										setCurrentPot(bet + bet / 2)
										setCurrentTopStake(bet)
										setRevealHands(false)
										setGameOver(false)
										setSolvedHands(null)
										socket.emit('resetDeck')
										asyncFn2()
									}
								}
								disabled={!gameOver}
								bg={'red.300'}
								mb='1.5vh'
								px={7}
								height='3.5vh'
							// size={{ base: '20vh', sm: '20vh', md: '20vh', lg: '20vh', xl: '20vh' }}
							// size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'lg' }}
							>
								Rematch
							</Button>
						</GridItem>

						{/* Bottom Right Box */}
						<GridItem>

						</GridItem>

						{/* <GridItem gridArea={{ base: '4/1/ span 1 / span 1', lg: '2/1/ span 2 / span 1' }} w='100%' textAlign='center'>
							<Image src={Shrek} alt="Shrek" height={100} width={100} />
						</GridItem>
						<GridItem gridArea={{ base: '4/2/ span 1 / span 1', lg: '2/4/ span 2 / span 1' }} w='100%' textAlign='center'>
							<Image src={Shrek} alt="Shrek" height={100} width={100} />
						</GridItem> */}
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
							currentTopStake={currentTopStake}
							solvedHands={solvedHands}
						/>

					</Flex>

					{/* END - GAME BOARD AREA */}

				</>) : (
				<>
					{/* INFO SECTION SHOWING WHEN WAITING FOR OPPONENT TO JOIN A ROOM AFTER CREATION AND ON JOIN */}
					<Heading textAlign={'center'} wordBreak='break-word'>
						{/* <pre>{gameInfo}</pre> */}
						{gameInfo}
					</Heading>
					<Button border='2px'
						onClick={() => {
							setInLobby(true);
							setInGame(false);
							socket.emit("leavePoker");
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