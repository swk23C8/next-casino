const StatComponent = (game = {}, balance={}, result={}, makeBet={}, statsUserType={}) => {
	return (
		<>
			<div className="game-info">
				<p className="text-xl">Game ID: {game.id}</p>
				<p className="text-2xl mt-5">Account Balance: {balance}</p>
				{/* <p className="text-2xl">Bet Amount: {pBet}</p> */}
				<p className="text-2xl mt-5">Game Result: {result}</p>
			</div>
			<div className="game-form mt-5 ">
				<form
					className="flex flex-col justify-center items-center "
					id="makeBetForm"
					onSubmit={makeBet}>
					<label className="font-extrabold text-2xl">
						Bet Amount:
						<input className="ml-5" type="number" name="bet" />
					</label>
				</form>
				<button
					disabled={stats.userType === "GUEST" ? true : false}
					form="makeBetForm"
					className="tracking-widest shadow-lg shadow-cyan-500/50 font-bold text-3xl h-2/4 w-4/5 my-5 bg-rose-600 text-white py-3 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-rose-600 focus:ring-opacity-50 hover:bg-rose-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-600">
					BET
				</button>
				<div className="hotkeys">
					<p className="text-xl font-bold">HOTKEYS</p>
					<p className="text-xl">SPACE: bet</p>
					<p className="text-xl">E: halve bet</p>
					<p className="text-xl">R: double bet</p>
					<p className="text-xl">D: roll dice</p>
				</div>
			</div>
		</>
	)
}

export default StatComponent