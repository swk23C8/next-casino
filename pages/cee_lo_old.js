import Head from 'next/head';
import Layout from '@/components/Layout';
// import Round from '@/components/Cee-Lo/Play/Round';
import Round from '@/components/Cee-Lo/Play/RoundNew';


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
