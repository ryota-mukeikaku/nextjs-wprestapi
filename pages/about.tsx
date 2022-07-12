import { GetStaticProps, NextPage } from 'next'
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
import PicturePCSP from '@/components/util/PicturePCSP'
import Breadcrumbs from '@/components/parts/Breadcrumbs'

const Page: NextPage = () => {
    const meta = {
        title: "サイトのはなし｜おいしい和食のはなし。",
        description: "“おいしい和食のはなし”は、当たり前のようで実は奥深い、そんな日本の和食文化に触れながら、親子で「食べる力」を育んでいただけるよう、 お子さんをお持ちのご家庭を中心に、「日本の食文化」や「子育て」に関する情報を発信していく農林水産省の特設サイトです。",
        ogImage: process.env.NEXT_PUBLIC_URL + "images/ogp.png",
        ogType: "website",
        siteName: "おいしい和食のはなし。｜農林水産省",
        twitter: "@washoku_maff"
    }
    return (
        <>
            <Meta {...meta} />
            <div className='@SP:hidden about-bg-pc mt-184'>
                <Picture name="about-bg-pc.jpg" alt="サイトのはなし" />
            </div>
            <div className='@PC:hidden about-bg-sp mt-102'>
                <Picture name="about-bg-sp.jpg" alt="サイトのはなし" />
            </div>
            <header className='layout-small mt-42 @PC:mt-83'>
                <h1 className='font-bold text-25 leading-37 @PC:text-40'>サイトのはなし</h1>
                <div className='text-15 leading-32 mt-24 @PC:text-20 @PC:leading-50 @PC:mt-40'>
                    農林水産省では、「和食文化継承リーダー」や教育現場で活躍している方に活用していただくため、和食文化の全体像を分かりやすく教育現場で伝えていただくための継承ツールとして、小学生を対象とした児童用と指導者用の教材を制作し、子どもたちが視聴することを想定した動画教材や、印刷してご使用いただけるプリント教材をご用意しました。学校での授業、自由研究、家庭での学習などで、部分的にでもご自由にお使いください。ただし、商用利用は禁止とさせていただきます。
                </div>
            </header>
            <section className='mt-80 @PC:mt-118'>
                <CloudH3 text="和食って面白い！" />
                <div className='layout-small text-15 leading-32 mt-24 @PC:text-20 @PC:leading-50 @PC:mt-40'>
                    2013年12月。和食はひとつの文化として、ユネスコから「無形文化遺産」に登録されました。それは世界中から、未来に残すべき大切な文化として認められたということ。実は、和食は料理や味といった「食」の側面だけではありません。日本ならではの四季折々のバラエティ豊かな食材や、おせち料理や一汁三菜など古くから受け継がれてきた食の伝統、「もったいない精神」からなるエコでサスティナブルな考え方など、それら全てが和食を形づくっています。和食をひと言でまとめるのは難しいですが、まずは無形文化遺産の登録理由である4つの特徴をご紹介します。あなたも、未来のためにちょっとだけ和食を語れるようになってみませんか。
                </div>
            </section>
            <section className='layout-special-youtube mt-60 @PC:mt-120'>
                <div className='relative'>
                    <div className='aspect-[1280/796] rounded-50 @PC:rounded-[12rem] overflow-hidden relative z-10'>
                        <PicturePCSP namePC='about1-pc.jpg' nameSP='about1-sp.jpg' alt="" />
                    </div>
                    <div className='absolute z-20 w-135 h-203 @PC:w-376 @PC:h-554 top-38 -left-43 @PC:top-345 @PC:-left-127'>
                        <SVGSprite name="about-sec-bg1-sp" className='@PC:hidden' />
                        <SVGSprite name="about-sec-bg1-pc" className='@SP:hidden' />
                    </div>
                    <div className='about-text z-30 top-84 text-17 tracking-22 @PC:tracking-16 @PC:text-38 absolute @PC:top-447 flex flex-col-reverse -translate-x-5 @PC:-translate-x-15'>
                        <div className='h-max'>
                            多様で新鮮な食材と
                        </div>
                        <div className='h-max mt-30 @PC:mt-60'>
                            その持ち味の尊重
                        </div>
                    </div>
                </div>
                <div className='relative z-30 w-240 ml-auto mr-0 @PC:w-[92rem] @PC:ml-214 text-15 leading-32 mt-38 @PC:text-20 @PC:leading-50 @PC:mt-80'>
                    それぞれの地域で四季折々の旬の食材を用いることに加え、素材本来の味わいを活かす調理技術や道具が発達しています。
                </div>
            </section>
            <section className='layout-special-youtube mt-77 @PC:mt-160 overflow-x-hidden'>
                <div className='relative'>
                    <div className='aspect-[1280/796] rounded-50 @PC:rounded-[12rem] overflow-hidden relative z-10'>
                        <PicturePCSP namePC='about2-pc.jpg' nameSP='about2-sp.jpg' alt="" />
                    </div>
                    <div className='absolute z-20 w-135 h-203 @PC:w-365 @PC:h-549 top-42 -right-60 @PC:top-396 @PC:-right-115'>
                        <SVGSprite name="about-sec-bg2-sp" className='@PC:hidden' />
                        <SVGSprite name="about-sec-bg2-pc" className='@SP:hidden' />
                    </div>
                    <div className='about-text right-0 z-30 top-84 text-17 tracking-22 @PC:tracking-16 @PC:text-38 absolute @PC:top-467 flex flex-col-reverse translate-x-5 @PC:translate-x-15'>
                        <div className='h-max'>
                            健康的な食生活を
                        </div>
                        <div className='h-max mt-34 @PC:mt-65'>
                            支える栄養バランス
                        </div>
                    </div>
                </div>
                <div className='relative z-30 w-240 @PC:w-[92rem] @PC:ml-140 text-15 leading-32 mt-38 @PC:text-20 @PC:leading-50 @PC:mt-80'>
                    それぞれの地域で四季折々の旬の食材を用いることに加え、素材本来の味わいを活かす調理技術や道具が発達しています。
                </div>
            </section>
            <section className='layout-special-youtube mt-77 @PC:mt-160 overflow-x-hidden'>
                <div className='relative'>
                    <div className='aspect-[1280/796] rounded-50 @PC:rounded-[12rem] overflow-hidden relative z-10'>
                        <PicturePCSP namePC='about3-pc.jpg' nameSP='about3-sp.jpg' alt="" />
                    </div>
                    <div className='absolute z-20 w-153 h-210 @PC:w-455 @PC:h-643 top-82 -left-67 @PC:top-284 @PC:-left-189'>
                        <SVGSprite name="about-sec-bg3-sp" className='@PC:hidden' />
                        <SVGSprite name="about-sec-bg3-pc" className='@SP:hidden' />
                    </div>
                    <div className='about-text z-30 top-108 text-17 tracking-22 @PC:tracking-16 @PC:text-38 absolute @PC:top-398 flex flex-col-reverse -translate-x-5 @PC:-translate-x-15'>
                        <div className='h-max'>
                            自然の美しさや
                        </div>
                        <div className='h-max mt-20 @PC:mt-40'>
                            季節の移ろいの表現
                        </div>
                    </div>
                </div>
                <div className='relative z-30 w-240 ml-auto mr-0 @PC:w-[92rem] @PC:ml-214 text-15 leading-32 mt-38 @PC:text-20 @PC:leading-50 @PC:mt-80'>
                    それぞれの地域で四季折々の旬の食材を用いることに加え、素材本来の味わいを活かす調理技術や道具が発達しています。
                </div>
            </section>
            <section className='layout-special-youtube mt-77 @PC:mt-160'>
                <div className='relative overflow-hidden'>
                    <div className='aspect-[1280/796] rounded-50 @PC:rounded-[12rem] overflow-hidden relative z-10'>
                        <PicturePCSP namePC='about4-pc.jpg' nameSP='about4-sp.jpg' alt="" />
                    </div>
                    <div className='absolute z-20 w-230 h-188 @PC:w-505 @PC:h-462 top-75 -right-115 @PC:top-425 @PC:-right-237'>
                        <SVGSprite name="about-sec-bg4-sp" className='@PC:hidden' />
                        <SVGSprite name="about-sec-bg4-pc" className='@SP:hidden' />
                    </div>
                    <div className='about-text right-5 z-30 top-120 text-17 tracking-22 @PC:tracking-16 @PC:text-38 absolute @PC:top-530 flex flex-col-reverse translate-x-10 @PC:translate-x-40'>
                        <div className='h-max'>
                            正月などの
                        </div>
                        <div className='h-max mt-23 @PC:mt-45'>
                            年中行事との
                        </div>
                        <div className='h-max mt-42 @PC:mt-85'>
                            密接な関わり
                        </div>
                    </div>
                </div>
                <div className='relative z-30 w-240 @PC:w-[92rem] @PC:ml-140 text-15 leading-32 mt-38 @PC:text-20 @PC:leading-50 @PC:mt-80'>
                    それぞれの地域で四季折々の旬の食材を用いることに加え、素材本来の味わいを活かす調理技術や道具が発達しています。
                </div>
            </section>
            <Breadcrumbs breadcrumbs={[
                {
                    title: "HOME",
                    url: "/"
                },
                {
                    title: "サイトのはなし",
                    url: "/about/"
                }
            ]} />
        </>
    )
}

export default Page
