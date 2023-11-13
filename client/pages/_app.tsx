import { AuthProvider } from '../context/authContext';
import React from 'react';
import { AppProps } from 'next/app';
import Script from "next/script";
import { GoogleAnalytics } from "nextjs-google-analytics";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GoogleAnalytics gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;