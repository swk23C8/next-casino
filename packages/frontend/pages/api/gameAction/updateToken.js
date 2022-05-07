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

	// Retrieve the user's bet Amount
	const userGameState = await prisma.gameState.findUnique({
		where: { userId: user.id },
	});

	const body = req.body;

	// Check if the bet amount is less than zero
	if (body.e !== "loss" && body.e !== "win") {
		console.log("Please enter a valid game action.");
		return res.status(400).json({ message: 'Please enter a valid game action.' });
	}

	// Update bet amount
	if (req.method === 'PATCH') {
		try {
			// Update the user's game state : CASE LOSS
			if (body.e === "loss") {
				const newBalance = await prisma.user.update({
					where: { id: user.id },
					data: {
						gameTokens: user.gameTokens-userGameState.pBet,
					}
				});
				return res.status(200).json({
					message: 'Loss amount updated successfully.',
					newToken: newBalance.gameTokens,
				});
			}
			// Update the user's game state : CASE WIN
			else if (body.e === "win") {
				const newBalance = await prisma.user.update({
					where: { id: user.id },
					data: {
						gameTokens: user.gameTokens+userGameState.pBet,
					}
				});
				return res.status(200).json({
					message: 'Win amount updated successfully.',
					newToken: newBalance.gameTokens,
				});
			}
		} catch (e) {
			res.status(400).json({ message: 'Error updating token amount.' });
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