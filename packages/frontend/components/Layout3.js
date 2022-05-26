import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
// import {
// 	HamburgerIcon,
// 	CloseIcon,
// 	ChevronDownIcon,
// 	ChevronRightIcon,
// } from '@chakra-ui/icons';

import {
	MenuIcon,
	XIcon,
	ChevronDownIcon,
	ChevronRightIcon,
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
	BeakerIcon,
} from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
// import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useSession, signOut } from 'next-auth/react';
import AuthModal from './AuthModal';
import { Menu, Transition } from '@headlessui/react';
import DiceIcon2 from 'public/images/DiceIcon2.png';
import PokerIcon2 from 'public/images/PokerIcon2.png'
import CardIcon2 from 'public/images/CardIcon2.png';

const accountMenuItems = [
	{
		label: 'Settings',
		icon: CogIcon,
		href: '/stats',
	},
	{
		label: 'Support Ticket',
		icon: SupportIcon,
		href: '/create',
	},
	{
		label: 'FAQ',
		icon: QuestionMarkCircleIcon,
		href: '/faq',
	},
	// {
	//   label: 'About',
	//   icon: SparklesIcon,
	//   href: '/about',
	// },
	{
		label: 'TOS',
		icon: DocumentTextIcon,
		href: '/privacy',
	},
	{
		label: 'Logout',
		icon: LogoutIcon,
		onClick: signOut,
	},
];


