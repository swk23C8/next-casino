import React, { useState } from "react";
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

const Ring1 = () => {
	const radius = 200;
	const numberOfSectors = 13;
	const radiansPerSector = 2 * Math.PI / numberOfSectors;

	const textAnchorPercentage = (radius - 40 / 2) / radius;

	const randomColour = () => {
		return `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
	}
	const color = randomColour();

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
	}, [color, numberOfSectors, radiansPerSector]);


	const drawReelText = React.useCallback(() => {
		const reelText = [];
		for (let sector = 1; sector <= numberOfSectors; sector++) {
			const text = sector.toString();
			const rotation = sector * radiansPerSector
			reelText.push(
				<Text
					key={"reel1_" + sector}
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
	}, [radiansPerSector, textAnchorPercentage]);

	return (
		<>
			<Graphics
				draw={drawReel}
				cursor="not-allowed"
				interactive={true}
			/>
			{drawReelText()}
		</>
	);
}


const Ring2 = () => {
	const radius = 250;
	const numberOfSectors = 13;
	const radiansPerSector = 2 * Math.PI / numberOfSectors;

	const textAnchorPercentage = (radius - 40 / 2) / radius;

	const randomColour = () => {
		return `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
	}
	const color = randomColour();

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
	}, [color, numberOfSectors, radiansPerSector]);


	const drawReelText = React.useCallback(() => {
		const reelText = [];
		for (let sector = 1; sector <= numberOfSectors; sector++) {
			const text = sector.toString();
			const rotation = sector * radiansPerSector

			reelText.push(
				<Text
					key={"reel2_" + sector}
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
	}, [radiansPerSector, textAnchorPercentage]);

	return (
		<>
			<Graphics
				draw={drawReel}
				cursor="not-allowed"
				interactive={true}
			/>
			{drawReelText()}
		</>
	);
}
const Ring3 = () => {
	const radius = 300;
	const numberOfSectors = 13;
	const radiansPerSector = 2 * Math.PI / numberOfSectors;

	const textAnchorPercentage = (radius - 40 / 2) / radius;

	const randomColour = () => {
		return `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
	}
	const color = randomColour();

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
	}, [color, numberOfSectors, radiansPerSector]);


	const drawReelText = React.useCallback(() => {
		const reelText = [];
		for (let sector = 1; sector <= numberOfSectors; sector++) {
			const text = sector.toString();
			const rotation = sector * radiansPerSector

			reelText.push(
				<Text
					key={"reel3_" + sector}
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
	}, [radiansPerSector, textAnchorPercentage]);

	return (
		<>
			<Graphics
				draw={drawReel}
				cursor="not-allowed"
				interactive={true}
			/>
			{drawReelText()}
		</>
	);
}


const Ring4 = () => {
	const radius = 350;
	const numberOfSectors = 13;
	const radiansPerSector = 2 * Math.PI / numberOfSectors;

	const textAnchorPercentage = (radius - 40 / 2) / radius;

	const randomColour = () => {
		return `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
	}
	const color = randomColour();

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
	}, [color, numberOfSectors, radiansPerSector]);


	const drawReelText = React.useCallback(() => {
		const reelText = [];
		for (let sector = 1; sector <= numberOfSectors; sector++) {
			const text = sector.toString();
			const rotation = sector * radiansPerSector

			reelText.push(
				<Text
					key={"reel4_" + sector}
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
	}, [radiansPerSector, textAnchorPercentage]);

	return (
		<>
			<Graphics
				draw={drawReel}
				cursor="not-allowed"
				interactive={true}
			/>
			{drawReelText()}
		</>
	);
}

const Ring5 = () => {
	const radius = 400;
	const numberOfSectors = 13;
	const radiansPerSector = 2 * Math.PI / numberOfSectors;

	const textAnchorPercentage = (radius - 40 / 2) / radius;

	const randomColour = () => {
		return `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
	}
	const color = randomColour();

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
	}, [color, numberOfSectors, radiansPerSector]);


	const drawReelText = React.useCallback(() => {
		const reelText = [];
		for (let sector = 1; sector <= numberOfSectors; sector++) {
			const text = sector.toString();
			const rotation = sector * radiansPerSector

			reelText.push(
				<Text
					key={"reel5_" + sector}
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
	}, [radiansPerSector, textAnchorPercentage]);

	return (
		<>
			<Graphics
				draw={drawReel}
				cursor="not-allowed"
				interactive={true}
			/>
			{drawReelText()}
		</>
	);
}


const ReelButton = () => {

	return (
		<Container
			pivot={[0, 0]}
			position={[400, 400]}
		>
			<Graphics
				draw={(ctx) => {
					ctx.beginFill(0xffffff);
					ctx.drawCircle(0, 0, 150);
					ctx.endFill();
				}}
				cursor="grab"
				interactive={true}
			/>
		</Container>
	)
}

const PixiApp = () => {
	return (
		<Stage
			width={800}
			height={900}
			options={{
				antialias: true,
				roundPixel: true,
			}}
		>
			<Container
				position={[400, 400]}
				pivot={[0, 0]}
			>

				<Ring5 />
				<Ring4 />
				<Ring3 />
				<Ring2 />
				<Ring1 />
				{/* {ReelButton()} */}

			</Container>
			{ReelButton()}
		</Stage>
	);
};

export default PixiApp;
