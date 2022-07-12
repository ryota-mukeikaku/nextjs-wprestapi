import type { AppProps } from 'next/app'

import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import Head from 'next/head'
import * as gtag from '../libs/GTM'
import Layout from '@/layouts/Layout'
import '@/styles/global.scss'
import '@/styles/layout.scss'
import '@/styles/post_content.scss'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Steam from '@/components/Steam'

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const routeChangeStart = (url: string) => {
            if (url !== router.pathname && url !== router.pathname + '/') {
                //
            }
        }

        const handleRouteChange = (url: string) => {
            gtag.pageview(url)
        }

        router.events.on('routeChangeStart', routeChangeStart)
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', routeChangeStart)
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])
    return (
        <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                strategy='afterInteractive'
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GTM_ID}`}
            />
            <Script
                id='gtag-init'
                strategy='afterInteractive'
                dangerouslySetInnerHTML={{
                    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gtag.GTM_ID}', {
        page_path: window.location.pathname,
      });
    `
                }}
            />
            <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_PUBLIC_KEY}>
                {!loaded && (
                    <Steam setLoaded={setLoaded} />
                )}
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </GoogleReCaptchaProvider>
        </>
    )
}

export default MyApp
