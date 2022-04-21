import Head from 'next/head'
import { useRouter } from 'next/router'

import type MetaType from '@/types/MetaType'

export default function Meta({
    title = '',
    description = '',
    ogImage = '/public/images/ogp.png',
    ogType = 'article',
    siteName = '',
    twitter = ''
}: MetaType) {
    const router = useRouter()

    const url = process.env.NEXT_PUBLIC_URL

    return (
        <Head>
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0'
            />
            <link
                rel='canonical'
                href={url + router.pathname.replace(/^\//, '')}
            />
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta
                property='og:url'
                content={url + router.pathname.replace(/^\//, '')}
            />
            <meta property='og:type' content={ogType} />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            <meta property='og:site_name' content={siteName} />
            <meta property='og:image' content={ogImage} />
            <meta property='og:locale' content='ja_JP' />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={description} />
            <meta name='twitter:image' content={ogImage} />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content={twitter} />
            <link
                rel='icon'
                type='image/png'
                href={require('/public/images/favicon.png')}
            />
            <link
                rel='apple-touch-icon-precomposed'
                type='image/png'
                href={require('/public/images/apple-touch-icon-precomposed.png')}
            />
        </Head>
    )
}
