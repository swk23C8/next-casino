import Layout from "@/components/Layout"
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Center,
} from '@chakra-ui/react'

import Image from 'next/image'


export default function FAQ() {
	return (
		<Layout>
			<h1 className="text-xl font-medium text-gray-800 text-center">
				Frequently Asked Questions
			</h1>
			<p className="text-gray-500 text-center">
				Here are some of the most frequently asked questions.
			</p>
			{/* <div className="mt-8 max-w-4xl"> */}
			<Box
				alignItems="left"
				// display="flex"
				// flexDirection="column"
				justifyContent="left"
				// maxW="4xl"
				mx="20%"
				mt={8}
				// mx="60px"
				// w="full"

			>
				<Accordion
					allowMultiple={true}
					allowToggle={true}
				>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								What is Next-Casino?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								Next-Casino is a decentralized casino platform that enables
								players to play games like poker, blackjack, and other
								traditional games.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I play?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can play games on the website or on the mobile app.
								<br />
								<br />
								<a
									href="https://nextcasino.vercel.app/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image
										src="/images/next-casino-website.png"
										alt="Next-Casino website"
										// className="mx-auto"
										width="100px"
										height="100px"
									/>
								</a>
								<br />
								<br />
								<a
									href="https://apps.apple.com/us/app/next-casino/id1459272919"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image
										src="/images/next-casino-app-store.png"
										alt="Next-Casino app store"
										// className="mx-auto"
										width="100px"
										height="100px"
									/>
								</a>
								<br />
								<br />
								<a
									href="https://play.google.com/store/apps/details?id=com.nextcasino.android"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image
										src="/images/next-casino-google-play.png"
										alt="Next-Casino google play"
										// className="mx-auto"
										width="100px"
										height="100px"
									/>
								</a>
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I deposit?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can deposit your funds to your wallet by clicking the
								deposit button on the homepage.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I withdraw?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can withdraw your funds from your wallet by clicking the
								withdraw button on the homepage.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I transfer funds?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can transfer funds to another player by clicking the
								transfer funds button on the homepage.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I change my password?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can change your password by clicking the change password
								button on the homepage.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I change my email address?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can change your email address by clicking the change
								email button on the homepage.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I change my phone number?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can change your phone number by clicking the change
								phone number button on the homepage.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I change my avatar?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can change your avatar by clicking the change avatar
								button on the homepage.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I change my username?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can change your username by clicking the change username
								button on the homepage.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I change my country?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can change your country by clicking the change country
								button on the homepage.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I change my language?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can change your language by clicking the change language
								button on the homepage.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I change my timezone?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You can change your timezone by clicking the change timezone
								button on the homepage.
							</p>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</Box>
			{/* </div> */}
		</Layout >
	);
}


