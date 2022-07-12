import { NextPage } from 'next'
import React from 'react'
import Meta from '@/components/Meta'
import SVGSprite from '@/components/util/SVGSprite'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import Picture from '@/components/util/Picture'
import Button from '@/components/parts/Button'
import CloudH3 from '@/components/parts/CloudH3'
import Teacher from '@/components/parts/Teacher'
import Dotted from '@/components/parts/Dotted'
import TrainingFlow from '@/components/TrainingFlow'
import Breadcrumbs from '@/components/parts/Breadcrumbs'

const Page: NextPage = () => {
    const meta = {
        title: "和食文化継承リーダー研修｜おいしい和食のはなし。",
        description: "この研修は、国の事業として、子どもたちや子育て世代に対して、和食文化を伝える人材を全国に育成するために実施するものです。",
        ogImage: process.env.NEXT_PUBLIC_URL + "images/ogp.png",
        ogType: "website",
        siteName: "おいしい和食のはなし。｜農林水産省",
        twitter: "@washoku_maff"
    }
    return (
        <>
            <Meta {...meta} />
            <PageHeader jp="和食文化継承リーダー研修" en="Leadership training" />
            <div className='pointer-events-none absolute top-163 @PC:top-140 @PC:left-0 w-full h-full bg-orange-20 max-w-[100vw] overflow-x-hidden'>
                <div className='h-330 w-460 @PC:h-[151rem] @PC:w-[210rem] absolute -left-15 @PC:-left-52'>
                    <div className='absolute w-321 h-188 @PC:w-900 @PC:h-527 right-0 @PC:right-0'>
                        <div className='special-bg-1 h-full'>
                            <Picture name="training-mv-1.jpg" alt="" isFit={true} className="h-full" />
                        </div>
                    </div>
                    <div className='absolute w-176 h-165 @PC:w-485 @PC:h-406 left-0 top-125 @PC:top-[80.5rem] @PC:left-0'>
                        <div className='special-bg-2 h-full'>
                            <Picture name="training-mv-2.jpg" alt="" isFit={true} className="h-full" />
                        </div>
                    </div>
                    <div className='absolute w-183 h-132 @PC:w-598 @PC:h-457 right-50 bottom-0 @PC:bottom-0 @PC:right-140'>
                        <div className='special-bg-3 h-full'>
                            <Picture name="training-mv-3.jpg" alt="" isFit={true} className="h-full" />
                        </div>
                    </div>
                </div>
            </div>
            <section className='layout-small mt-340 @PC:mt-300'>
                <h2 className='font-bold text-25 leading-37 @PC:text-40'>和食文化継承リーダー研修について</h2>
                <div className='text-15 leading-32 mt-24 @PC:text-20 @PC:leading-50 @PC:mt-40'>
                    この研修は、国の事業として、子どもたちや子育て世代に対して、和食文化を伝える人材を全国に育成するために実施しています。受講者は、基礎研修・実践研修・実地研修の各プログラムを受講いただき、全ての課程を修了した受講生に対して、「和食文化継承リーダー」として認定証を発行しています。<br />
                    認定後は、様々な活躍の場で和食文化の継承に力を発揮していただけます。
                </div>
                <Button text="チラシはこちら" href="/" large={true} isPdf={true} className="mt-40 @PC:w-602 @PC:mx-auto @PC:mt-80" />
                <Button text="お申し込みフォーム" href="/training/application/" large={true} className="mt-20 @PC:w-602 @PC:mx-auto @PC:mt-48" />
            </section>
            <section className='mt-80 @PC:mt-180'>
                <CloudH3 text="研修の流れ" />
                <div className='layout-special'>
                    <div className='text-15 @PC:text-20 mt-32 @PC:mt-56'>基礎研修、実践研修、実地研修の3ステップを経て、和食文化継承リーダーに認定されます。研修用テキストはこちらからダウンロードできます。</div>
                    <Button text="基礎研修用教材" href="/" large={true} isPdf={true} className="mt-32 @PC:w-602 @PC:mx-auto @PC:mt-24" />
                    <div>
                        <TrainingFlow className='' />
                    </div>
                    <Button text="受講にあたってのよくある質問" href="/faq/" large={true} className="mt-40 @PC:w-602 @PC:mx-auto @PC:mt-64" />
                </div>
            </section>
            <section className='mt-80 @PC:mt-160'>
                <CloudH3 text="認定後の活動サポート" />
                <div className='mt-32 @PC:mt-28 layout-special'>
                    <h4>
                        <Dotted text="和食文化継承リーダー限定イベントへの参加（参加料は無料です。）" />
                    </h4>
                    <div className='mt-20 @PC:mt-24 ml-26 @PC:ml-36'>
                        このイベントでは、リーダー間の交流だけでなく、ご自身のスキルアップや新たな気づきを得ることもできるイベント内容になっています。また、毎回多彩なゲストも参加します。
                    </div>
                    <h4 className='mt-40 @PC:mt-64'>
                        <Dotted text="活動の情報サポート" />
                    </h4>
                    <div className='mt-20 @PC:mt-24 ml-26 @PC:ml-36'>
                        月に2〜3回程度、給食だよりなどで使える情報、スキルアップに関する情報などをメールなどでお知らせします。
                    </div>
                    <h4 className='mt-40 @PC:mt-64'>
                        <Dotted text="活動の場のサポート" />
                    </h4>
                    <div className='mt-20 @PC:mt-24 ml-26 @PC:ml-36'>
                        ご自身のフィールド以外での活動を希望される方限定で、講演、取材、企業との連携などのマッチング情報をお伝えさせていただきます。
                    </div>
                </div>
            </section>
            <section className='mt-80 @PC:mt-120'>
                <CloudH3 text="講師紹介" />
                <div className='mt-32 @PC:mt-28 layout-special grid grid-cols-1 @PC:grid-cols-3 gap-y-74 gap-x-70'>
                    <Teacher
                        h4="基礎研修"
                        num="1"
                        position="東洋大学食環境科学部食環境科学科"
                        name="露久保美夏"
                        honorific="准教授"
                        en="Mika Rokubo"
                        profile={[
                            "専門分野　調理科学，食文化",
                            "一般社団法人和食文化国民会議調査・研究部会幹事",
                            "一般社団法人日本家政学会食文化研究部会委員"
                        ]}
                    />
                    <Teacher
                        h4="実践研修"
                        num="2"
                        position="武庫川女子大学 幼児教育学科"
                        name="藤本 勇二"
                        honorific="准教授"
                        en="Yuji Fujimoto"
                        profile={[
                            "研究分野生活科教育/初等理科教育ESD",
                            "文部科学省食の指導の手引き作成委員",
                            "今後の学校における食育の在り方に関する有識者会議委員",
                            "文部科学省環境教育指導資料作成委員",
                            "文化庁伝統文化親子教室事業に係る協力者会議委員"
                        ]}
                    />
                    <Teacher
                        h4="実践研修"
                        num="3"
                        position="妙高市立妙高小学校　教諭"
                        name="舘岡 真一"
                        honorific="氏"
                        en="Shinichi Tateoka"
                        profile={[
                            "新潟県佐渡市出身",
                            "『米の栽培と豚の飼育』『上越の御馳走』『妙高で受け継がれてきた味』など地域素材を生かし、教科と総合学習の関連を図った単元開発に取り組んでいる。身近にある“当たり 前”を見つめ直し、その価値に気付いていける子どもの育成を目指す。"
                        ]}
                    />
                </div>
            </section>
            <Breadcrumbs breadcrumbs={[
                {
                    title: "HOME",
                    url: "/"
                },
                {
                    title: "和食文化継承リーダー研修",
                    url: "/training/"
                }
            ]} />
        </>
    )
}

export default Page
