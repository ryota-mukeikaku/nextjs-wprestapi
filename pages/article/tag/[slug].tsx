import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring';

import Meta from "@/components/Meta";

import ArchiveHeader from '@/components/ArchiveHeader';
import ArchiveContent from '@/components/ArchiveContent';
import ArchiveStaticPropsType from '@/types/ArchiveStaticPropsType';


interface Params extends ParsedUrlQuery {
    slug: string
}

const Page = (props: ArchiveStaticPropsType) => {
    const { posts, pagination, label } = props;
    const meta = {
        title: "おいしい和食のはなし。｜農林水産省",
        description: "和食にまつわる様々な、”おいしい”はなしをご用意しています。",
        ogImage: process.env.NEXT_PUBLIC_URL + "images/ogp.png",
        ogType: "website",
        siteName: "おいしい和食のはなし。｜農林水産省",
        twitter: "@washoku_maff"
    }
    return (
        <>
            <Meta {...meta} />
            <div className="layout-large">
                <ArchiveHeader label={`#${label}`} />
                <ArchiveContent posts={posts} pagination={pagination} isTag={true} slug={pagination?.slug} />
            </div>
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
            ...data,
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