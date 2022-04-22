export default function handler(req, res) {
	const body = req.body;
	if (!body.bet) {
		return res.status(500).json({ msg: 'Bet amount invalid' });
	}
	if (body.bet < 0) {
		return res.status(500).json({ msg: 'Bet amount invalid' });
	}
	
	res.status(200).json({ bet: `${body.bet}` });
}