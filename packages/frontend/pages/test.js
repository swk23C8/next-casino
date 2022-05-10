import {
	useDisclosure,
	MenuItem,
	Menu,
	MenuButton,
	MenuList,
} from "@chakra-ui/react"
// import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

export default function Layout() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Menu
			isOpen={isOpen}
			width={40}
		>
			<MenuButton
				variant="ghost"
				mx={1}
				py={[1, 2, 2]}
				px={4}
				borderRadius={5}
				// _hover={
				//    { bg: useColorModeValue("gray.100", "gray.700") }
				// }
				aria-label="Courses"
				fontWeight="normal"
				onMouseEnter={onOpen}
				onMouseLeave={onClose}
			>
				More {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
			</MenuButton>
			<MenuList
				onMouseEnter={onOpen}
				onMouseLeave={onClose}
				minWidth={20}
			>
				<MenuItem
					as="a"
					href="
               "
					onClick={onClose}
					fontWeight="normal"
					fontSize="sm"
					color="gray.700"
					textTransform="uppercase"
					letterSpacing="wide"
					lineHeight="short"
					px={4}
					py={2}
					borderRadius={5}
					_hover={{
						color: "gray.900",
						bg: "gray.100",
						borderColor: "gray.200",
					}}
					width={40}
				>
					Menu Item 1
				</MenuItem>
				{/* <MenuItem>Menu Item 2</MenuItem>
            <MenuItem>Menu Item 3</MenuItem> */}
			</MenuList>
		</Menu>
	)
}