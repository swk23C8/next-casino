import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import Video from '@/components/Test/Video/Video';


const pc_config = {
	iceServers: [
		// {
		//   urls: 'stun:[STUN_IP]:[PORT]',
		//   'credentials': '[YOR CREDENTIALS]',
		//   'username': '[USERNAME]'
		// },
		{
			urls: 'stun:stun.l.google.com:19302',
		},
	],
};
// const SOCKET_SERVER_URL = 'https://swk23c8.herokuapp.com';
const SOCKET_SERVER_URL = 'http://localhost:5000';


const Play = ({ stats = [], game = [] }) => {
	const socketRef = useRef();
	const pcsRef = useRef({});
	const localVideoRef = useRef(null);
	const localStreamRef = useRef();
	const [users, setUsers] = useState([]);

	const getLocalStream = useCallback(async () => {
		try {
			const localStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: {
					width: 240,
					height: 240,
				},
			});
			localStreamRef.current = localStream;
			if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
			if (!socketRef.current) return;
			socketRef.current.emit('join_room', {
				room: '1234',
				email: 'Email@domain.com',
			});
		} catch (e) {
			console.log(`getUserMedia error: ${e}`);
		}
	}, []);

	const createPeerConnection = useCallback((socketID, email) => {
		try {
			const pc = new RTCPeerConnection(pc_config);

			pc.onicecandidate = (e) => {
				if (!(socketRef.current && e.candidate)) return;
				console.log('onicecandidate');
				socketRef.current.emit('candidate', {
					candidate: e.candidate,
					candidateSendID: socketRef.current.id,
					candidateReceiveID: socketID,
				});
			};

			pc.oniceconnectionstatechange = (e) => {
				console.log(e);
			};

			pc.ontrack = (e) => {
				console.log('ontrack success');
				setUsers((oldUsers) =>
					oldUsers
						.filter((user) => user.id !== socketID)
						.concat({
							id: socketID,
							email,
							stream: e.streams[0],
						}),
				);
			};

			if (localStreamRef.current) {
				console.log('localstream add');
				localStreamRef.current.getTracks().forEach((track) => {
					if (!localStreamRef.current) return;
					pc.addTrack(track, localStreamRef.current);
				});
			} else {
				console.log('no local stream');
			}

			return pc;
		} catch (e) {
			console.error(e);
			return undefined;
		}
	}, []);

	useEffect(() => {
		socketRef.current = io.connect(SOCKET_SERVER_URL);
		getLocalStream();

		socketRef.current.on('all_users', (allUsers) => {
			allUsers.forEach(async (user) => {
				if (!localStreamRef.current) return;
				const pc = createPeerConnection(user.id, user.email);
				if (!(pc && socketRef.current)) return;
				pcsRef.current = { ...pcsRef.current, [user.id]: pc };
				try {
					const localSdp = await pc.createOffer({
						offerToReceiveAudio: true,
						offerToReceiveVideo: true,
					});
					console.log('create offer success');
					await pc.setLocalDescription(new RTCSessionDescription(localSdp));
					socketRef.current.emit('offer', {
						sdp: localSdp,
						offerSendID: socketRef.current.id,
						offerSendEmail: 'offerSendEmail@Domain.com',
						offerReceiveID: user.id,
					});
				} catch (e) {
					console.error(e);
				}
			});
		});

		socketRef.current.on(
			'getOffer',
			async (data
			) => {
				const { sdp, offerSendID, offerSendEmail } = data;
				console.log('get offer');
				if (!localStreamRef.current) return;
				const pc = createPeerConnection(offerSendID, offerSendEmail);
				if (!(pc && socketRef.current)) return;
				pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
				try {
					await pc.setRemoteDescription(new RTCSessionDescription(sdp));
					console.log('answer set remote description success');
					const localSdp = await pc.createAnswer({
						offerToReceiveVideo: true,
						offerToReceiveAudio: true,
					});
					await pc.setLocalDescription(new RTCSessionDescription(localSdp));
					socketRef.current.emit('answer', {
						sdp: localSdp,
						answerSendID: socketRef.current.id,
						answerReceiveID: offerSendID,
					});
				} catch (e) {
					console.error(e);
				}
			},
		);

		socketRef.current.on(
			'getAnswer',
			(data) => {
				const { sdp, answerSendID } = data;
				console.log('get answer');
				const pc = pcsRef.current[answerSendID];
				if (!pc) return;
				pc.setRemoteDescription(new RTCSessionDescription(sdp));
			},
		);

		socketRef.current.on(
			'getCandidate',
			async (data) => {
				console.log('get candidate');
				const pc = pcsRef.current[data.candidateSendID];
				if (!pc) return;
				await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
				console.log('candidate add success');
			},
		);

		socketRef.current.on('user_exit', (data) => {
			if (!pcsRef.current[data.id]) return;
			pcsRef.current[data.id].close();
			delete pcsRef.current[data.id];
			setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
		});

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
			users.forEach((user) => {
				if (!pcsRef.current[user.id]) return;
				pcsRef.current[user.id].close();
				delete pcsRef.current[user.id];
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createPeerConnection, getLocalStream]);

	return (
		<>
			<p>1-N P2P connection (currently broken due to the changes to the server for now)</p>
			<div>
				<video
					style={{
						width: 240,
						height: 240,
						margin: 5,
						backgroundColor: 'black',
					}}
					muted
					ref={localVideoRef}
					autoPlay
				/>
				{users.map((user, index) => (
					<Video key={index} email={user.email} stream={user.stream} />
				))}
			</div>
		</>
	);
};


export default Play;