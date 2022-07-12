import { NextPage } from 'next'
import React from 'react'
import Meta from '@/components/Meta'
import ArticleList from '@/components/parts/ArticleList'
import NewsList from '@/components/parts/NewsList'
import Button from '@/components/parts/Button'
import type MetaType from '@/types/MetaType'
import type PostsType from '@/types/PostsType'
import PostType from '@/types/PostType'
import SVGSprite from '@/components/util/SVGSprite'
import Link from 'next/link'
import CloudH2 from '@/components/parts/CloudH2'
import Picture from '@/components/util/Picture'
import Tags from '@/components/parts/Tags'

import { useEffect, useRef, useState } from 'react'
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Props {
    meta: MetaType
    posts: any
    news: PostType[]
    recent: PostsType
    max_page: Number
    more_page: Number
}

const Home: NextPage<Props> = (props) => {
    const { posts, recent, news, more_page, max_page } = props
    const meta = {
        title: "おいしい和食のはなし。｜農林水産省",
        description: "和食は、食べて“美味しい“だけじゃない。実は、エコでヘルシーで、サスティナブルな食文化でもあるのです。今や、ニッポンの和食は世界のWASHOKUとなり、世界中から注目を集めています。そんな様々な“おいしい”が詰まった、「おいしい和食のはなし。」を、どうぞ召し上がれ。",
        ogImage: process.env.NEXT_PUBLIC_URL + "images/ogp.png",
        ogType: "website",
        siteName: "おいしい和食のはなし。｜農林水産省",
        twitter: "@washoku_maff"
    }
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [postList, setPostList] = useState(posts)
    const moreRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (more_page > 1 && page < max_page) {
            const moreTrigger = ScrollTrigger.create({
                trigger: moreRef.current,
                start: `bottom 90%`,
                end: `bottom bottom`,
                onEnter: () => {
                    if (!loading) {
                        moreTrigger.kill();
                        setLoading(true)
                    }
                }
            });
            return () => {
                moreTrigger.kill();
            }
        }
    }, [page]);
    useEffect(() => {
        if (loading) {
            pageFetch()
        }
    }, [loading])

    const pageFetch = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}index/page/${page + 1}`)
        const data = await res.json()
        const more = [...postList, ...data.posts]
        setPostList(more)
        setTimeout(() => {
            setLoading(false)
            setPage(page + 1)
        }, 100)
    }
    return (
        <>
            <Meta {...meta} />
            <section className='relative'>
                <SVGSprite name="logo-index" className='pt-206 pl-92 pr-72 @PC:pt-327 @PC:px-750' />
                <div className='tracking-0 leading-31 @PC:leading-40 text-13 @PC:text-18 pt-43 @PC:pt-80 px-32 @PC:pl-575 @PC:pr-560'>和食は、食べて&quot;美味しい&quot;だけじゃない。実は、エコでヘルシーで、サスティナブルな食文化でもあるのです。今や、ニッポンの和食は世界のWASHOKUとなり、世界中から注目を集めています。そんな様々な“おいしい”が詰まった、「おいしい和食のはなし。」を、どうぞ召し上がれ。</div>
                <div className='@SP:top-710 @SP:left-20 w-170 h-95 @PC:w-412 @PC:h-230 rounded-20 @PC:rounded-[6rem] overflow-hidden absolute @PC:top-235 @PC:right-173'>
                    <Picture name="mv1.jpg" isFit={true} className='w-full h-full relative z-10' />
                </div>
                <div className='@SP:hidden w-242 h-353 rounded-r-[6rem] overflow-hidden absolute top-546 left-0'>
                    <Picture name="mv2.jpg" isFit={true} className='w-full h-full relative z-10' />
                </div>
                <div className='absolute w-165 h-110 @PC:w-439 @PC:h-294 -left-38 top-80 @PC:top-211 @PC:left-132'>
                    <div className='index-mv-bg-1 h-full'>
                        <Picture name="mv3.jpg" alt="" isFit={true} className="h-full" />
                    </div>
                </div>
                <div className='relative w-full overflow-hidden h-109 @PC:h-239 -mt-14 @PC:-mt-110'>
                    <Link href="/about/">
                        <a className='absolute -right-10 @PC:right-141 w-172 h-109 @PC:w-377 @PC:h-239 flex items-center justify-center'>
                            <div className='flex items-center relative z-10'>
                                <div className='w-7 h-7 rounded-half bg-red2' />
                                <div className='font-en text-13 underline @PC:text-16 ml-8 @PC:ml-8'>About</div>
                                <div className='w-8 h-8 @PC:w-13 @PC:h-13 ml-6 @PC:ml-8'>
                                    <SVGSprite name="icon-arrow" />
                                </div>
                            </div>
                            <div className='absolute w-full h-full'>
                                <SVGSprite name="cloud1" />
                            </div>
                        </a>
                    </Link>
                </div>
            </section>
            <section>

            </section>
            {Array.isArray(news) && (
                <section className='mt-123 @PC:-mt-33'>
                    <div className='relative w-290 h-183 -left-90 @PC:w-640 @PC:h-404 @PC:-left-128'>
                        <CloudH2 en="News" jp="お知らせ" pc="@PC:pl-268" sp="pl-117" />
                    </div>
                    <div className='layout-special mt-10 @PC:my-40'>
                        <NewsList
                            posts={news}
                            className=''
                        />
                    </div>
                </section>
            )}
            <section className='mt-100 @PC:mt-144 flex @SP:flex-col gap-y-80 gap-x-160'>
                <Link href="/education/">
                    <a className='flex-1'>
                        <div className='@SP:mr-24 h-182 @PC:h-460 rounded-r-60 @PC:rounded-r-[12rem] overflow-hidden'>
                            <Picture isFit={true} name="index-education.jpg" className='relative z-10' />
                        </div>
                        <div>
                            <h2 className='mt-28 text-25 @PC:mt-56 @PC:font-bold @PC:text-40 tracking-6 text-center'>児童用教材のご紹介</h2>
                            <p className='layout-small mt-16 @PC:mt-40 @PC:text-20 @PC:leading-50'>農林水産省では、和食の魅力を知ってもらうため、子どもたちの発達段階に応じて和食文化が学べる小学生向けの教材等を制作しています。</p>
                        </div>
                        <div className="@PC:hidden mt-22 pb-18 flex items-center gap-12 w-fit mx-auto border-b border-b-black">
                            <div className='text-16 tracking-5'>
                                詳しくみる
                            </div>
                            <div className='w-11 h-11'>
                                <SVGSprite name="icon-arrow" />
                            </div>
                        </div>
                    </a>
                </Link>
                <Link href="/training/">
                    <a className='flex-1'>
                        <div className='@SP:ml-24 flex-1 h-182 @PC:h-460 rounded-l-60 @PC:rounded-l-[12rem] overflow-hidden'>
                            <Picture isFit={true} name="index-training.jpg" className='relative z-10' />
                        </div>
                        <div>
                            <h2 className='mt-28 text-25 @PC:mt-56 @PC:font-bold @PC:text-40 tracking-6 text-center'>児童用教材のご紹介</h2>
                            <p className='layout-small mt-16 @PC:mt-40 @PC:text-20 @PC:leading-50'>農林水産省では、和食の魅力を知ってもらうため、子どもたちの発達段階に応じて和食文化が学べる小学生向けの教材等を制作しています。</p>
                        </div>
                        <div className="@PC:hidden mt-22 pb-18 flex items-center gap-12 w-fit mx-auto border-b border-b-black">
                            <div className='text-16 tracking-5'>
                                詳しくみる
                            </div>
                            <div className='w-11 h-11'>
                                <SVGSprite name="icon-arrow" />
                            </div>
                        </div>
                    </a>
                </Link>
            </section>
            {Array.isArray(recent) && recent.length && (
                <section className='mt-68 @PC:mt-140 w-full overflow-hidden'>
                    <div className='relative w-382 h-242 -left-143 @PC:w-[100rem] @PC:h-565 @PC:-left-128'>
                        <CloudH2 en="Contents" jp="おいしい和食のはなし" pc="@PC:pl-268" sp="pl-168" />
                    </div>

                    <Link href={`/${recent[0].post_type}/${recent[0].id}`}>
                        <a className={`block flex-1 -mt-40 @PC:-mt-128 relative z-10 @PC:flex gap-68`}>
                            <div className='relative @SP:w-[calc(100%-2.5rem)] @PC:w-1030 flex-none'>
                                <Picture
                                    name={recent[0].thumbnail ? recent[0].thumbnail[0] : 'ogp.png'}
                                    width={recent[0].thumbnail ? recent[0].thumbnail[1] : '128'}
                                    height={recent[0].thumbnail ? recent[0].thumbnail[2] : '128'}
                                    className='aspect-thumb rounded-r-60 @PC:rounded-r-[12rem] overflow-hidden'
                                    isExternal={recent[0].thumbnail !== null}
                                    isFit={true}
                                />
                                {recent[0].taxonomies !== null && recent[0].taxonomies.category && (
                                    <div className='absolute -right-34 -bottom-59 @PC:-right-190 @PC:-bottom-146 w-154 h-131 @PC:w-349 @PC:h-297 flex items-center justify-center'>
                                        <Picture
                                            name={recent[0].taxonomies.category[0].slug + '.png'}
                                            width={recent[0].thumbnail ? recent[0].thumbnail[1] : '250'}
                                            height={recent[0].thumbnail ? recent[0].thumbnail[2] : '250'}
                                            className='relative z-10 aspect-square w-95 @PC:w-250'
                                            isFit={true}
                                        />
                                        <div className='absolute top-0 left-0 w-154 h-131 @PC:w-349 @PC:h-297'>
                                            <SVGSprite name="icon-bg" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='@PC:w-740 layout-large @PC:mt-108'>
                                {recent[0].taxonomies !== null && recent[0].taxonomies.tag && (
                                    <Tags tags={recent[0].taxonomies.tag} className="mt-40 @PC:mt-50" />
                                )}
                                <h2 className='font-bold text-24 leading-38 @PC:text-36 @PC:leading-57 mt-16 @PC:mt-19'>{recent[0].title}</h2>
                                <time className='block font-en tracking-10 text-14 @PC:text-18 mt-16 @PC:mt-14'>{recent[0].date}</time>
                            </div>
                            <div className='@PC:hidden flex items-center gap-15 justify-end -mt-24 mr-26'>
                                <div className='font-en'>More</div>
                                <div className='h-57 w-57 rounded-half border border-black flex items-center justify-center'>
                                    <div className='w-11 h-11'>
                                        <SVGSprite name="icon-arrow" />
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Link>
                    {Array.isArray(postList) && postList.length && (
                        <div className='layout-large my-40 @PC:mt-250'>
                            <ArticleList
                                posts={postList}
                                className=''
                            />
                        </div>
                    )}
                    {more_page > 1 && page < max_page && (
                        <div ref={moreRef} className="mx-auto w-85 h-107 mt-80 @PC:mt-120 @PC:w-108 @PC:h-136">
                            <Picture name="loading.gif" />
                        </div>
                    )}
                </section>
            )}
        </>
    )
}

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}index`)
    const data = await res.json()
    return {
        props: {
            ...data
        }
    }
}

export default Home
