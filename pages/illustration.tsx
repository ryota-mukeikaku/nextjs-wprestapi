import { NextPage } from 'next'
import React from 'react'
import Meta from '@/components/Meta'
import SVGSprite from '@/components/util/SVGSprite'
import Link from 'next/link'
import LowerPageLayout from '@/layouts/LowerPageLayout'
import PageHeader from '@/components/PageHeader'
import Picture from '@/components/util/Picture'
import Button from '@/components/parts/Button'
import Breadcrumbs from '@/components/parts/Breadcrumbs'

const Page: NextPage = () => {
    const meta = {
        title: "イラストアーカイブス｜おいしい和食のはなし。",
        description: "給食だよりや授業などで自由にご使用いただける、和食文化にまつわるイラスト素材をご用意しています。",
        ogImage: process.env.NEXT_PUBLIC_URL + "images/ogp.png",
        ogType: "website",
        siteName: "おいしい和食のはなし。｜農林水産省",
        twitter: "@washoku_maff"
    }
    let icon = []
    for (let i = 1; i <= 23; i++) {
        icon.push('illust_' + ((i < 10) ? '0' : '') + i.toString() + '.png')
    }
    return (
        <>
            <Meta {...meta} />
            <PageHeader jp="イラストアーカイブス" en="Illust Archives" />
            <div className='px-0 py-40 @PC:px-140 @PC:py-85 layout-medium bg-white mt-38 @PC:mt-86 rounded-30 @PC:rounded-60'>
                <section>
                    <div className='grid grid-cols-2 @PC:grid-cols-3 gap-x-24 gap-y-60 @PC:gap-x-64 @PC:gap-y-80'>
                        {icon.map(el => {
                            console.log(el)
                            return (
                                <div key={el}>
                                    <Picture name={el} className="aspect-square" isContainCenter={true} />
                                    <Button className='mt-16 @PC:mt-32' isBlank={true} download={true} icon={{ name: 'icon-download', className: 'w-15 h-11 ' }} href={`/images/${el}`} text="画像を保存する" />
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
            <Breadcrumbs breadcrumbs={[
                {
                    title: "HOME",
                    url: "/"
                },
                {
                    title: "イラストアーカイブス",
                    url: "/illustration/"
                }
            ]} />
        </>
    )
}

export default Page
