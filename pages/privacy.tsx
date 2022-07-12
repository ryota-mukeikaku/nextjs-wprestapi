import { NextPage } from 'next'
import React from 'react'
import Meta from '@/components/Meta'
import SVGSprite from '@/components/util/SVGSprite'
import Link from 'next/link'
import LowerPageLayout from '@/layouts/LowerPageLayout'
import PageHeader from '@/components/PageHeader'
import Breadcrumbs from '@/components/parts/Breadcrumbs'

const Page: NextPage = () => {
    const meta = {
        title: "プライバシーポリシー｜おいしい和食のはなし。",
        description: "本ウェブサイトの運営委託会社である、株式会社パソナ農援隊のプライバシーポリシーに準じて運営しております。",
        ogImage: process.env.NEXT_PUBLIC_URL + "images/ogp.png",
        ogType: "website",
        siteName: "おいしい和食のはなし。｜農林水産省",
        twitter: "@washoku_maff"
    }
    return (
        <>
            <Meta {...meta} />
            <PageHeader jp="プライバシーポリシー" en="Privacy Policy" />
            <LowerPageLayout>
                <section className='post_content'>
                    <p>本ウェブサイトの運営委託会社である、株式会社パソナ農援隊のプライバシーポリシーに準じて運営しております。詳細は以下をご確認ください。</p>
                    <Link href="https://pasona-nouentai.co.jp/privacy/">
                        <a target="_blank" rel="noopener noreferrer" className='flex items-center gap-12 @PC:gap-16 mt-40'>
                            <div className='underline'>プライバシーポリシー</div>
                            <div className='w-11 h-11 @PC:w-14 @PC:h-14'>
                                <SVGSprite name="icon-blank" />
                            </div>
                        </a>
                    </Link>
                </section>
            </LowerPageLayout>
            <Breadcrumbs breadcrumbs={[
                {
                    title: "HOME",
                    url: "/"
                },
                {
                    title: "プライバシーポリシー",
                    url: "/privacy/"
                }
            ]} />
        </>
    )
}

export default Page
