import PostPagination from '@/components/parts/PostPagination'
import PostContentType from '@/types/PostContentType'
import PostRelation from './parts/PostRelation'
import Picture from './util/Picture'
import { Link as Scroll } from 'react-scroll'
import Link from 'next/link'
import SVGSprite from './util/SVGSprite'
import Button from './parts/Button'
import CloudH2 from './parts/CloudH2'

import { useRef, useEffect } from 'react'


import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PostContent = (props: PostContentType) => {

    const { post, pagination, relation } = props

    const sideRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let sideST: any = null;
        if (post.post_type == "article") {
            ScrollTrigger.matchMedia({
                "(min-width: 1024px)": () => {
                    sideST = ScrollTrigger.create({
                        trigger: "#postBody",
                        start: `top top`,
                        end: `bottom bottom`,
                        pin: `#sidebar`,
                        // markers: true
                    });
                },
            });
            return () => {
                if (sideST != null) {
                    sideST.kill();
                }
            }
        }
    });

    return (
        <>
            <div className='layout-pageheader flex flex-row-reverse gap-80 mt-32 @PC:mt-67'>
                <div id="postBody" className='flex-1 u-dotted @PC:pb-60'>
                    {post.thumbnail && (
                        <Picture
                            name={post.thumbnail ? post.thumbnail[0] : 'ogp.png'}
                            width={post.thumbnail ? post.thumbnail[1] : '128'}
                            height={post.thumbnail ? post.thumbnail[2] : '128'}
                            className='rounded-50 @PC:rounded-[12rem] overflow-hidden @PC:mb-130'
                            isExternal={true}
                            isFit={true}
                        />
                    )}
                    <div
                        className='post_content mt-40 post_content__body'
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
                <div id="sidebar" ref={sideRef} className='hidden @PC:block w-240 flex-none pt-160'>
                    {post.post_type == "article" && (
                        <>
                            {post.toc && (
                                <aside className='mb-42'>
                                    <div className='flex items-center gap-11'>
                                        <div className='w-7 h-7 rounded-half bg-black' />
                                        <h3 className='font-bold text-16 font-en'>Index</h3>
                                    </div>
                                    <ul className='mt-18'>
                                        {post.toc.map((el) => {
                                            return (
                                                <li key={el.id} className="text-14 leading-28 mb-14 last:mb-0">
                                                    <Scroll to={el.id} offset={-60} smooth={true}>
                                                        <div
                                                            className='cursor-pointer'
                                                            dangerouslySetInnerHTML={{ __html: el.text }}
                                                        />
                                                    </Scroll>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </aside>
                            )}

                            <aside>
                                <div className='flex items-center gap-11'>
                                    <div className='w-7 h-7 rounded-half bg-black' />
                                    <h3 className='font-bold text-16 font-en'>Share</h3>
                                </div>
                                <ul className='mt-18 font-en text-14 leading-28'>
                                    <li className="mb-14 last:mb-0">
                                        <a className='flex items-center gap-10'>
                                            <div className='w-26 h-26'>
                                                <SVGSprite name="icon-share-facebook" />
                                            </div>
                                            <div>
                                                Facebook
                                            </div>
                                        </a>
                                    </li>
                                    <li className="mb-14 last:mb-0">
                                        <a className='flex items-center gap-10'>
                                            <div className='w-26 h-26'>
                                                <SVGSprite name="icon-share-twitter" />
                                            </div>
                                            <div>
                                                Twitter
                                            </div>
                                        </a>
                                    </li>
                                    <li className="mb-14 last:mb-0">
                                        <a className='flex items-center gap-10'>
                                            <div className='w-26 h-26'>
                                                <SVGSprite name="icon-share-line" />
                                            </div>
                                            <div>
                                                LINE
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </aside>
                        </>
                    )}
                </div>
            </div>

            {post.post_type == "article" && (
                <div className='relative overflow-hidden'>
                    <div className='relative w-383 h-242 @PC:w-767 @PC:h-484 -left-103 @PC:-left-128 mt-63 @PC:mt-40 -mb-120 @PC:-mb-200'>
                        <CloudH2 jp='おすすめ記事' en="Recommend" pc="@PC:pl-268" sp="pl-127" />
                    </div>
                    <div className='layout-large'>
                        {Array.isArray(relation) && <PostRelation relation={relation} />}
                        <Button href="/article/" text="コンテンツ一覧へ" large={true} className="mt-60 @PC:mt-160 @PC:w-680 @PC:mx-auto" />
                    </div>
                </div>
            )}
        </>
    )
}

export default PostContent
