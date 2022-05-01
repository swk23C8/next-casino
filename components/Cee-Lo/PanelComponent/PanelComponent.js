import Image from 'next/image'

const PanelComponent = () => {
	return (
		<table className="w-full min-h-[50vh] shadow-md">
			<thead>
				<tr>
					<th className="bg-red-700 text-white p-1 w-auto">Name</th>
					<th className="bg-red-700 text-white p-1 w-auto">Example</th>
					<th className="bg-red-700 text-white p-1 w-auto">Outcome</th>
					<th className="bg-red-700 text-white p-1 w-auto">Comment</th>
				</tr>
			</thead>
			<tbody>
				<tr className="bg-red-100 text-black">
					<td className="">Triple</td>
					<td className="">
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142306.png"
							alt="Die_face_6b"
							width={35}
							height={35}
						/>
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142306.png"
							alt="Die_face_6b"
							width={35}
							height={35}
						/>
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142306.png"
							alt="Die_face_6b"
							width={35}
							height={35}
						/>
					</td>
					<td className="">WIN</td>
					<td className="">All three dice show the same number.<br /> 6-6-6 is the highest roll,<br />5-5-5 is the next highest, etc.<br />Any triple is an instant win.</td>
				</tr>
				<tr className="bg-red-200 text-black">
					<td className="">4-5-6</td>
					<td className="">
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142304.png"
							alt="Die_face_4b"
							width={35}
							height={35}
						/>
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142305.png"
							alt="Die_face_5b"
							width={35}
							height={35}
						/>
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142306.png"
							alt="Die_face_6b"
							width={35}
							height={35}
						/>
					</td>
					<td className="">WIN</td>
					<td className="">Sequential 4-5-6;<br /> this is an instant win.</td>
				</tr>
				<tr className="bg-red-100 text-black">
					<td className="">Points</td>
					<td className="">
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142303.png"
							alt="Die_face_3b"
							width={35}
							height={35}
						/>
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142303.png"
							alt="Die_face_3b"
							width={35}
							height={35}
						/>
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142305.png"
							alt="Die_face_5b"
							width={35}
							height={35}
						/>
					</td>
					<td className="">n points</td>
					<td className="">
						One pair plus any other value;<br /> the odd die is the point value.<br /> Possible point values range from 2 to 5<br />When the point value is 6, it is an instant win; <br />When the point value is 1, it is an instant loss.
					</td>
				</tr>
				<tr className="bg-red-200 text-black">
					<td className="">1-2-3</td>
					<td className="">
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142301.png"
							alt="Die_face_1b"
							width={35}
							height={35}
						/>
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142302.png"
							alt="Die_face_2b"
							width={35}
							height={35}
						/>
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142303.png"
							alt="Die_face_3b"
							width={35}
							height={35}
						/>
					</td>
					<td className="">LOSE</td>
					<td className="">Sequential 1-2-3;<br /> this is an instant loss.</td>
				</tr>
				<tr className="bg-red-100 text-black">
					<td className="">Indeterminate</td>
					<td className="">
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142303.png"
							alt="Die_face_3b"
							width={35}
							height={35}
						/>
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142305.png"
							alt="Die_face_5b"
							width={35}
							height={35}
						/>
						<Image
							src="https://cdn-icons-png.flaticon.com/512/142/142306.png"
							alt="Die_face_6b"
							width={35}
							height={35}
						/>
					</td>
					<td className="">Re-Roll</td>
					<td className="">
						Any combination that does not result in a <br />triple, sequential, or points is an <br />indeterminate outcome and requires a re-roll.
					</td>
				</tr>
			</tbody>
		</table>
	)

}

export default PanelComponent;