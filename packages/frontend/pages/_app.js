import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { SessionProvider as AuthProvider } from 'next-auth/react';
import { useDetectAdBlock } from "adblock-detect-react";
// import { AdBlockDetectedWrapper } from "adblock-detect-react";
import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import Script from "next/script";
import { ChakraProvider } from '@chakra-ui/react'




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


{/* <Script
  async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4743953812411324"
  crossorigin="anonymous" /> */}

//   <Script
//   id="Adsense-id"
//   data-ad-client="ca-pub-4743953812411324"
//   async="true"
//   strategy="afterInteractive"
//   onError={(e) => { console.error('Script failed to load', e) }}
//   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
// />

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <>

      <AuthProvider session={session}>

        <Script id="Adsense-id" data-ad-client="ca-pub-4743953812411324"
          async strategy="afterInteractive"
          onError={(e) => { console.error('Script failed to load', e) }}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
        {SomeFunctionalComponent()}
      </AuthProvider>

      <Toaster />
    </>
  );
}

export default MyApp;