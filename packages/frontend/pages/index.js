import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';



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
      <Layout>
         <h1 className="text-xl font-medium text-gray-800">
            Top Players
         </h1>
         <p className="text-gray-500">
            Explore some of the best players in the world
         </p>
         <div className="mt-8">
            {/* <Grid homes={homes} /> */}
            <Grid stats={stats} />
         </div>
      </Layout>
   );
}
