import { AuthProvider } from '../context/authContext';
import React from 'react';
import { AppProps } from 'next/app';
import Script from "next/script";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;