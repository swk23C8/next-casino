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
			{/* <h1 className="text-xl font-medium text-gray-800 text-center mt-4">
				Game Rules
			</h1>
			<p className="text-gray-500 text-center">
				Here are the rules for Poker.
			</p> */}
			<div className="flex justify-center space-x-5">
				<Link href="/rules/cee-lo">
					<a className="flex items-center space-x-1 border border-transparent rounded-md hover:bg-rose-100 transition">
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
					<a className="flex items-center space-x-1 border border-red-700 rounded-md hover:bg-rose-100 transition">
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
				Poker Rules
			</h1>
			<div className="flex items-center justify-center my-10">
				<ol className="space-y-4 > *">
					<li>
						<strong>
							<span className="text-xl font-semibold tracking-wide">
								What is Poker??
							</span>
						</strong>
						<p className="mt-1">
							<span className="text-xl tracking-wide">
								https://www.wikiwand.com/en/Texas_hold_%27em#/Rules <br />
								Texas hold &apos;em is one of the most popular variants of the card game of poker.<br />
								Two cards, known as hole cards, are dealt face down to each player, and then five community cards are dealt face up in three stages. <br />
								The stages consist of a series of three cards (&quot;the flop&quot;), later an additional single card (&quot;the turn&quot; or &quot;fourth street&quot;),<br />
								and a final card (&quot;the river&quot; or &quot;fifth street&quot;). <br />
								Each player seeks the best five card poker hand from any combination of the seven cards; the five community cards and their two hole cards. <br />
								Players have betting options to check, call, raise, or fold. <br />
								Rounds of betting take place before the flop is dealt and after each subsequent deal. <br />
								The player who has the best hand and has not folded by the end of all betting rounds wins all of the money bet for the hand, known as the pot. <br />
								In certain situations, a &quot;split-pot&quot; or &quot;tie&quot; can occur when two players have hands of equivalent value. This is also called a &quot;chop-pot&quot;.
							</span>
						</p>
					</li>
				</ol>
			</div>
		</Layout>
	)
}