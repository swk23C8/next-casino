import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
const Game = React.lazy(() => import("@/components/Ultimate-Tic-Tac-Toe/Game/Game"));
import { Box, Button, Center, Flex, Spacer } from "@chakra-ui/react";
// import styles from "../../styles/Lobby.module.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SOCKET_SERVER_URL = 'https://swk23c8.herokuapp.com';
// const SOCKET_SERVER_URL = 'http://localhost:5000';

export default function Lobby({ stats = [], game = [] }) {
	const router = useRouter();
	const [socket, setSocket] = useState(null);
	const [rooms, setRooms] = useState(null);
	const [roomsBets, setRoomsBets] = useState(null);
	const [inLobby, setInLobby] = useState(true);
	const [activeUsers, setActiveUsers] = useState(0)
	const [myRoom, setMyRoom] = useState(null)
	const [pBet, setPBet] = useState(game.pBet);

	const [balance, setBalance] = useState(stats.gameTokens);

	const [roomBet, setRoomBet] = useState(game.pBet)
	const [roomPlayers, setRoomPlayers] = useState(null)
	const [roomPlayerUsername, setRoomPlayersUsername] = useState(null)

	const notifyError = () => toast.error('🦄 Wow so error! Invalid!', {
		position: "top-left",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});


	// api call to make bet
	const makeBet = (e) => {
		e.preventDefault();
		axios.patch('/api/gameAction/makeBet', {
			bet: e.target.bet.value * 1,
		})
			.then(res => {
				setPBet(res.data.bet);
			})
			.catch(err => {
				// console.log(err)
				notifyError();
			})
	}

	const updateBet = (e) => {
		if ((stats.id).startsWith('GUEST')) {
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
			axios.patch('/api/gameAction/makeBet', {
				bet: e * 1,
			})
				.then(res => {
					setPBet(res.data.bet);
				})
				.catch(err => {
					// console.log(err)
					notifyError();
				})
		}
	}

	function reset() {
		setMyRoom(null)
		setRoomBet(game.pBet)
		setRoomPlayers(null)
		setInLobby(true)
		// setRooms(null)
		// setRoomsBets(null)
		// socket.emit("reset")
	}

	useEffect(() => {
		setSocket(io.connect(SOCKET_SERVER_URL, {
			cors: { origin: '*' },
		}));
		console.log("Connecting to server...");

		return () => {
			if (socket) socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!socket) return;

		socket.on("connect", () => {
			console.log("Connected as socketID: ", socket.id);
		});

		socket.on("connect_error", () => {
			console.log("Unable to reach server. Online mode not avialable.");
			socket.disconnect();
			setSocket(null);
			alert("Disconnected from server. Redirecting to home page.");
			router.push("/");
		});
		socket.on("disconnect", () => {
			console.log("Disconnected from server");
			//   setSocket(null)
			//   alert("Disconnected from server. Redirecting to home page.")
			//   router.push('/')
		});

		socket.on("rooms", (args) => {
			if (inLobby) {
				setRooms(args[0]);
				setRoomsBets(args[1]);
			}

		});

		socket.on('users', args => {
			setActiveUsers(args)
		})

		socket.on("message", (args) => {
			console.log(args);
		});
		socket.on("myRoom", (args) => {
			setMyRoom(args)
		});
		socket.on("currentRoom", (args) => {
			setRoomPlayers(args.player)
			let playerusernames = args.player.map(player => player.username);
			setRoomPlayersUsername(playerusernames)
		});
		socket.on("reset", (args) => {
			console.log("reset called");
			reset()
		});
		socket.on("receiveBalance", (args) => {
			setBalance(args)
		});
		return () => socket.disconnect()
	}, [socket]);


	function joinRoom(room, roomsBets) {
		// if stats.gameTokens is less than roomBet then alert user to buy game tokens
		if (stats.gameTokens < roomsBets) {
			alert("You do not have enough game tokens to join this room. Please buy game tokens.")
			return;
		}
		setMyRoom(room);
		setRoomBet(roomsBets)
		socket.emit("join", [room, stats.id]);
		setInLobby(false);
	}

	return (
		<>
			<ToastContainer />
			<Flex
				// className={styles.menu}
				flexDir={{ base: 'column', md: 'row' }}
				justifyContent={{ base: "center", md: "space-between" }}
				alignItems='center'
				flexWrap="warp"
				padding={{ base: '0.5rem', md: "1.5rem" }}
			>
				<Box>Server Status:{socket ? " Connected" : " Not Connected"}</Box>
				<Box>
					Connected users: {socket ? (activeUsers) : ('Not Connected')}
					{/* <Button
						onClick={() => {
							socket.emit("report");
						}}
					>
						Debug
					</Button>
					<Button onClick={() => socket.connect()}>Connect</Button>
					<Button onClick={() => reset()}>Reset</Button> */}
				</Box>
			</Flex>

			{socket ? (
				<>
					<div>
						{"your socket id: " + socket.id}< br />
						{"your account id: " + stats.id}< br />
						{"your account balance: " + balance}< br />
					</div>
					{inLobby ? (
						<>
							< br />
							{"Current room name: " + "not in a room"}< br />
							{"Your game bet: " + pBet}< br />
							<form
								className=""
								id="makeBetForm"
								onSubmit={makeBet}>
								<label className="">
									Bet Amount:
									<input className="ml-5" type="number" name="bet" />
								</label>
							</form>
							<button
								disabled={stats.userType === "GUEST" ? true : false}
								form="makeBetForm"
								className="tracking-widest shadow-lg shadow-cyan-500/50 font-bold text-3xl w-1/5 my-3 bg-rose-600 text-white py-3 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-rose-600 focus:ring-opacity-50 hover:bg-rose-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-600">
								BET
							</button>
						</>
					) : (
						<div>
							< br />
							<p>{"Current room name: " + myRoom}</p>
							<p>{"Current room bet: " + pBet}</p>
							<p>{"Current room players: " + roomPlayerUsername}</p>
						</div>
					)}


					{rooms ? (
						<>
							<Flex
								flexWrap="warp"
								// padding="10px"
								justifyContent="center"
							>
								{inLobby && (
									<>
										<Button
											// className={styles.button}
											border="2px"
											onClick={() => {
												socket.emit("create", [pBet, stats.id]);
												setInLobby(false);
											}}
										>
											Create Room
										</Button>

										<Button
											// className={styles.button}
											border="2px"
											onClick={() => {
												socket.disconnect();
												router.push("/");
											}}
										>
											Disconnect
										</Button>
									</>
								)}
							</Flex>

							{(inLobby && roomsBets) ? (
								<Flex flexWrap="wrap" margin="2rem" justifyContent={{ base: 'space-evenly', md: 'center' }}>
									{
										rooms.map((room, index) => {
											return (
												<>
													<Box
														key={"rooms_" + index}
														as="button"
														border="2px"
														borderRadius="md"
														m={4}
														// boxSize="10rem"
														width="35%"
														onClick={
															() => {
																joinRoom(room, roomsBets[index])
																updateBet(roomsBets[index])
															}
														}
													>
														<p>
															{"NAME: " + room}<br />
														</p>
														<p>
															{"BET: " + roomsBets[index]}<br />
														</p>
													</Box>
												</>
											);
										})
									}
								</Flex>
							) : (
								<div
									// className={styles.main}
									className="flex flex-col items-center justify-center"
								>
									<Suspense fallback={<h1>Loading room...</h1>}>
										{!inLobby && <Game socket={socket} inLobby={setInLobby} roomPlayers={roomPlayers} bet={roomBet} />}
									</Suspense>
								</div>
							)}
						</>
					) : (
						<h1
							// className={styles.main}
							className="flex flex-col items-center justify-center"
						>
							Loading Rooms...</h1>
					)}
				</>
			) : (
				<>
					<h1
						// className={styles.main}
						className="flex flex-col items-center justify-center"
					>
						No server connection!
					</h1>
				</>
			)}
		</>
	);
}