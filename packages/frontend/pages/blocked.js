import Link from 'next/link';

export default function blocked() {
	return (
		<>
			<div className="blocked-inner">
				<b>Adblocker detected!<br /></b>
				{/* We don&apos;t display any intrusive advertisements.<br /> */}
				We do not display ANY advertisements.<br />
				We also need the analytics to improve and optimise user experience!<br />
				Please disable it and <i><u>click the logo below</u></i> to continue.
				<br />
				Thanks!
				<div className="line-break"></div>
				<Link href="/">
					<a className="">
						<span className="text-xl font-semibold tracking-wide">
							Gratis<span className="text-rose-600">Games</span>
						</span>
					</a>
				</Link>
			</div>
			<style jsx>{`
				.blocked-inner {
					position: absolute;
					top: 50%;
					left: 50%;
					-ms-transform: translate(-50%, -50%);
					transform: translate(-50%, 250%);
					background-color: #fff;
					justify-content: center;
					align-items: center;
					vertical-align: middle;
					text-align: center;
				}
				.line-break {
					width: 100%;
				 }
			`}</style>
		</>
	);
}
