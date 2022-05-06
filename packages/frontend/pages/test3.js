import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
const Game = React.lazy(() => import("@/components/Test/Play/Play"));
import { Box, Button, Center, Flex, Spacer } from "@chakra-ui/react";
// import styles from "../../styles/Lobby.module.css";

const SOCKET_SERVER_URL = 'https://swk23c8.herokuapp.com';
// const SOCKET_SERVER_URL = 'http://localhost:5000';

export default function Online() {
	const router = useRouter();
	const [socket, setSocket] = useState(null);
	const [rooms, setRooms] = useState(null);
	const [inLobby, setInLobby] = useState(true);
	const [activeUsers, setActiveUsers] = useState(0)

	useEffect(() => {
		setSocket(io.connect(SOCKET_SERVER_URL));
		console.log("Connecting to server...");

		return () => {
			if (socket) socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!socket) return;

		socket.on("connect", () => {
			console.log("Connected as userID: ", socket.id);
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

		return () => socket.disconnect()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);

	function joinRoom(room) {
		socket.emit("join", { room: room });
		setInLobby(false);
	}


	return (
		<div>
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
          </Button> */}
					{/* <Button onClick={() => socket.connect()}>Connect</Button> */}
				</Box>
			</Flex>

			{socket ? (
				<>
					{rooms ? (
						<>
							<Flex flexWrap="warp" padding="10px" justifyContent="center">
								{inLobby && (
									<>
										<Button
											// className={styles.button}
											border="2px"
											onClick={() => {
												setInLobby(false);
												socket.emit("create");
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
													{room}
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
										{!inLobby && <Game gameMode={"online"} socket={socket} inLobby={setInLobby} />}
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
		</div>
	);
}