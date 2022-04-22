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

	// Update bet amount
	if (req.method === 'PATCH') {
		try {
			const body = req.body;
			const newBet = await prisma.gameState.update({
				where: { userId: user.id },
				data: {
					pBet: body.bet,
				}
			});
			res.status(200).json(newBet);
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong' });
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