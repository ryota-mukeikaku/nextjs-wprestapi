import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery, stringify } from 'querystring'

import Meta from '@/components/Meta'
import SidebarLayout from '@/layouts/SidebarLayout'

import ArchiveHeader from '@/components/ArchiveHeader'
import ArchiveContent from '@/components/ArchiveContent'
import ArchiveStaticPropsType from '@/types/ArchiveStaticPropsType'

interface Params extends ParsedUrlQuery {
    slug: string
    page: string
}

const Page = (props: ArchiveStaticPropsType) => {
    const { meta, posts, pagination, label } = props
    return (
        <>
            <Meta {...meta} />
            <SidebarLayout>
                <>
                    <ArchiveHeader label={label} />
                    <ArchiveContent posts={posts} pagination={pagination} />
                </>
            </SidebarLayout>
        </>
    )
}

export const getStaticProps: GetStaticProps<Params> = async ({ params }) => {
    if (!params) {
        return {
            props: {
                posts: null
            }
        }
    }
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}archive/taxonomy/category/term/${params.slug}/page/${params.page}`
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
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}terms/category`
    )
    const data = await res.json()
    if (!data.terms) {
        return
    }
    const params: { slug: string; page: number }[] = []
    data.terms.map((term: { slug: string; count: number }) => {
        for (let i = 1; i <= term.count; i++) {
            params.push({
                slug: term.slug,
                page: i
            })
        }
    })

    return {
        paths: params.map((term) => ({
            params: {
                slug: term.slug,
                page: term.page.toString()
            }
        })),
        fallback: process.env.NODE_ENV === 'production' ? false : 'blocking'
    }
}
export default Page
