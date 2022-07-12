import PostType from '@/types/PostType'
import NewsItem from './NewsItem'
import { useEffect, useState, useRef } from "react";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
    posts: PostType[]
    className?: string
}

const NewsList = (props: Props) => {
    const { posts, className } = props

    const [open, setOpen] = useState(false);
    const moreRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moreGsap = gsap.timeline()
        if (open) {
            moreGsap
                .to(buttonRef.current, {
                    opacity: 0,
                    duration: "0.3",
                    ease: "power3.inOut",
                })
                .to(buttonRef.current, {
                    height: 0,
                    margin: 0,
                    padding: 0,
                    duration: "0.4",
                    ease: "power3.inOut",
                }, 'show')
                .to(moreRef.current, {
                    height: "auto",
                    duration: "0.4",
                    ease: "power3.inOut",
                }, 'show')
                .to(moreRef.current, {
                    opacity: 1,
                    duration: "0.3",
                    ease: "power3.inOut",
                });
        } else {
            moreGsap
                .to(moreRef.current, {
                    opacity: 0,
                    duration: "0.3",
                    ease: "power3.inOut",
                })
                .to(moreRef.current, {
                    height: 0,
                    duration: "0.4",
                    ease: "power3.inOut",
                });

        }
        return () => {
            moreGsap.kill();
        };
    }, [open]);
    return (
        <div>
            {posts && (
                <div className={className ? className : ''}>
                    {posts.map((post, i) => {
                        if (i < 3) {
                            return <NewsItem post={post} key={post.id} />
                        }
                    })}
                </div>
            )}

            {posts && Array.isArray(posts) && posts.length > 3 && (
                <>
                    <div ref={buttonRef} onClick={() => { setOpen(true) }} className='cursor-pointer u-dotted w-fit mx-auto pb-20 text-16 leading-32 @PC:text-20 mt-40 @PC:mt-64'>
                        もっとみる
                    </div>
                    <div ref={moreRef} className='h-0 opacity-0 overflow-hidden'>
                        {posts.map((post, i) => {
                            if (i >= 3) {
                                return <NewsItem post={post} key={post.id} />
                            }
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

export default NewsList
