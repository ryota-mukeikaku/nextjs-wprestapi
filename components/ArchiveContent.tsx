import ArchivePaginationType from '@/types/ArchivePaginationType'
import PostsType from '@/types/PostsType'
import ArchivePagination from './parts/ArchivePagination'
import ArticleList from './parts/ArticleList'

import { useEffect, useRef, useState } from 'react'
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SVGSprite from './util/SVGSprite'
import Picture from './util/Picture'
gsap.registerPlugin(ScrollTrigger);


type Props = {
    posts: any
    pagination: ArchivePaginationType | null
    isTag: boolean
    slug?: string
}

const ArchiveContent = (props: Props) => {
    const { posts, pagination, isTag, slug = "" } = props
    const max_page = (pagination) ? pagination.numbers[pagination.numbers.length - 1] : 0
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [postList, setPostList] = useState(posts)
    const moreRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (max_page > 1 && page < max_page) {
            const moreTrigger = ScrollTrigger.create({
                trigger: moreRef.current,
                start: `bottom 90%`,
                end: `bottom bottom`,
                onEnter: () => {
                    if (!loading) {
                        setLoading(true)
                        moreTrigger.kill();
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
        const url = (isTag) ? `${process.env.NEXT_PUBLIC_API_SERVER_HOST}archive/taxonomy/tag/term/${slug}/page/${page + 1}` : `${process.env.NEXT_PUBLIC_API_SERVER_HOST}archive/post_type/article/page/${page + 1}`
        const res = await fetch(url)
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
            {Array.isArray(postList) && (
                <div className='pt-27 @PC:pt-108'>
                    <ArticleList
                        posts={postList}
                        className='grid grid-cols-1 s:grid-cols-2 m:grid-cols-3'
                    />
                </div>
            )}
            {max_page > 1 && page < max_page && (
                <div ref={moreRef} className="mx-auto w-85 h-107 mt-80 @PC:mt-120 @PC:w-108 @PC:h-136">
                    <Picture name="loading.gif" />
                </div>
            )}
        </>
    )
}

export default ArchiveContent
