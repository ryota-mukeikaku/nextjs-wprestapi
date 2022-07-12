import { NextPage } from 'next'
import React from 'react'
import Meta from '@/components/Meta'
import SVGSprite from '@/components/util/SVGSprite'
import Link from 'next/link'
import LowerPageLayout from '@/layouts/LowerPageLayout'
import PageHeader from '@/components/PageHeader'
import { faqData } from '@/manuscripts/faq'
import FaqItem from '@/components/parts/FaqItem'
import Breadcrumbs from '@/components/parts/Breadcrumbs'

const Page: NextPage = () => {
    const meta = {
        title: "受講に当たっての質問｜おいしい和食のはなし。",
        description: "「和食文化継承リーダー研修」の受験に当たってのよくある質問をまとめています。",
        ogImage: process.env.NEXT_PUBLIC_URL + "images/ogp.png",
        ogType: "website",
        siteName: "おいしい和食のはなし。｜農林水産省",
        twitter: "@washoku_maff"
    }
    return (
        <>
            <Meta {...meta} />
            <PageHeader jp="受講に当たっての質問" en="FAQ" />
            <LowerPageLayout>
                <section className='post_content'>
                    <h2>受講に当たっての質問</h2>
                    {faqData.map((el => {
                        return (
                            <div key={el.h3}>
                                <h3>{el.h3}</h3>
                                <div className='mt-20 @PC:mt-40 grid @PC:grid-cols-2 gap-x-70 gap-y-33 @PC:gax-y-40 text-15 leading-64 @PC:text-20 @PC:leading-40'>
                                    {el.qa.map((qa) => {
                                        return (
                                            <FaqItem qa={qa} key={qa.q} />
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }))}
                    <h2>お問い合わせ先(運営事務局)</h2>
                    <p>株式会社パソナ農援隊　担当：中島、木村、小山</p>
                    <div className='font-en text-13 @PC:text-20 leading-32 @PC:leading-40'>
                        <Link href="tel:03-6734-1260">
                            <a className='flex items-center gap-8 @PC:gap-11'>
                                <div className='w-15 h-15 @PC:w-19 @PC:h-19'>
                                    <SVGSprite name="icon-tel" />
                                </div>
                                <div>
                                    03-6734-1260
                                </div>
                            </a>
                        </Link>
                        <Link href="tel:03-6734-1260">
                            <a className='flex items-center gap-8 @PC:gap-11'>
                                <div className='w-15 h-15 @PC:w-19 @PC:h-19'>
                                    <SVGSprite name="icon-email" />
                                </div>
                                <div>
                                    washoku@pasona-nouentai.co.jp
                                </div>
                            </a>
                        </Link>
                    </div>
                </section>
            </LowerPageLayout>
            <Breadcrumbs breadcrumbs={[
                {
                    title: "HOME",
                    url: "/"
                },
                {
                    title: "受講に当たっての質問",
                    url: "/faq/"
                }
            ]} />
        </>
    )
}

export default Page
