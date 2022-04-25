import React, { useState } from "react";
import { Container, Text, Stage, Sprite, useTick, useApp, Graphics } from "@inlet/react-pixi";
import { settings, SCALE_MODES } from "pixi.js";

// settings.SCALE_MODE = SCALE_MODES.NEAREST;

const Ring = () => {
	const [rotation, setRotation] = useState(0);
	const app = useApp();

	// global ticker, change to shared ticker later?
	useTick(() => {
		setRotation((rotation) => rotation + 0.2);
	});

	const stopTick = () => {
		app.ticker.stop();
	}

	const startTick = () => {
		app.ticker.start();
	}

	const toggleTick = () => {
		if (app.ticker.started) {
			stopTick();
		} else {
			startTick();
		}
	}
	return (
		<Graphics
			draw={
				(graphics) => {
					graphics.lineStyle(/*border width*/10,/*border color*/ 0xFFBD01, 1);
					graphics.drawCircle(200, 200, 50);
					graphics.endFill();
				}}
			rotation={rotation}
			interactive={true}
			click={
				(e) => {
					console.log("left clicked");
					console.log(e.target.rotation);
					toggleTick();
				}
			}
		/>
	);
}

const RotatingBunny = () => {
	const [rotation, setRotation] = useState(0);
	const app = useApp();

	// global ticker, change to shared ticker later?
	useTick(() => {
		setRotation((rotation) => rotation + 0.1);
	});

	const stopTick = () => {
		app.ticker.stop();
	}

	const startTick = () => {
		app.ticker.start();
	}

	const toggleTick = () => {
		if (app.ticker.started) {
			stopTick();
		} else {
			startTick();
		}
	}

	return (
		<Sprite
			image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
			anchor={0.5}
			scale={4}
			rotation={rotation}
			interactive={true}
			click={
				(e) => {
					console.log("left clicked");
					console.log(e.target.rotation);
					toggleTick();
				}
			}
		/>
	);
};

const Ring2 = () => {
	const radius = 200;
	const numberOfSectors = 20;
	const radiansPerSector = 2 * Math.PI / numberOfSectors;

	const randomColour = () => {
		return `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
	}

	return (
		<Graphics
			draw={
				(graphics) => {
					for (let sector = 1; sector <= numberOfSectors; sector++) {
						graphics.beginFill(randomColour());
						graphics.lineStyle(/*border width*/2,/*border color*/ 0xFFBD01, 1);
						// graphics.lineStyle(/*border width*/2,/*border color*/ 0xffffff, 1);
						const startingAngle = sector * radiansPerSector - radiansPerSector / 2;
						const endingAngle = startingAngle + radiansPerSector;
						graphics.moveTo(0, 0);
						graphics.arc(0, 0, radius, startingAngle, endingAngle);
						graphics.lineTo(0, 0);
						graphics.endFill();
					}
				}}
			cursor="wait"
			interactive={true}
		/>
	);
}

const SectorText = () => {
	const radius = 200;
	const numberOfSectors = 20;
	const radiansPerSector = 2 * Math.PI / numberOfSectors;
	const textAnchorPercentage = (radius - 40 / 2) / radius;

	let sectors = [];

	for (let sector = 1; sector <= numberOfSectors; sector++) {
		let text = sector.toString();
		const rotation = sector * radiansPerSector;

		sectors.push(
			<Container
				pivot={[200, 200]}
				position={[200, 200]}
			>
				<Text
					rotation={rotation + Math.PI}
					text={text}
					anchor={(0.5, 0.5)}
					x={200 + radius * textAnchorPercentage * Math.cos(rotation)}
					y={200 + radius * textAnchorPercentage * Math.sin(rotation)}
					style={{
						// fontFamily: "Arial",
						// fontSize: 2,
						fill: '#000000',
						// align: "center"
					}}
				/>
			</Container>
		);
	}
	return (sectors)
}

const PixiApp = () => {
	return (
		<Stage
			width={400}
			height={400}
			options={{
				antialias: true,
			}}
		>
			<Container
				position={[200, 200]}
				pivot={[0, 0]}
			>
				<Ring2 />
			</Container>
			{SectorText()}
		</Stage>
	);
};

export default PixiApp;
