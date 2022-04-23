import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { SessionProvider as AuthProvider } from 'next-auth/react';
import { useDetectAdBlock } from "adblock-detect-react";
import React from "react";


const SomeFunctionalComponent = () => {
  const adBlockDetected = useDetectAdBlock();

  React.useEffect(() => {
    if (adBlockDetected) {
      window.alert("Please disable AdBlock! We need it to work!");
    }
  }, [adBlockDetected]);

  return <div>{adBlockDetected && "Hello Ad Blocked Page"}</div>;
};


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <AuthProvider session={session}>
        <Component {...pageProps} />
        {SomeFunctionalComponent()}
      </AuthProvider>

      <Toaster />
    </>
  );
}

export default MyApp;
