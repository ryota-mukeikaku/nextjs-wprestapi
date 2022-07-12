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
import Youtube from '@/components/parts/Youtube'
import EducationPrintItem from '@/components/parts/EducationPrintItem'
import EducationReportItem from '@/components/parts/EducationReportItem'
import EducationGoodsItem from '@/components/parts/EducationGoodsItem'
import Breadcrumbs from '@/components/parts/Breadcrumbs'

const Page: NextPage = () => {
    const meta = {
        title: "児童向け教材「わたしたちと”和食”」｜おいしい和食のはなし。",
        description: "農林水産省では、「和食文化継承リーダー」や教育現場で活躍している方に活用していただくため、和食文化の全体像を分かりやすく教育現場で伝えていただくための継承ツールとして、小学生を対象とした様々な教材を制作しています。",
        ogImage: process.env.NEXT_PUBLIC_URL + "images/ogp.png",
        ogType: "website",
        siteName: "おいしい和食のはなし。｜農林水産省",
        twitter: "@washoku_maff"
    }
    return (
        <>
            <Meta {...meta} />
            <PageHeader jp="児童用教材のご紹介" en="Education" />
            <div className='pointer-events-none absolute top-163 @PC:top-140 @PC:left-0 w-full h-full bg-orange-20 max-w-[100vw] overflow-x-hidden'>
                <div className='h-330 w-482 @PC:h-[144rem] @PC:w-[212rem] absolute -left-32 @PC:-left-52'>
                    <div className='absolute w-321 h-188 @PC:w-900 @PC:h-527 right-0 @PC:right-0'>
                        <div className='special-bg-1 h-full'>
                            <Picture name="education-mv-1.jpg" alt="" isFit={true} className="h-full" />
                        </div>
                    </div>
                    <div className='absolute w-204 h-198 @PC:w-417 @PC:h-404 left-0 top-125 @PC:top-[80.5rem] @PC:left-0'>
                        <div className='special-bg-4 h-full'>
                            <Picture name="education-mv-2.jpg" alt="" isFit={true} className="h-full" />
                        </div>
                    </div>
                    <div className='absolute w-159 h-130 @PC:w-485 @PC:h-398 right-50 bottom-0 @PC:bottom-0 @PC:right-140'>
                        <div className='special-bg-5 h-full'>
                            <Picture name="education-mv-3.jpg" alt="" isFit={true} className="h-full" />
                        </div>
                    </div>
                </div>
            </div>
            <section className='layout-small mt-340 @PC:mt-300'>
                <h2 className='font-bold text-25 leading-37 @PC:text-40'>児童向け教材「わたしたちと“和食”」について</h2>
                <div className='text-15 leading-32 mt-24 @PC:text-20 @PC:leading-50 @PC:mt-40'>
                    農林水産省では、「和食文化継承リーダー」や教育現場で活躍している方に活用していただくため、和食文化の全体像を分かりやすく教育現場で伝えていただくための継承ツールとして、小学生を対象とした児童用と指導者用の教材を制作し、子どもたちが視聴することを想定した動画教材や、印刷してご使用いただけるプリント教材をご用意しました。学校での授業、自由研究、家庭での学習などで、部分的にでもご自由にお使いください。ただし、商用利用は禁止とさせていただきます。
                </div>
                <Button text="和食文化継承リーダー研修ページ" href="/training/" large={true} className="mt-40 @PC:w-602 @PC:mx-auto @PC:mt-80" />
                <Button text="食文化ポータルサイト" href="https://www.maff.go.jp/j/keikaku/syokubunka/" isBlank={true} large={true} className="mt-20 @PC:w-602 @PC:mx-auto @PC:mt-48" />
            </section>
            <section className='mt-80 @PC:mt-180'>
                <CloudH3 text="教材の特長" />
                <div className='layout-small'>
                    <Dotted className='mt-33 @PC:mt-56' isMedium text="導入部分で「自分ごと化」しやすい身近な問いかけを入れ、子どもの関心が高まり、知識が深まるような工夫をしています。" />
                    <Dotted className='mt-20 @PC:mt-24' isMedium text="随所に和食とSDGsを絡めた内容やコラムなどを入れ、SDGsとの関連などを自ら考えるような工夫をしています。" />
                    <Dotted className='mt-20 @PC:mt-24' isMedium text="調べ学習だけでなく、自分のこれからの生活に活かしていくことを目的に、中学年と高学年では、最後のページにワークシートを設けるなどの工夫をしています。" />
                </div>
                <div className='layout-small-youtube'>
                    <Youtube id="eltDu-k3vrM" className='mt-40 @PC:mt-64' />
                </div>
                <div className='layout-small'>
                    <div className='font-bold text-18 mt-24 @PC:text-28 @PC:mt-40'>制作ヒストリー動画</div>
                    <div className='text-15 mt-15 leading-32 @PC:text-20 @PC:mt-28'>教材制作メンバーより教育現場等での活用のポイントをご説明しています。</div>
                </div>
            </section>
            <section className='mt-80 @PC:mt-160'>
                <CloudH3 text="動画教材" />
                <div className='layout-special'>
                    <div className='text-15 mt-33 leading-32 @PC:text-20 @PC:mt-54'>プリント教材（中学年、高学年）の学習の前に導入として、活用していただけます。</div>
                </div>
                <div className='layout-special-youtube mt-40 @PC:mt-48 grid grid-cols-1 @PC:grid-cols-2 gap-x-80 gap-y-60'>
                    <div>
                        <Youtube id="VLD1q_XbyWE" />
                        <div className="font-bold text-17 @PC:text-27 mt-10 @PC:mt-40 text-center">中学年</div>
                    </div>
                    <div>
                        <Youtube id="PkmM-sSiQx0" />
                        <div className="font-bold text-17 @PC:text-27 mt-10 @PC:mt-40 text-center">高学年</div>
                    </div>
                </div>
            </section>
            <section className='mt-80 @PC:mt-120'>
                <CloudH3 text="プリント教材" />
                <div className='layout-special grid grid-cols-1 @PC:grid-cols-3 gap-x-70 gap-y-40 mt-33 @PC:mt-54'>
                    <EducationPrintItem subject='低学年用教材' child="" teacher="" />
                    <EducationPrintItem subject='中学年用教材' child="" teacher="" />
                    <EducationPrintItem subject='高学年用教材' child="" teacher="" />
                </div>
            </section>
            <section className='mt-80 @PC:mt-120'>
                <CloudH3 text="イラストアーカイブス" />
                <div className='layout-special'>
                    <div className='text-15 mt-33 leading-32 @PC:text-20 @PC:mt-54'>給食だよりや授業などで自由にご使用いただけます。</div>
                    <div className='grid grid-cols-1 @PC:grid-cols-2 gap-x-80 gap-y-20 mt-40 @PC:mt-48'>
                        <Button text="和食文化に関係する<br class='@PC:hidden' />イラスト・写真" href="https://www.maff.go.jp/j/keikaku/syokubunka/culture/sozai.html" isBlank={true} large={true} />
                        <Button text="「わたしたちと“和食”」で<br class='@PC:hidden' />使用しているイラスト" href="/illustration/" large={true} />
                    </div>
                    <div className='@SP:hidden mt-80'>
                        <Picture name="education-illust-pc.png" />
                    </div>
                    <div className="@PC:hidden mt-60">
                        <Picture name="education-illust-pc.png" />
                    </div>
                </div>
            </section>
            <section className='mt-80 @PC:mt-120'>
                <CloudH3 text="モデル授業レポート" />
                <div className='layout-special'>
                    <div className='text-15 mt-33 leading-32 @PC:text-20 @PC:mt-54'>児童向け教材「わたしたちと“和食”」を使用したモデル授業を、各学校別にレポートブックなどでご紹介しています。</div>
                </div>
                <div className="mt-40 @PC:mt-80 grid grid-cols-1 gap-80 @PC:gap-160">
                    <EducationReportItem
                        school="鎌倉小学校"
                        report=""
                        parent=""
                        child=""
                        youtube=""
                        caption="モデル授業の様子"
                    />
                    <EducationReportItem
                        school="鎌倉小学校"
                        report=""
                        parent=""
                        child=""
                        youtube=""
                        caption="モデル授業の様子"
                    />
                </div>
            </section>
            <section className='mt-80 @PC:mt-120'>
                <CloudH3 text="グッズや冊子" />
                <div className='layout-special'>
                    <div className='text-15 mt-33 leading-32 @PC:text-20 @PC:mt-54 @PC:leading-50'>各種冊子（子育て世代向け、栄養士保育士向けなど）のほか、「和食すごろく」なども掲載しておりますので、ぜひご活用ください。<br />
                        なお掲載されている各種冊子類については、紙媒体での個別発送などは行っておりませんのでご留意ください。</div>
                    <div className='grid grid-cols-2 @PC:grid-cols-3 gap-x-15 gap-y-60 @PC:gap-x-70 @PC:gap-y-100 mt-40 @PC:mt-64'>
                        <EducationGoodsItem img="education-book-1.png" name="和食ガイドブック" url="" />
                        <EducationGoodsItem img="education-book-2.png" name="子どもと楽しむ和食の時間" url="" />
                        <EducationGoodsItem img="education-book-3.png" name="〜自然への感謝と祈りを込めて家族を結び、未来へとつなげる〜和食" url="" />
                        <EducationGoodsItem img="education-book-4.png" name="和食育" url="" />
                        <EducationGoodsItem img="education-book-5.png" name="おうちで和食" url="" />
                        <EducationGoodsItem img="education-book-6.png" name="四季を楽しむ和食すごろく" url="" />
                    </div>
                </div>
            </section>
            <Breadcrumbs breadcrumbs={[
                {
                    title: "HOME",
                    url: "/"
                },
                {
                    title: "児童用教材のご紹介",
                    url: "/education/"
                }
            ]} />
        </>
    )
}

export default Page
