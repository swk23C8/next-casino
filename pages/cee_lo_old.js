import Head from 'next/head';
import Layout from '@/components/Layout';
import Round from '@/components/Game2/Round/Round';

const Game = () => {
  return (
    <Layout>
      <Head>
        <title>Cee-Lo | Game</title>
        <meta name="description" content="Game page" />
      </Head>
      <Round />
    </Layout>
  );
};

export default Game;
