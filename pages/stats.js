import Layout from '@/components/Layout';
import Table from '@/components/Table';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const redirect = {
		redirect: {
			destination: '/',
			permanent: false,
		},
	};

	// Check if the user is authenticated
	if (!session) {
		return redirect;
	}

	// Retrieve the authenticated user
	const stats = await prisma.user.findUnique({
		where: { email: session.user.email },
	});
	// Pass the data to the Stats page
	return {
		props: {
			stats: JSON.parse(JSON.stringify(stats)),
		},
	};
}

export default function Stat({ stats = [] }) {
	const [userStats, setUserStats] = useState(stats);


	const addTokens = data => {
		let test = axios.patch(`/api/users/${stats.id}`, data);
		// console log api output
		test.then(res => {
			// console.log(res.data);
			setUserStats(res.data);
		});
	};

	// console.log(stats)
	return (
		<Layout>
			<h1 className="text-xl font-medium text-gray-800">
				Your Account Stats
			</h1>
			<p className="text-gray-500">
				View Account Stats below
			</p>
			<div className="mt-8">
				{/* <Grid homes={homes} /> */}
				<Table stats={userStats} />

				{userStats.userType === 'admin' ? (
					<>
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
							onClick={() => addTokens({ gameTokens: 100 })}
						>
							+ 100 Tokens
						</button>
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
							onClick={() => addTokens({ gameTokens: -100 })}
						>
							- 100 Tokens
						</button>
						<button
							className="bg-green-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 hover:bg-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 mx-1"
							onClick={() => {
								// console.log("stats.gameTokens ", stats.gameTokens);
								addTokens({ gameTokens: 10 });
							}}
						>
							+ 10 Tokens
						</button>
						{/* button to decrease stats.gameTokens by 10 */}
						<button
							className="bg-green-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 hover:bg-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 mx-1"
							onClick={() => {
								// console.log("stats.gameTokens ", stats.gameTokens);
								addTokens({ gameTokens: -10 });
							}}
						>
							- 10 Tokens
						</button>
					</>
				) : (
					<div>You are not an admin!</div>
				)}
			</div>
		</Layout>
	);
}
