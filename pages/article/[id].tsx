import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

import Meta from '@/components/Meta'
import MetaType from '@/types/MetaType'

import PostPaginationType from '@/types/PostPaginationType'
import RelationType from '@/types/RelationType'
import PostType from '@/types/PostType'

import SidebarLayout from '@/layouts/SidebarLayout'
import PostHeader from '@/components/PostHeader'
import PostContent from '@/components/PostContent'

type Id = {
    ID: string
}

type Props = {
    meta: MetaType
    post: PostType
    pagination: PostPaginationType
    relation: RelationType
}

interface Params extends ParsedUrlQuery {
    id: string
}

const Page: NextPage<Props> = (props) => {
    const { meta, post, pagination, relation } = props
    return (
        <>
            <Meta {...meta} />
            <SidebarLayout>
                <>
                    <PostHeader post={post} />
                    <PostContent
                        post={post}
                        pagination={pagination}
                        relation={relation}
                    />
                </>
            </SidebarLayout>
        </>
    )
}

export const getStaticProps: GetStaticProps<Params> = async ({ params }) => {
    if (!params) {
        return {
            props: {
                post: null
            }
        }
    }
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}post_type/article/${params.id}`
    )
    const data = await res.json()
    return {
        props: {
            ...data
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}ids/post`
    )
    const ids = await res.json()
    return {
        paths: ids.map((data: Id) => ({
            params: {
                id: data.ID
            }
        })),
        fallback: process.env.NODE_ENV === 'production' ? false : 'blocking'
    }
}
export default Page
