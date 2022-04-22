import Die from "react-dice-roll";

// return 3 dice components
const Dice = ({ refs = [] }) => {

	return (
		<>
			<Die
				onRoll={(value) => {
					refs[3].current = value;
				}}
				size={85}
				// cheatValue={1}
				ref={refs[0]}
				disabled={true} />
			<Die
				onRoll={(value) => {
					refs[4].current = value;
				}}
				size={85}
				// cheatValue={1}
				ref={refs[1]}
				disabled={true} />
			<Die
				onRoll={(value) => {
					refs[5].current = value;
				}}
				size={85}
				// cheatValue={2}
				ref={refs[2]}
				disabled={true} />
		</>
	);
};


export default Dice;

