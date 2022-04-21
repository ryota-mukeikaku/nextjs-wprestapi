import { GetServerSidePropsContext, NextPage } from 'next'

import Meta from "@/components/Meta";
import MetaType from "@/types/MetaType";

import PostPaginationType from '@/types/PostPaginationType';
import RelationType from '@/types/RelationType';
import PostType from '@/types/PostType';

import SidebarLayout from '@/layouts/SidebarLayout';
import PostHeader from '@/components/PostHeader';
import PostContent from '@/components/PostContent';
import Head from 'next/head';

type Props = {
  meta: MetaType,
  post: PostType,
  pagination: PostPaginationType
  relation: RelationType
}

const Page: NextPage<Props> = (props) => {
  const { meta, post, pagination, relation } = props;
  return (
    <>
      <Head>
        <meta name="robots" content="noindex nofollow" />
      </Head>
      <Meta {...meta} />
      <SidebarLayout>
        <>
          <PostHeader post={post} />
          <PostContent post={post} pagination={pagination} relation={relation} />
        </>
      </SidebarLayout>
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!context.params) {
    return {
      props: {
        post: null,
      },
    };
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_HOST}preview/${context.params.hash}`
  );
  const data = await res.json();
  return {
    props: {
      ...data
    },
  };
}

export default Page