import React, { useState, useRef } from "react";
import { Container, Text, Stage, Sprite, useTick, useApp, Graphics } from "@inlet/react-pixi";
import { settings, SCALE_MODES } from "pixi.js";

settings.SCALE_MODE = SCALE_MODES.LINEAR;

const Ring0 = () => {
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

const ReelContainer = (param) => {
	const radius = param.radius;
	const numberOfSectors = param.numberOfSectors;

	const radiansPerSector = 2 * Math.PI / numberOfSectors;
	const textAnchorPercentage = (radius - 40 / 2) / radius;

	const randomColour = () => {
		return `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
	}
	// const color = randomColour();
	const color = "0x526e79";

	const drawReel = React.useCallback((graphics) => {
		for (let sector = 1; sector <= numberOfSectors; sector++) {
			graphics.beginFill(color);
			graphics.lineStyle(/*border width*/2,/*border color*/ 0xFFBD01, 1);
			// graphics.lineStyle(/*border width*/2,/*border color*/ 0xffffff, 1);
			const startingAngle = sector * radiansPerSector - radiansPerSector / 2;
			const endingAngle = startingAngle + radiansPerSector;
			graphics.moveTo(0, 0);
			graphics.arc(0, 0, radius, startingAngle, endingAngle);
			graphics.lineTo(0, 0);
			graphics.endFill();
		}
	}, [color, numberOfSectors, radiansPerSector, radius]);


	const drawReelText = React.useCallback(() => {
		const reelText = [];
		for (let sector = 1; sector <= numberOfSectors; sector++) {
			const text = sector.toString();
			const rotation = sector * radiansPerSector + (param.rotation / param.rotateSpeed);
			console.log("rotation: " + rotation)
			reelText.push(
				<Text
					key={param.id + "_reelText_" + sector}
					text={text}
					anchor={(0.5, 0.5)}
					// anchor={(0, 0)}
					position={
						[0 + (radius - 10) * textAnchorPercentage * Math.cos(rotation),
						0 + (radius - 10) * textAnchorPercentage * Math.sin(rotation)]
					}
					rotation={rotation + Math.PI}
					pivot={[0, 0]}
					style={{
						fontSize: 20,
						fill: 0xffffff,
						fontFamily: "Arial",
						align: "center",
						dropShadow: true,
						dropShadowColor: 0x000000,
						dropShadowBlur: 4,
						dropShadowAngle: Math.PI / 6,
						dropShadowDistance: 6,
					}}
				/>
			);
		}
		return reelText;
	}, [numberOfSectors, param.id, param.rotateSpeed, param.rotation, radiansPerSector, radius, textAnchorPercentage]);

	return (
		<>
			<Graphics
				id={param.id + "_graphics"}
				draw={drawReel}
				cursor="not-allowed"
				interactive={true}
				// angle={param.rotation}
				click={
					(e) => {
						console.log("left clicked reel " + param.id);
						console.log(e.target);
						// param.setReels(e);
						// console.log(param.reels)
						// e.target.rotation = e.target.rotation + Math.PI;
					}
				}
			/>

			{drawReelText()}

		</>
	);
}


const ReelButton = (reelContainers) => {
	let angleStep = 60;
	let rotateSpeed = Math.floor(Math.random() * 100) + 1;
	// reel.rotation += rotateSpeed;
	// if (reel.rotation >= 360) {
	// 	reel.rotation = 0;
	// }

	// rotate Reel by rotationSpeed and angle
	const rotateReel = (reel, rotationSpeed, angle) => {
		reel.rotation += rotationSpeed;
		if (reel.rotation >= angle) {
			reel.rotation = 0;
		}
	}

	return (
		<Container
			pivot={[0, 0]}
			position={[0, 0]}
		>
			<Graphics
				draw={(ctx) => {
					ctx.beginFill(0xffffff);
					ctx.drawCircle(0, 0, 150);
					ctx.endFill();
				}}
				cursor="grab"
			// interactive={true}
			// click={
			// 	(e) => {
			// 		console.log("left clicked button");
			// 		console.log(e);
			// 	}}
			/>
		</Container>
	)
}

const PixiApp = () => {
	const [rotation, setRotation] = useState(0);
	const [rotateSpeed, setRotateSpeed] = useState(Math.floor(Math.random() * 100) + 1);
	let angleStep = 60;
	// let rotateSpeed = Math.floor(Math.random() * 100) + 1;

	const spin = () => {
		// setRotation(rotation => rotation + 2*Math.PI);

		if (rotation >= 2 * Math.PI) {
			setRotation(0);
		}
		else {
			setRotation(rotation => rotation + angleStep);
			angleStep = angleStep - angleStep / rotateSpeed
			if ((angleStep.toFixed(1) <= 0.02)) {
				console.log("stop rotate");

			}
			else {
				requestAnimationFrame(spin);
			}
		}


	}


	return (
		<Stage
			width={800}
			height={900}
			options={{
				antialias: true,
				roundPixel: true,
			}}>
			<Container
				position={[400, 400]}
				pivot={[0, 0]}
			>
				<ReelContainer
					id={5}
					radius={400}
					numberOfSectors={13}
					rotation={rotation}
					rotateSpeed={rotateSpeed}
				/>
				<ReelContainer
					id={4}
					radius={350}
					numberOfSectors={13}
					rotation={rotation}
					rotateSpeed={rotateSpeed}
				/>
				<ReelContainer
					id={3}
					radius={300}
					numberOfSectors={13}
					rotation={rotation}
					rotateSpeed={rotateSpeed}
				/>
				<ReelContainer
					id={2}
					radius={250}
					numberOfSectors={13}
					rotation={rotation}
					rotateSpeed={rotateSpeed}
				/>
				<ReelContainer
					id={1}
					radius={200}
					numberOfSectors={13}
					rotation={rotation}
					rotateSpeed={rotateSpeed}
				/>
				{/* {ReelButton()} */}
				<Container
					pointerdown={(e) => {
						console.log("left clicked button container");
						console.log(e);
						spin();
					}}
					interactive={!onclick}
				>
					<ReelButton />
				</Container>
			</Container>
		</Stage>
	);
};

export default PixiApp;
