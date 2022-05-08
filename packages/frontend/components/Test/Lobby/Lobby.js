import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
const Game = React.lazy(() => import("@/components/Test/Play/Play"));
import { Box, Button, Center, Flex, Spacer } from "@chakra-ui/react";
// import styles from "../../styles/Lobby.module.css";
import axios from 'axios';

const SOCKET_SERVER_URL = 'https://swk23c8.herokuapp.com';
// const SOCKET_SERVER_URL = 'http://localhost:5000';

export default function Lobby({ stats = [], game = [] }) {
	const router = useRouter();
	const [socket, setSocket] = useState(null);
	const [rooms, setRooms] = useState(null);
	const [inLobby, setInLobby] = useState(true);
	const [activeUsers, setActiveUsers] = useState(0)
	const [myRoom, setMyRoom] = useState(null)

	const [pBet, setPBet] = useState(game.pBet);

	// api call to make bet
	const makeBet = (e) => {
		e.preventDefault();
		axios.patch('/api/gameAction/makeBet', {
			bet: e.target.bet.value * 1,
		})
			.then(res => {
				setPBet(res.data.bet);
				console.log("bet value :" + res.data.bet);
			})
			.catch(err => {
				// console.log(err)
				notifyError();
			})
	}

	useEffect(() => {
		setSocket(io.connect(SOCKET_SERVER_URL, {
			cors: { origin: '*' },
			// query: {
			// 	userId: stats.id
			// }
		}));
		console.log("Connecting to server...");

		// const socketTest = io({
		// 	query: { x: 42 }
		// });

		return () => {
			if (socket) socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			if (inLobby) setRooms(args);
		});

		socket.on('users', args => {
			setActiveUsers(args)
		})

		socket.on("message", (args) => {
			console.log(args);
		});
		socket.on("myRoom", (args) => {
			console.log(args)
			// setMyRoom(args.roomName)
			setMyRoom(args)
		});

		return () => socket.disconnect()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);

	function joinRoom(room) {
		console.log("Joining room:");
		console.log(room);
		// socket.emit("join", { roomName: room.roomName, roomBet: room.roomBet });
		socket.emit("join", room);
		setInLobby(false);
	}


	return (
		<>
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
					<Button
						onClick={() => {
							socket.emit("report");
						}}
					>
						Debug
					</Button>
					<Button onClick={() => socket.connect()}>Connect</Button>
				</Box>
			</Flex>

			{socket ? (
				<>
					{"your socket id: " + socket.id}< br />
					{"your account id: " + stats.id}< br />
					{"your account balance: " + stats.gameTokens}< br />
					{/* {"your room name: " + myRoom}< br /> */}
					{"your current bet: " + pBet}< br />
					{inLobby ? (
						<>
							{"your room name: " + "not in a room"}< br />
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
								className="tracking-widest shadow-lg shadow-cyan-500/50 font-bold text-3xl w-1/5 my-5 bg-rose-600 text-white py-3 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-rose-600 focus:ring-opacity-50 hover:bg-rose-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-600">
								BET
							</button>
						</>
					) : (
						<>
							< br />
							{"your room name: " + myRoom}< br />
							{"your room bet: " + pBet}< br />
						</>
					)}


					{rooms ? (
						<>
							<Flex flexWrap="warp" padding="10px" justifyContent="center">
								{inLobby && (
									<>
										<>hello</>
										<Button
											// className={styles.button}
											border="2px"
											onClick={() => {
												setInLobby(false);
												socket.emit("create", pBet);
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

							{inLobby ? (
								<Flex flexWrap="wrap" margin="2rem" justifyContent={{ base: 'space-evenly', md: 'center' }}>
									{/* {console.log(rooms)} */}
									{rooms.map((room) => {
										return (
											<>
												<Box
													as="button"
													border="2px"
													borderRadius="md"
													m={4}
													boxSize="10rem"
													onClick={() => joinRoom(room)}
												>
													{console.log(room)}
													{/* {"NAME: " + room.roomName}<br />
													{"BET: " + room.roomBet}<br /> */}
													{"NAME: " + room}<br />
												</Box>
											</>
										);
									})}
								</Flex>
							) : (
								<div
								// className={styles.main}
								>
									<Suspense fallback={<h1>Loading room...</h1>}>
										{!inLobby && <Game socket={socket} inLobby={setInLobby} />}
									</Suspense>
								</div>
							)}
						</>
					) : (
						<h1
						// className={styles.main}
						>
							Loading Rooms...</h1>
					)}
				</>
			) : (
				<>
					<h1
					// className={styles.main}
					>
						No server connection!
					</h1>
				</>
			)}
		</>
	);
}