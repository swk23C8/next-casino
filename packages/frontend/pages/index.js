import Layout from '@/components/Layout';
import Layout2 from '@/components/Layout2';
import Layout3 from '@/components/Layout3';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';
import { useState, useEffect } from 'react';
import * as api from '../pages/api/testBackend';
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
import Shrek from 'public/images/feltCute.png';
import Image from 'next/image'

export async function getServerSideProps() {
   // Get current user's stats in order of number of tokens
   const stats = await prisma.user.findMany({
      orderBy: {
         gameTokens: 'desc',
      },
   });
   // Pass the data to the Home page
   return {
      props: {
         stats: JSON.parse(JSON.stringify(stats)),
      },
   };
}

export default function Home({ stats = [] }) {

   return (
      // <Layout>
      <>
         <Layout3 />
         <div className="mx-[1vw]">
            {/* landing page */}
            {/* <h1 className="text-center text-2xl text-gray-800 font-bold mb-4">
               Welcome to the home page
            </h1> */}

            <div className="flex justify-center items-center space-x-2">
               {/* <h1 className="text-[5vw] text-gray-800 font-semibold"> */}
               <h1 className="text-[3vh] text-gray-800 font-semibold">
                  <span> Welcome to</span>
               </h1>
               {/* <SparklesIcon className="shrink-0 w-10 h-10 text-rose-500" /> */}
               {/* <span className="text-[5vw] font-bold tracking-wide"> */}
               <span className="text-[3vh] font-bold tracking-wide">
                  Gratis<span className="text-rose-600">Games</span>
               </span>
            </div>

            <h2 className="
               text-center
               text-[1.8vh]
               text-gray-800
               font-bold
               mb-4"
            >
               Please register to play for free or browse as a guest!
            </h2>
            <div className="flex justify-center items-center space-x-1">
               <Image src={Shrek} alt="Shrek" height={'400vw'} width={'400vw'} />
            </div>

            <h1 className="text-xl font-medium text-gray-800">
               Top Players
            </h1>
            <p className="text-gray-500">
               Explore some of the best players in the world
            </p>
            {/* <p>{test}</p> */}
            <div className="mt-8">
               {/* <Grid homes={homes} /> */}
               <Grid stats={stats} />
            </div>
            {/* </Layout> */}
         </div>
      </>
   );
}
