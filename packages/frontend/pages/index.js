import Layout from '@/components/Layout';
import Layout2 from '@/components/Layout2';
import Layout3 from '@/components/Layout3';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';
import { useState, useEffect } from 'react';
import * as api from '../pages/api/testBackend';


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
         {/* landing page */}
         <h1 className="
               text-center
               text-2xl
               text-gray-800
               font-bold
               mb-4"
         >
            Welcome to the home page
         </h1>
         <h2 className="
               text-center
               text-xl
               text-gray-800
               font-bold
               mb-4"
         >
            Please register to play for free or browse as a guest!
         </h2>
         {/* <h2 className="
               text-center
               text-xl
               text-gray-800
               font-bold
               mb-4"
         >
            {stats.map(user => (
               <div key={user.id}>
                  <p>
                     {user.email}
                  </p>
                  <p>
                     {user.gameTokens}
                  </p>
               </div>
            ))}
         </h2> */}


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
      </>
   );
}
