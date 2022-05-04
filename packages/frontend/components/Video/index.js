import React, { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
// 	position: relative;
// 	display: inline-block;
// 	width: 240px;
// 	height: 270px;
// 	margin: 5px;
// `;

// const VideoContainer = styled.video`
// 	width: 240px;
// 	height: 240px;
// 	background-color: black;
// `;

// const UserLabel = styled.p`
// 	display: inline-block;
// 	position: absolute;
// 	top: 230px;
// 	left: 0px;
// `;


const Video = ({ email, stream, muted }) => {
	const ref = useRef(null);
	const [isMuted, setIsMuted] = useState(false);

	useEffect(() => {
		if (ref.current) ref.current.srcObject = stream;
		if (muted) setIsMuted(muted);
	}, [stream, muted]);

	return (
		<div>
			<video ref={ref} muted={isMuted} autoPlay />
			<p>{email}</p>
		</div>
	);
};

export default Video;