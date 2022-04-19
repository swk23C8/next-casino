import Head from 'next/head';
import Layout from '@/components/Layout';
import Round from '@/components/Game2/Round/RoundNew';

import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { useState } from 'react';


export async function getServerSideProps(context) {
  const session = await getSession(context);
  const redirect = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };

  // Check if the user is authenticated
  if (!session) {
    return redirect;
  }

  // Retrieve the authenticated user
  const stats = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  // Pass the data to the Stats page
  return {
    props: {
      stats: JSON.parse(JSON.stringify(stats)),
    },
  };
}

const Game = ({ stats = [] }) => {
  const [userStats, setUserStats] = useState(stats);

  return (
    <Layout>
      <Head>
        <title>Cee-Lo | Game</title>
        <meta name="description" content="Game page" />
      </Head>
      <Round stats={userStats} />
    </Layout>
  );
};

export default Game;
