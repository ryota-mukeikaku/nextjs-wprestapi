import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring';

import Meta from "@/components/Meta";

import ArchiveHeader from '@/components/ArchiveHeader';
import ArchiveContent from '@/components/ArchiveContent';
import ArchiveStaticPropsType from '@/types/ArchiveStaticPropsType';

interface Params extends ParsedUrlQuery {
    page: string
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
                <ArchiveHeader label="新着記事一覧" />
                <ArchiveContent posts={posts} pagination={pagination} isTag={false} />
            </div>
        </>
    );
}

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}archive/post_type/article/page/1`);
    const data = await res.json();
    return {
        props: {
            ...data
        }
    }
}

export default Page