import type { AppProps } from 'next/app'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import Head from 'next/head'
import * as gtag from '../libs/GTM'
import Layout from '@/layouts/Layout'
import '@/styles/global.scss'
import '@/styles/layout.scss'
import '@/styles/post_content.scss'
import PageTransition from '@/components/PageTransition'

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const [pageTransitioning, setPageTransitioning] = useState(false)

    useEffect(() => {
        const routeChangeStart = (url: string) => {
            if (url !== router.pathname) {
                setPageTransitioning(true)
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
            {pageTransitioning && (
                <PageTransition setPageTransitioning={setPageTransitioning} />
            )}
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}

export default MyApp
