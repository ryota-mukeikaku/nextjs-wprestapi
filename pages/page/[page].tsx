import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring';

import Meta from "@/components/Meta";
import SidebarLayout from '@/layouts/SidebarLayout';

import ArchiveHeader from '@/components/ArchiveHeader';
import ArchiveContent from '@/components/ArchiveContent';
import ArchiveStaticPropsType from '@/types/ArchiveStaticPropsType';

interface Params extends ParsedUrlQuery {
    page: string
}

const Page = (props: ArchiveStaticPropsType) => {
    const { meta, posts, pagination, label } = props;
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
    );
}

export const getStaticProps: GetStaticProps<Params> = async ({
    params,
}) => {
    if (!params) {
        return {
            props: {
                posts: null,
            },
        };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}archive/post_type/article/page/${params.page}`
    );
    const data = await res.json();
    return {
        props: {
            ...data
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}pages/post_type/article`
    );
    const data = await res.json();
    if (!data.pages) {
        return;
    }
    return {
        paths: data.pages.map((page: string) => ({
            params: {
                page: page
            }
        })),
        fallback: process.env.NODE_ENV === 'production' ? false : 'blocking'
    };
}
export default Page