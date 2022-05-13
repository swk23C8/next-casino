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
			<h1 className="text-xl font-medium text-gray-800 text-center mt-4">
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
								What is GratisGames?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								GratisGames is a Free-To-Play game platform that enables
								players to play games like poker, blackjack, and other
								traditional games for free.
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
							To play the game, you need to be connected to the internet.
							You will be able to play the game by clicking on the &quot;Play&quot;
							button on the home page.
							<p>
								You can play games on the website or on the mobile app. (not yet available)
								<br />
								<br />
								<a
									href="https://gratisgames.vercel.app/"
									target="_blank"
									rel="noopener noreferrer"
								>
									
									<Image
										src="/images/GratisGames-website.png"
										alt="GratisGames website"
										// className="mx-auto"
										width="100px"
										height="100px"
									/>
								</a>
								<br />
								<br />
								<a
									href="https://apps.apple.com/us/app/GratisGames/id1459272919"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image
										src="/images/GratisGames-app-store.png"
										alt="GratisGames app store"
										// className="mx-auto"
										width="100px"
										height="100px"
									/>
								</a>
								<br />
								<br />
								<a
									href="https://play.google.com/store/apps/details?id=com.GratisGames.android"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image
										src="/images/GratisGames-google-play.png"
										alt="GratisGames google play"
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
								Games on GratisGames are 100% free to play and always will be.
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
								Play Money: &quot;Tokens&quot; are designed for entertainment, as well as to help beginners and intermediate players get familiar with casino game rules, tournaments and cash games. As the name implies, Tokens have no monetary value, and cannot be withdrawn, sold or converted into real money.
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
								You are currently unable to transfer funds from your account to another at the moment.
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
								GratisGames relies on Google Authentication and ✨Magic Links to handle sign-ups and log-ins. <br />In other words, GratisGames does not store your passwords.
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
								<b>COMING SOON:</b> You can change your username by clicking the change username
								button on the homepage.
								<br /> Please contact us if you are on the leaderboard and wish to change your username for now.
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
								GratisGames is only available in English at the moment.<br />
								If you would like to help us translate to your language please contact us!
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
								You are unable to change your email address at the moment.
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
								You are unable to change your avatar at the moment.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								How do I change my role to ADMIN / VIP / MODERATOR?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								You will automatically gain elevated roles depending on activity.
							</p>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								Can you give me more Tokens?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								(contact us to get more tokens for now) You can click on the rewards button to &apos;earn&apos; more tokens or through subscriptions.
							</p>
						</AccordionPanel>
					</AccordionItem>



					<AccordionItem>
						<AccordionButton>
							<Box flex='1' textAlign='left'>
								Who can play?
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel>
							<p>
								Any person of any age can play this game.
							</p>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</Box>
			{/* </div> */}
		</Layout >
	);
}


