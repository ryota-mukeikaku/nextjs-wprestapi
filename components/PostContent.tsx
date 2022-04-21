import PostPagination from '@/components/parts/PostPagination'
import PostContentType from '@/types/PostContentType'
import PostRelation from './parts/PostRelation'
import Picture from './util/Picture'

const PostContent = (props: PostContentType) => {
    const { post, pagination, relation } = props
    return (
        <>
            {post.thumbnail && (
                <Picture
                    name={post.thumbnail ? post.thumbnail[0] : 'ogp.png'}
                    width={post.thumbnail ? post.thumbnail[1] : '128'}
                    height={post.thumbnail ? post.thumbnail[2] : '128'}
                    className='aspect-video mt-40'
                    isExternal={true}
                    isFit={true}
                />
            )}
            <div
                className='post_content mt-40'
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {Array.isArray(relation) && <PostRelation relation={relation} />}
            <PostPagination {...pagination} />
        </>
    )
}

export default PostContent
