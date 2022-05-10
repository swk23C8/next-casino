import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useSession, signOut } from 'next-auth/react';
import AuthModal from './AuthModal';
import { Menu, Transition } from '@headlessui/react';
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
   BeakerIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import DiceIcon2 from 'public/images/DiceIcon2.png';
import PokerIcon2 from 'public/images/PokerIcon2.png'


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

const gameMenuItems = [
   {
      label: 'Test',
      icon: CogIcon,
      href: '/stats',
   },
];

const Layout = ({ children = null }) => {
   const router = useRouter();

   const { data: session, status } = useSession();
   const user = session?.user;
   const isLoadingUser = status === 'loading';

   const [showModal, setShowModal] = useState(false);

   const openModal = () => setShowModal(true);
   const closeModal = () => setShowModal(false);

   let timeout
   const timeoutDuration = 100


   return (
      <>
         <Head>
            <title>Next-Casino | The Modern Casino</title>
            <meta
               name="title"
               content="Play Casino Games for Free | The Modern Casino"
            />
            <link rel="icon" href="/favicon.ico" />
            <meta name="google-site-verification" content="Q8f9yc4NaHFd_VZQ08Qgrf2gTNFZI0v1VubOBhe99FU" />
         </Head>

         <div className="min-h-screen min-w-fit flex flex-col">
            <header className="h-16 w-full shadow-md">
               <div className="h-full object-none mx-auto">
                  <div className="h-full px-4 flex justify-between items-center space-x-4">
                     <Link href="/">
                        <a className="flex items-center space-x-1">
                           <SparklesIcon className="shrink-0 w-8 h-8 text-rose-500" />
                           <span className="text-xl font-semibold tracking-wide">
                              Next<span className="text-rose-600">Casino</span>
                           </span>
                        </a>
                     </Link>

                     {/* display buttons to other pages*/}
                     <div className="flex items-center space-x-2">
                        <Link href="/cee-lo">
                           <a className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
                              <Image
                                 // className="shrink-0 w-8 h-8 text-rose-500"
                                 src={DiceIcon2}
                                 width={40}
                                 height={40}
                                 alt="DiceIcon2"
                              />
                              <span className="text-xl font-semibold tracking-wide">
                                 Cee-Lo
                              </span>
                           </a>
                        </Link>

                        <Link href="/poker">
                           <a className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
                              {/* <PuzzleIcon className="shrink-0 w-8 h-8 text-rose-500" /> */}
                              <Image
                                 className="shrink-0 w-8 h-8 text-rose-500"
                                 src={PokerIcon2}
                                 width={40}
                                 height={40}
                                 alt="PokerIcon2"
                              />
                              <span className="text-xl font-semibold tracking-wide">
                                 Poker
                              </span>
                           </a>
                        </Link>

                        <Link href="/ultimate-tictactoe">
                           <a className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
                              {/* <PuzzleIcon className="shrink-0 w-8 h-8 text-rose-500" /> */}
                              <BeakerIcon className="shrink-0 w-8 h-8 text-rose-500" />

                              <span className="text-xl font-semibold tracking-wide">
                                 PlayGround
                              </span>
                           </a>
                        </Link>

                        <Link href="/tictactoe">
                           <a className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
                              {/* <PuzzleIcon className="shrink-0 w-8 h-8 text-rose-500" /> */}
                              <PuzzleIcon className="shrink-0 w-8 h-8 text-rose-500" />

                              <span className="text-xl font-semibold tracking-wide">
                                 Tic Tac Toe
                              </span>
                           </a>
                        </Link>

                        <Link href="/stats">
                           <a className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
                              <UserIcon className="shrink-0 w-8 h-8 text-rose-500" />
                              <span className="text-xl font-semibold tracking-wide">
                                 Stats
                              </span>
                           </a>
                        </Link>

                        <Link href="/rules">
                           <a className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
                              <InformationCircleIcon className="shrink-0 w-8 h-8 text-rose-500" />
                              <span className="text-xl font-semibold tracking-wide">
                                 Rules
                              </span>
                           </a>
                        </Link>

                        <Link href="/faq">
                           <a className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
                              <QuestionMarkCircleIcon className="shrink-0 w-8 h-8 text-rose-500" />
                              <span className="text-xl font-semibold tracking-wide">
                                 FAQ
                              </span>
                           </a>
                        </Link>

                        <Link href="/about">
                           <a className="flex items-center space-x-1 rounded-md hover:bg-rose-100 transition px-3">
                              <SparklesIcon className="shrink-0 w-8 h-8 text-rose-500" />
                              <span className="text-xl font-semibold tracking-wide">
                                 About
                              </span>
                           </a>
                        </Link>
                     </div>
                     {/* display buttons to other pages*/}

                     <div className="flex items-center space-x-4">
                        <button
                           onClick={() => {
                              session?.user ? router.push('/stats') : openModal();
                           }}
                           className="hidden sm:block hover:bg-gray-200 transition px-3 py-1 rounded-md"
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
                  </div>
               </div>
            </header>

            <main className="flex-grow container mx-auto max-w-full max-h-screen">
               <div className="mx-1 mt-2">
                  {typeof children === 'function' ? children(openModal) : children}
               </div>
            </main>

            <AuthModal show={showModal} onClose={closeModal} />
         </div>
      </>
   );
};

Layout.propTypes = {
   children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Layout;
