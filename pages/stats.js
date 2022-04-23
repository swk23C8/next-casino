import Layout from '@/components/Layout';
import Table from '@/components/Table';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';

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

	// const handleOnSubmit = data => axios.patch(`/api/users/${stats.id}`, data);

	const handleOnSubmit = data => {
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
				VIP status: {userStats.vip ? 'VIP' : 'Not VIP'}
			</p>
			<div className="mt-8">

				{/* <Table stats={userStats} /> */}

				{userStats.userType === 'ADMIN' ? (
					<>
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
							onClick={() => handleOnSubmit({ gameTokens: 100 })}
						>
							+ 100 Tokens
						</button>
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
							onClick={() => handleOnSubmit({ gameTokens: -100 })}
						>
							- 100 Tokens
						</button>
						<button
							className="bg-green-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 hover:bg-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 mx-1"
							onClick={() => {
								// console.log("stats.gameTokens ", stats.gameTokens);
								handleOnSubmit({ gameTokens: 10 });
							}}
						>
							+ 10 Tokens
						</button>
						{/* button to decrease stats.gameTokens by 10 */}
						<button
							className="bg-green-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 hover:bg-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 mx-1"
							onClick={() => {
								// console.log("stats.gameTokens ", stats.gameTokens);
								handleOnSubmit({ gameTokens: -10 });
							}}
						>
							- 10 Tokens
						</button>
					</>
				) : (
					<div className="flex items-center justify-center">You are not an admin!</div>
				)}
				{/* add field to edit id */}
				<Formik
					initialValues={{
						id: stats.id,
						gameTokens: stats.gameTokens,
						userType: stats.userType,
						email: stats.email,
						password: stats.password,
						createdAt: stats.createdAt,
						updatedAt: stats.updatedAt,
					}}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						handleOnSubmit(values);
						setSubmitting(false);
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<div className="flex flex-wrap -mx-1 mb-6">
								<div className="w-full px-3">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="id"
									>
										ID
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="id"
										type="text"
										disabled
										placeholder={userStats.id}
									/>

									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="gameTokens"
									>
										Game Tokens
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="gameTokens"
										type="text"
										disabled
										placeholder={userStats.gameTokens}
									/>

									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="userType"
									>
										User Type
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="userType"
										type="text"
										disabled
										placeholder={userStats.userType}
									/>

									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="email"
									>
										Email
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="email"
										type="text"
										disabled
										placeholder={userStats.email}
									/>

									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="password"
									>
										Password
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="password"
										type="text"
										disabled
										placeholder="✨NextCasino does not store your password✨"
									/>

									<label
										className="block uppercase tracking -wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="createdAt"
									>
										Created At
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="createdAt"
										type="text"
										disabled
										placeholder={userStats.createdAt}	
									/>

									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="deletedAt"
									>
										Banned/Deleted At
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="deletedAt"
										type="text"
										disabled
										placeholder="Not yet banned/deleted"
									/>

									<div className="flex items-center justify-center space-x-5">
										{/* <button
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
											type="button"
											onClick={() => {
												history.push('/users');
											}}
										>
											Back
										</button> */}

										{/* <button
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
											type="button"
											onClick={() => {
												history.push('/users/edit/' + user.id);
											}}
										>
											Edit
										</button> */}

										<button
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
											type="button"
											onClick={() => {
												// deleteUser(user.id);
												console.log("haha not implemented yet")
											}}
										>
											Gib me admin now
										</button>

										<button
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
											type="button"
											onClick={() => {
												// deleteUser(user.id);
												console.log("haha not implemented yet")
											}}
										>
											Boost my Tokens
										</button>

										<button
											className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
											type="button"
											onClick={() => {
												// deleteUser(user.id);
												console.log("haha not implemented yet")
											}}
										>
											Delete My Account
										</button>
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</Layout>
	);
}
