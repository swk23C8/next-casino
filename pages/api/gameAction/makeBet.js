export default function handler(req, res) {
	// console.log(req.body.bet);
	// console.log(res);


	const body = req.body;
	// console.log(body);


	if (!body.bet) {
		return res.status(500).json({ msg: 'Bet amount not available/zero' });
	}
	if (body.bet < 0) {
		return res.status(500).json({ msg: 'Bet amount less than zero' });
	}

	return res.status(200).json({ bet: `${body.bet}` });
}