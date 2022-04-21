import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring';

import Meta from "@/components/Meta";
import SidebarLayout from '@/layouts/SidebarLayout';

import ArchiveHeader from '@/components/ArchiveHeader';
import ArchiveContent from '@/components/ArchiveContent';
import ArchiveStaticPropsType from '@/types/ArchiveStaticPropsType';


interface Params extends ParsedUrlQuery {
    slug: string
}

const Page = (props: ArchiveStaticPropsType) => {
    const { meta, posts, pagination, label } = props;
    return (
        <>
            <Meta {...meta} />
            <SidebarLayout>
                <>
                    <ArchiveHeader label={`#${label}`} />
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}archive/taxonomy/tag/term/${params.slug}/page/1`);
    const data = await res.json();
    return {
        props: {
            ...data
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}terms/tag`
    );
    const data = await res.json();
    if (!data.terms) {
        return;
    }
    return {
        paths: data.terms.map((term:
            {
                slug: string,
                num: number
            }
        ) => ({
            params: {
                slug: term.slug
            }
        })),
        fallback: process.env.NODE_ENV === 'production' ? false : 'blocking'
    };
}
export default Page