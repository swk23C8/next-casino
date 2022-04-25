import React, { useState } from "react";
import { Container, Text, Stage, Sprite, useTick, useApp, Graphics } from "@inlet/react-pixi";
import { settings, SCALE_MODES } from "pixi.js";

settings.SCALE_MODE = SCALE_MODES.NEAREST;

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
						// console.log(sector)
						// sectorText(sector);
					}
				}}
		/>
	);
}

const SectorText1 = () => {
	// for (let sector = 1; sector <= 20; sector++) {
	// }
	let text = "1";
	const radius = 200;
	const numberOfSectors = 20;
	const radiansPerSector = 2 * Math.PI / numberOfSectors;
	const rotation = 1 * radiansPerSector;
	const textAnchorPercentage = (radius - 40 / 2) / radius;


	return (
		<Text
			text={text}
			// anchor={0.5}
			x={10 + radius * textAnchorPercentage * Math.cos(rotation)}
			y={10 + radius * textAnchorPercentage * Math.sin(rotation)}
			isSprite={true}
			style={{
				// fontSize: 100,
				fill: 0x9900FF,
				// align: "center",
				// fontFamily: "Arial",
				// fontWeight: "bold",
			}}
		/>
	)
}

const PixiApp = () => {
	return (
		<Stage width={500} height={500}>
			<Container position={[250, 250]}>
				{/* <RotatingBunny /> */}
				{/* <Ring /> */}
				<Ring2 />

				{/* <Text
					text="Hello World"
					anchor={0.5}
					x={100}
					y={50}
					isSprite={true}
					style={{
						fontSize: 50,
						fill: 0x000000,
						align: "center",
						fontFamily: "Arial",
						fontWeight: "bold",
					}}
				/> */}
			</Container>
			<Container
				position={[250, 250]}
				rotation={0.5}
			>
				<SectorText1 />
			</Container>
		</Stage>
	);
};

export default PixiApp;
