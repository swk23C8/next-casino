import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
	console.log(req.body.gameTokens);
	// Check if user is authenticated
	const session = await getSession({ req });
	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' });
	}

	// Retrieve the authenticated user
	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
	});
	// console.log(user)


	// Update stats
	if (req.method === 'PATCH') {
		try {
			const user = await prisma.user.update({
				where: { email: session.user.email },
				data: {
					gameTokens: {
						increment: req.body.gameTokens,
					}
				}
			});
			res.status(200).json(user);
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong' });
		}
	}
	// HTTP method not supported!
	else {
		res.setHeader('Allow', ['PATCH', 'DELETE']);
		res
			.status(405)
			.json({ message: `HTTP method ${req.method} is not supported.` });
	}
}
