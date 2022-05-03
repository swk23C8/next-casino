import Die from "react-dice-roll";

// return 3 dice components
const Dice = ({ refs = [] }) => {

	return (
		<div className="flex justify-center space-x-5 my-6">
			<div className="flex items-center content-center justify-center">
				<Die
					onRoll={(value) => {
						refs[3](value);
					}}
					size={95}
					// cheatValue={1}
					ref={refs[0]}
					disabled={true} />
			</div>
			<div className="flex items-center content-center justify-center">
				<Die
					onRoll={(value) => {
						refs[4](value);
					}}
					size={95}
					// cheatValue={1}
					ref={refs[1]}
					disabled={true} />
			</div>
			<div className="flex items-center content-center justify-center">
				<Die
					onRoll={(value) => {
						refs[5](value);
					}}
					size={95}
					// cheatValue={2}
					ref={refs[2]}
					disabled={true} />
			</div>
		</div>
	);
};


export default Dice;

