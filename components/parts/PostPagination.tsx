import Picture from '@/components/util/Picture'
import PostType from '@/types/PostType'
import Link from 'next/link'

type PostPaginationType = {
    prev: PostType | null
    next: PostType | null
}

const PostPagination = (props: PostPaginationType) => {
    const pagination = [props.prev, props.next]
    return (
        <div className='bg-gray-default grid grid-cols-2 gap-10 mt-40 p-10'>
            {pagination.map((post, index) => {
                const mode = index === 0 ? 'prev' : 'next'
                return (
                    <div key={mode} className='bg-white'>
                        {post && (
                            <Link href={`/${post.post_type}/${post.id}`}>
                                <a
                                    className={`flex ${
                                        mode === 'prev'
                                            ? ''
                                            : 'flex-row-reverse'
                                    }`}
                                >
                                    <Picture
                                        name={
                                            post.thumbnail
                                                ? post.thumbnail[0]
                                                : 'ogp.png'
                                        }
                                        width={
                                            post.thumbnail
                                                ? post.thumbnail[1]
                                                : '128'
                                        }
                                        height={
                                            post.thumbnail
                                                ? post.thumbnail[2]
                                                : '128'
                                        }
                                        className='aspect-video w-160'
                                        isExternal={true}
                                        isFit={true}
                                    />
                                    <div>
                                        <h2>{post.title}</h2>
                                        <time>{post.date}</time>
                                    </div>
                                </a>
                            </Link>
                        )}
                        {!post && <div></div>}
                    </div>
                )
            })}
        </div>
    )
}

export default PostPagination
