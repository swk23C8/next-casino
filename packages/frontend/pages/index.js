import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';
import { useState, useEffect } from 'react';



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

   // get output from localhost:5000/api
   // get output from localhost:5000/activity
   const [activity, setActivity] = useState('');
   // useEffect(() => {
   //    fetch('https://www.boredapi.com/api/activity')
   //       .then(res => res.json())
   //       .then(json => setActivity(json.activity))
   //       .catch(function (err) {
   //          console.log(err);
   //       })
   // }, []);
   useEffect(() => {
      fetch('https://swk23c8.herokuapp.com/api')
         .then(res => res.json())
         .then(json => setActivity(json.message))
         .catch(function (err) {
            console.log(err);
         })
   }, []);
   // useEffect(() => {
   //    fetch('http://localhost:5000/api')
   //       .then(res => res.json())
   //       .then(json => setActivity(json.message))
   //       .catch(function (err) {
   //          console.log(err);
   //       })
   // }, []);

   return (
      <Layout>
         <h1 className="text-xl font-medium text-gray-800">
            Top Players
         </h1>
         <p className="text-gray-500">
            Explore some of the best players in the world
         </p>
         <p>{activity}</p>
         <div className="mt-8">
            {/* <Grid homes={homes} /> */}
            <Grid stats={stats} />
         </div>
      </Layout>
   );
}
