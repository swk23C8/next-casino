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


export default function WithSubnavigation() {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
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
					{/* <Text
						textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
						fontFamily={'heading'}
						color={useColorModeValue('gray.800', 'white')}>
						Logo
					</Text> */}
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

					<Button
						display={{ base: 'none', md: 'inline-flex' }}
						as={'a'}
						fontSize={'s'}
						fontWeight={400}
						variant={'link'}
						href={'#'}>
						Account Stats
					</Button>
					<Button
						// display={{ base: 'none', md: 'inline-flex' }}
						// display={{ base: 1, md: 'inline-flex' }}
						// display={{ base: 1, md: 0 }}
						fontSize={'sm'}
						fontWeight={600}
						color={'white'}
						bg={'pink.400'}
						href={'#'}
						_hover={{
							bg: 'pink.300',
						}}>
						Sign Up
					</Button>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={8} align={'center'}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
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
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}>
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
							<Link key={child.label} py={2} href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

// interface NavItem {
// 	label: string;
// 	subLabel?: string;
// 	children?: Array<NavItem>;
// 	href?: string;
// }

const NAV_ITEMS = [
	{
		label:
			// 'Dice Games'
			<div className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
				<Image
					// className="shrink-0 w-8 h-8 text-rose-500"
					src={DiceIcon2}
					width={35}
					height={35}
					alt="DiceIcon2"
				/>
				<span className="text-xl font-semibold tracking-wide">
					Dice Games
				</span>
			</div>
		,
		children: [
			{
				label: 'Cee-Lo',
				subLabel: 'Single-Player Casino Style Cee-Lo Game',
				href: '#',
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
					width={35}
					height={35}
					alt="CardIcon2"
				/>
				<span className="text-xl font-semibold tracking-wide">
					Card Games
				</span>
			</div>
		,
		children: [
			{
				label: 'Poker',
				subLabel: "Multiplayer Poker with Texas hold 'em Rules",
				href: '#',
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

				<span className="text-xl font-semibold tracking-wide">
					Paper & Pencil Games
				</span>
			</div>
		,
		children: [
			{
				label: 'Ultimate Tic Tac Toe',
				subLabel: "Tic Tac Toe variant with an interesting twist!",
				href: '#',
			},
			{
				label: 'Tic Tac Toe',
				subLabel: 'Also known as; noughts and crosses or Xs and Os',
				href: '#',
			},
		],
	},
	{
		label:
			<div className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
				<BeakerIcon className="shrink-0 w-8 h-8 text-rose-500" />

				<span className="text-xl font-semibold tracking-wide">
					PlayGround
				</span>
			</div>
		,
		children: [
			{
				label: '???',
				subLabel: "???",
				href: '#',
			},
		],
	},
	{
		label:
			<div className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
				<InformationCircleIcon className="shrink-0 w-8 h-8 text-rose-500" />

				<span className="text-xl font-semibold tracking-wide">
					More
				</span>
			</div>
		,
		children: [
			{
				label: 'Stats',
				subLabel: "Check your Account Stats",
				href: '#',
			},
			{
				label: 'Rules',
				subLabel: 'Detailed Rules for all Games & GratisGames',
				href: '#',
			},
			{
				label: 'FAQ',
				subLabel: 'Find answers to Frequently Asked Questions',
				href: '#',
			},
			{
				label: 'About Us',
				subLabel: 'About GratisGames',
				href: '#',
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