import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
	// Check if user is authenticated
	const session = await getSession({ req });
	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' });
	}

	// create new GameState if it doesnt exist, otherwise update it
	if (req.method === 'PUT') {
		try {
			const { bDie_1, bDie_2, bDie_3, bScore, pDie_1, pDie_2, pDie_3, pScore, result, userId } =
				req.body.data;

			const user = await prisma.user.findUnique({
				where: { email: session.user.email },
			});


			const checkGameState = await prisma.gameState.findUnique({
				where: { userId: user.id },
				select: { id: true },
			});

			if (checkGameState) {

				const gameState = await prisma.gameState.findUnique({
					where: { userId: user.id },
				});
				res.status(200).json(gameState);
			}
			else {
				const gameState = await prisma.gameState.create({
					data: {
						bDie_1: bDie_1,
						bDie_2: bDie_2,
						bDie_3: bDie_3,
						bScore: bScore,
						pDie_1: pDie_1,
						pDie_2: pDie_2,
						pDie_3: pDie_3,
						pScore: pScore,
						result: result,
						userId: userId,
					}
				});
				res.status(200).json(gameState);
			}
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong' });
		}
	}
	// HTTP method not supported!
	else {
		res.setHeader('Allow', ['PUT']);
		res
			.status(405)
			.json({ message: `HTTP method ${req.method} is not supported.` });
	}
}