const WithSubnavigation = ({ children = null }) => {
	const { isOpen, onToggle } = useDisclosure();

	const router = useRouter();
	const { data: session, status } = useSession();
	const user = session?.user;
	const isLoadingUser = status === 'loading';
	const [showModal, setShowModal] = useState(false);
	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	return (
		<>
			<Head>
				<title>GratisGames | The Modern Casino</title>
				<meta
					name="title"
					content="Play Casino Games for Free | The Modern Casino"
				/>
				<link rel="icon" href="/favicon.ico" />
				<meta name="google-site-verification" content="Q8f9yc4NaHFd_VZQ08Qgrf2gTNFZI0v1VubOBhe99FU" />
			</Head>
			<Box>
				<Flex
					bg={useColorModeValue('white', 'gray.800')}
					color={useColorModeValue('gray.600', 'white')}
					minH={'4vh'}
					py={{ base: 1 }}
					px={{ base: 4 }}
					borderBottom={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.900')}
					align={'center'}
					shadow={'md'}
				>
					<Flex
						flex={{ base: 1, md: 'auto' }}
						ml={{ base: -2 }}
						display={{ base: 'flex', md: 'none' }}>
						<IconButton
							onClick={onToggle}
							icon={
								isOpen ? <XIcon w={3} h={3} /> : <MenuIcon w={5} h={5} />
							}
							variant={'ghost'}
							aria-label={'Toggle Navigation'}
						/>
					</Flex>
					<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
						<Link href="/">
							<a className="flex items-center space-x-1">
								<SparklesIcon className="shrink-0 w-8 h-8 text-rose-500" />
								<span className="text-xl font-semibold tracking-wide">
									Gratis<span className="text-rose-600">Games</span>
								</span>
							</a>
						</Link>

						<Flex
							display={{ base: 'none', md: 'flex' }}
							// mr={10}
							// align={'center'}
							justify={'center'}
							w={'full'}
						>
							<DesktopNav />
						</Flex>
					</Flex>

					<Stack
						flex={{ base: 1, md: 0 }}
						justify={'flex-end'}
						direction={'row'}
						spacing={6}>

						<div className="flex items-center space-x-4 w-max">
							<button
								onClick={() => {
									session?.user ? router.push('/stats') : openModal();
								}}
								className="hidden sm:block hover:bg-gray-200 transition rounded-md px-4 py-2 font-normal text-gray-800 hover:text-gray-600"
							>
								Account Stats
							</button>
							{isLoadingUser ? (
								<div className="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
							) : user ? (
								<Menu as="div" className="relative z-50">
									<Menu.Button className="flex items-center space-x-px group">
										<div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
											{user?.image ? (
												<Image
													src={user?.image}
													alt={user?.name || 'Avatar'}
													layout="fill"
												/>
											) : (
												<UserIcon className="text-gray-400 w-6 h-6" />
											)}
										</div>
										<ChevronDownIcon className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
									</Menu.Button>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="opacity-0 scale-95"
										enterTo="opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="opacity-100 scale-100"
										leaveTo="opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<div className="flex items-center space-x-2 py-4 px-4 mb-2">
												<div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
													{user?.image ? (
														<Image
															src={user?.image}
															alt={user?.name || 'Avatar'}
															layout="fill"
														/>
													) : (
														<UserIcon className="text-gray-400 w-6 h-6" />
													)}
												</div>
												<div className="flex flex-col truncate">
													<span>{user?.name}</span>
													<span className="text-sm text-gray-500">
														{user?.email}
													</span>
												</div>
											</div>
											<div className="py-2">
												{accountMenuItems.map(
													({ label, href, onClick, icon: Icon }) => (
														<div
															key={label}
															className="px-2 last:border-t last:pt-2 last:mt-2"
														>
															<Menu.Item>
																{href ? (
																	<Link href={href}>
																		<a className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100">
																			<Icon className="w-5 h-5 shrink-0 text-gray-500" />
																			<span>{label}</span>
																		</a>
																	</Link>
																) : (
																	<button
																		className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
																		onClick={onClick}
																	>
																		<Icon className="w-5 h-5 shrink-0 text-gray-500" />
																		<span>{label}</span>
																	</button>
																)}
															</Menu.Item>
														</div>
													)
												)}
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							) : (
								<button
									type="button"
									onClick={openModal}
									className="ml-4 px-4 py-1 rounded-md bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50 text-white transition"
								>
									Log in
								</button>
							)}
						</div>

					</Stack>
				</Flex>

				<Collapse in={isOpen} animateOpacity>
					<MobileNav />
				</Collapse>
				<main className="flex-grow container mx-auto max-w-full max-h-screen">
					{/* <div className="mx-1 mt-2"> */}
					<div className="">
						{typeof children === 'function' ? children(openModal) : children}
					</div>
				</main>

				<AuthModal show={showModal} onClose={closeModal} />
			</Box>
		</>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={'1vw'} align={'center'}>
			{NAV_ITEMS.map((navItem) => (
				<Box
					key={navItem.label + "desktop"}
				>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Link
								// p={2}
								href={navItem.href ?? '#'}
								fontSize={'sm'}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: 'none',
									color: linkHoverColor,
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={popoverContentBgColor}
								p={4}
								rounded={'xl'}
								minW={'sm'}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }) => {
	return (
		<Link
			href={href}
			role={'group'}
			display={'block'}
			p={2}
			rounded={'md'}
			_hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text
						transition={'all .3s ease'}
						_groupHover={{ color: 'pink.400' }}
						fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={'sm'}>{subLabel}</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}>
					<Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{ md: 'none' }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label + "mobile"} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				// width={'100%'}
				py={2}
				as={Link}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}
			>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}>
					{children &&
						children.map((child) => (
							<Link key={child.label} py={2} href={child.href} width={'100%'}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

const NAV_ITEMS = [
	{
		label:
			// 'Dice Games'
			<div className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
				<Image
					// className="shrink-0 w-8 h-8 text-rose-500"
					src={DiceIcon2}
					// width={'50vw'}
					// height={'50vw'}
					width={35}
					height={35}
					alt="DiceIcon2"
				/>
				<span className="text-[1.9vh] font-semibold tracking-wide">
					Dice Games
					{/* Dice */}
				</span>
			</div>
		,
		children: [
			{
				label: 'Cee-Lo',
				subLabel: 'Single-Player Casino Style Cee-Lo Game',
				href: '/cee_lo',
			},
			{
				label: 'Craps',
				subLabel: 'Single-Player Casino Style Craps Game',
				href: '#',
			},
		],
	},
	{
		label:
			<div className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
				<Image
					// className="shrink-0 w-8 h-8 text-rose-500"
					src={CardIcon2}
					// width={'50vw'}
					// height={'50vw'}
					width={35}
					height={35}
					alt="CardIcon2"
				/>
				<span className="text-[1.9vh] font-semibold tracking-wide">
					Card Games
					{/* Cards */}
				</span>
			</div>
		,
		children: [
			{
				label: "Heads up Texas hold'em",
				subLabel: "Multiplayer Poker with Texas hold 'em Rules",
				href: '/poker',
			},
			{
				label: 'Blackjack',
				subLabel: 'Classic Blackjack Casino Game',
				href: '#',
			},
		],
	},
	{
		label:
			<div className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
				<PuzzleIcon className="shrink-0 w-8 h-8 text-rose-500" />

				<span className="text-[1.9vh] font-semibold tracking-wide">
					{/* Paper & Pencil Games */}
					{/* Pen & Paper Games */}
					Board Games
				</span>
			</div>
		,
		children: [
			{
				label: 'Ultimate Tic Tac Toe',
				subLabel: "Tic Tac Toe variant with an interesting twist!",
				href: '/ultimate_tictactoe',
			},
			{
				label: 'Tic Tac Toe',
				subLabel: 'Also known as; noughts and crosses or Xs and Os',
				href: '/tictactoe2',
			},
		],
	},
	{
		label:
			<div className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
				<BeakerIcon className="shrink-0 w-8 h-8 text-rose-500" />

				<span className="text-[1.9vh] font-semibold tracking-wide">
					Play Ground
				</span>
			</div>
		,
		children: [
			{
				label: '🎖️VIP only for now',
				subLabel: "???",
				href: '#',
			},
			{
				label: 'Testing Grounds',
				subLabel: "🐢",
				href: '/playground',
			},
		],
	},
	{
		label:
			<div className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
				<InformationCircleIcon className="shrink-0 w-8 h-8 text-rose-500" />

				<span className="text-[1.9vh] font-semibold tracking-wide">
					More
				</span>
			</div>
		,
		children: [
			{
				label: 'Stats',
				subLabel: "Check your Account Stats",
				href: '/stats',
			},
			{
				label: 'Rules',
				subLabel: 'Detailed Rules for all Games & GratisGames',
				href: '/rules',
			},
			{
				label: 'FAQ',
				subLabel: 'Find answers to Frequently Asked Questions',
				href: '/faq',
			},
			{
				label: 'About Us',
				subLabel: 'About GratisGames',
				href: '/about',
			},
		],
	},
	// {
	// 	label: 'Learn Design',
	// 	href: '#',
	// },
	// {
	// 	label: 'Hire Designers',
	// 	href: '#',
	// },
];

WithSubnavigation.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default WithSubnavigation;