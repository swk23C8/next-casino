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
import Board from "@/components/Playground/BoardScreen/Board";


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
			setWhosTurn(args[0])
			setCurrentPot(args[1])
		})
		socket.on('raise', (args) => {
			setWhosTurn(args[0])
			setCurrentPot(args[1])
			setCurrentTopStake(args[3])
		})
		socket.on('fold', (args) => {
			if (args[0] === myMove) {
				if (currentPot === 0) {
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
					updateToken(currentPot - currentStake)
				}
			}
			else {
				if (currentPot === 0) {
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
	}, [socket, myHand, communityCardsTest, currentDeckTest, currentTopStake]);

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
		setTimeout(() => {
			// send to server to start game
			socket.emit("deal", [longerDeck]);
		}, 1000)

	}

	function startGame() {
		setGameOver(false)
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
			{
				myMove ? (
					<>
						{/* START - GAME BOARD AREA */}
						<Flex flexWrap="wrap" alignItems="center" justifyContent="center"
						// width="45vw"
						// mb={4}
						>

							<Board
								blocks={grid}
								hands={hands}
								myHand={myHand}
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
							/>

						</Flex>

						{/* END - GAME BOARD AREA */}

					</>
				) : (
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
				)
			}
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