import Layout from "@/components/Layout3"
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
import PokerIcon2 from 'public/images/PokerIcon2.png'



export default function Rules() {
	return (
		<Layout>
			{/* <h1 className="text-xl font-medium text-gray-800 text-center mt-4">
				Game Rules
			</h1>
			<p className="text-gray-500 text-center">
				Here are the rules for Cee-Lo.
			</p> */}
			<div className="flex justify-center space-x-5">
				{/* <Link href="/cee-lo-rules"> */}
				<Link href="/rules/cee-lo">
					<a className="flex items-center space-x-1 border border-red-700 rounded-md hover:bg-rose-100 transition">
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
					<a className="flex items-center space-x-1 border border-transparent rounded-md hover:bg-rose-100 transition">
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
					<a className="flex items-center space-x-1 border border-transparent rounded-md hover:bg-rose-100 transition">
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
					<a className="flex items-center space-x-1 border border-transparent rounded-md hover:bg-rose-100 transition">
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
					<a className="flex items-center space-x-1 border border-transparent rounded-md hover:bg-rose-100 transition">
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
			<h1 className="text-3xl font-semibold text-gray-800 text-center mt-4">
				Cee-Lo Rules
			</h1>
			{/* <p className="flex items-center justify-center my-10">insert rules for Cee-Lo here</p> */}
			<div className="flex items-center justify-center my-10">
				<ol className="space-y-4 > *">
					<li>
						<strong>
							<span className="text-xl font-semibold tracking-wide">
								What is Cee-Lo?
							</span>
						</strong>
						<p className="mt-1">
							<span className="text-xl tracking-wide">
								Cee-Lo is a betting game played with three six-sided dice. It&apos;s name originates from the Chinese: Sì-Wŭ-Liù (四五六).<br />
								Meaning &quot;four-five-six&quot;. There are many variations of the game so please be sure to check the rules for each game.
							</span>
						</p>
					</li>
					<li>
						<strong>
							<span className="text-xl font-semibold tracking-wide">
								What are the outcome of the roll combinations?
							</span>
						</strong>
						<p className="mt-1">
							<span className="text-xl tracking-wide">
								Cee-Lo is a game where the outcome of each round is either an instant WIN/LOSS or PUSH.
							</span>
						</p>
					</li>
					<li>
						<strong>
							<span className="text-xl font-semibold tracking-wide">
								What roll combination is considered an instant WIN?
							</span>
						</strong>
						<p className="mt-1">
							<span className="text-xl tracking-wide">
								Rolling triples of any dice value is considered an instant WIN. Rolling triples of six&apos;s is the highest roll, then triples of five&apos;s and so on.<br />
								Also, rolling a pair of any value with a six is considered an instant WIN.<br />
								Lastly, rolling a sequential 4-5-6 is considered an instant WIN.
							</span>
						</p>
					</li>
					<li>
						<strong>
							<span className="text-xl font-semibold tracking-wide">
								What roll combination is considered an instant LOSS?
							</span>
						</strong>
						<p className="mt-1">
							<span className="text-xl tracking-wide">
								Rolling a sequential 1-2-3 is considered an instant LOSS.<br />
								Also, rolling a pair of any value with a one is considered an instant LOSS.
							</span>
						</p>
					</li>
					<li>
						<strong>
							<span className="text-xl font-semibold tracking-wide">
								What roll combination is considered POINTS?
							</span>
						</strong>
						<p className="mt-1">
							<span className="text-xl tracking-wide">
								Rolling a a pair of any value with the odd die rolling between two and five is considered points. This is because the odd die being one or six are special cases<br />
								For example, roll combination of 2-2-5 is worth 5 points. <br />
								However, 2-2-6 is considered an instant WIN. Conversely, 2-2-1 is considered an instant LOSS. <br />
								When the point value of the Banker and the Player is equal it is considered a PUSH
							</span>
						</p>
					</li>
					<li>
						<strong>
							<span className="text-xl font-semibold tracking-wide">
								What roll combination requires a RE-ROLL?
							</span>
						</strong>
						<p className="mt-1">
							<span className="text-xl tracking-wide">
								Any roll combination that does not result in either WIN, LOSS or POINTS is considered indeterminate and requires a RE-ROLL.
							</span>
						</p>
					</li>
				</ol>
			</div>
		</Layout >
	)
}