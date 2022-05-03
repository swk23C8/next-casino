import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';


export default async function handler(req, res) {
	// Check if user is authenticated
	const session = await getSession({ req });
	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' });
	}

	// Retrieve the authenticated user
	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
	});

	const body = req.body;

	// Check if the bet amount is less than zero
	if (body.bet < 0) {
		return res.status(400).json({ message: 'Bet amount cannot be less than zero.' });
	}

	// Check if the bet amount is greater than user's balance
	if (body.bet > user.gameTokens) {
		return res.status(400).json({ message: 'Bet amount is greater than user\'s balance.' });
	}


	// Update bet amount
	if (req.method === 'PATCH') {
		try {
			// Update the user's game state
			const newBet = await prisma.gameState.update({
				where: { userId: user.id },
				data: {
					pBet: body.bet,
				}
			});
			// Return rolled dice
			return res.status(200).json({
				message: 'Bet amount updated successfully.',
				bet: newBet.pBet,
			});

			// // Return the updated bet amount
			// res.status(200).json(newBet);
		} catch (e) {
			res.status(500).json({ message: 'Error updating bet amount.' });
		}
	}
	// HTTP method not supported!
	else {
		res.setHeader('Allow', ['POST']);
		res
			.status(405)
			.json({ message: `HTTP method ${req.method} is not supported.` });
	}
}