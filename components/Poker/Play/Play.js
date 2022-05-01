import PropTypes from 'prop-types';


const Play = ({ stats = [], game = [] }) => {

	{/* map through stats and output result with a <p> tag */ }
	const statEl = () => {
		stats.map((stat => (
			<p key={stat.id}>{stat.result}</p>
		)));
	}

	return (
		<>
		<p>hello this is the poker page</p>
			{/* {statEl} */}
			{/* <p>{stats}</p> */}
			{/* <p>{game}</p> */}
		</>
	)
}

// Play.PropTypes = {
// 	stat: PropTypes.array,
// 	game: PropTypes.array,
// }

export default Play;