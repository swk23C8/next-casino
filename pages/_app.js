import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { SessionProvider as AuthProvider } from 'next-auth/react';
import { useDetectAdBlock } from "adblock-detect-react";
import { AdBlockDetectedWrapper } from "adblock-detect-react";
import React from "react";
import { useRouter } from 'next/router'


const SomeFunctionalComponent = () => {
  const adBlockDetected = useDetectAdBlock();
  const router = useRouter()
  React.useEffect(() => {
    if (adBlockDetected) {
      // window.alert("Adblocker detected!\nPlease consider reader this notice.\nWe don't display any intrusive advertisements, thanks!");
      if (router.asPath !== '/blocked') {
        router.push('/blocked')
      }
      // console.log(router)
    }
  }, [adBlockDetected, router]);

  // return (
  //   // <div className="min-w-full min-h-full">
  //   //   {adBlockDetected && "Hello Ad Blocked Page"}
  //   // </div>
  // );
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