import { NextPage } from 'next'
import React from 'react'
import Meta from '@/components/Meta'
import ArticleList from '@/components/parts/ArticleList'
import Button from '@/components/parts/Button'
import type MetaType from '@/types/MetaType'
import type PostsType from '@/types/PostsType'

interface Props {
    meta: MetaType
    posts: PostsType
}

const Home: NextPage<Props> = (props) => {
    const { meta, posts } = props
    return (
        <>
            <Meta {...meta} />
            {Array.isArray(posts) && (
                <section>
                    <div className='layout-main my-40'>
                        <h2>新着記事</h2>
                        <ArticleList
                            posts={posts}
                            className='grid grid-cols-1 s:grid-cols-2 m:grid-cols-3'
                        />
                        <Button
                            text='Read More'
                            href='/page/1/'
                            className='mt-20'
                        />
                    </div>
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
