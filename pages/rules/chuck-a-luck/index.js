import Layout from "@/components/Layout"
import Link from 'next/link';
import {
	HeartIcon,
	HomeIcon,
	LogoutIcon,
	PlusIcon,
	SparklesIcon,
	UserIcon,
	PuzzleIcon,
	SupportIcon,
	QuestionMarkCircleIcon,
	CogIcon,
	DocumentTextIcon,
	InformationCircleIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import DiceIcon2 from 'public/images/DiceIcon2.png';
import CardIcon2 from 'public/images/CardIcon2.png';
import ChuckaluckIcon from 'public/images/ChuckaluckIcon.png';
import ChuckaluckIcon2 from 'public/images/ChuckaluckIcon2.png';
import ChuckaluckIcon3 from 'public/images/ChuckaluckIcon3.png';
import CrapsIcon from 'public/images/CrapsIcon.png';
import CrapsIcon2 from 'public/images/CrapsIcon2.png';
import CrapsIcon3 from 'public/images/CrapsIcon3.png';
import BlackJackIcon2 from 'public/images/BlackjackIcon2.png'
import AcesIcon2 from 'public/images/AcesIcon2.png'
import PokerIcon from 'public/images/PokerIcon.png'
import PokerIcon2 from 'public/images/PokerIcon2.png'

export default function Rules() {
	return (
		<Layout>
			<h1 className="text-xl font-medium text-gray-800 text-center mt-4">
				Rules
			</h1>
			<p className="text-gray-500 text-center">
				Here are the rules for Chuck-a-Luck.
			</p>
			<div className="flex justify-center space-x-5">
				<Link href="/rules/cee-lo">
					<a className="flex items-center space-x-1 border border-transparent rounded-md">
						{/* <PuzzleIcon className="shrink-0 w-8 h-8 text-rose-500" /> */}
						<Image
							className="shrink-0 w-8 h-8 text-rose-500"
							src={DiceIcon2}
							width={40}
							height={40}
							alt="DiceIcon2"
						/>
						<span className="text-xl font-semibold tracking-wide pr-1">
							Cee-Lo Rules
						</span>
					</a>
				</Link>

				<Link href="/rules/craps">
					<a className="flex items-center space-x-1 border border-transparent rounded-md">
						{/* <PuzzleIcon className="shrink-0 w-8 h-8 text-rose-500" /> */}
						<Image
							className="shrink-0 w-8 h-8 text-rose-500"
							src={CrapsIcon3}
							width={40}
							height={40}
							alt="CrapsIcon3"
						/>
						<span className="text-xl font-semibold tracking-wide">
							Craps Rules
						</span>
					</a>
				</Link>

				<Link href="/rules/chuck-a-luck">
					<a className="flex items-center space-x-1 border border-red-700 rounded-md">
						{/* <PuzzleIcon className="shrink-0 w-8 h-8 text-rose-500" /> */}
						<Image
							className="shrink-0 w-8 h-8 text-rose-500"
							src={ChuckaluckIcon3}
							width={40}
							height={40}
							alt="ChuckaluckIcon3"
						/>
						<span className="text-xl font-semibold tracking-wide">
							Chuck-a-Luck Rules
						</span>
					</a>
				</Link>

				<Link href="/rules/blackjack">
					<a className="flex items-center space-x-1 border border-transparent rounded-md">
						{/* <PuzzleIcon className="shrink-0 w-8 h-8 text-rose-500" /> */}
						<Image
							className="shrink-0 w-8 h-8 text-rose-500"
							src={CardIcon2}
							width={40}
							height={40}
							alt="CardIcon2"
						/>
						<span className="text-xl font-semibold tracking-wide">
							BlackJack Rules
						</span>
					</a>
				</Link>
				<Link href="/rules/poker">
					<a className="flex items-center space-x-1 border border-transparent rounded-md">
						{/* <PuzzleIcon className="shrink-0 w-8 h-8 text-rose-500" /> */}
						<Image
							className="shrink-0 w-8 h-8 text-rose-500"
							src={PokerIcon2}
							width={40}
							height={40}
							alt="PokerIcon2"
						/>
						<span className="text-xl font-semibold tracking-wide">
							Poker Rules
						</span>
					</a>
				</Link>
			</div>
			<p className="flex items-center justify-center my-10">insert rules for Chuck-a-Luck here</p>
		</Layout>
	)
}