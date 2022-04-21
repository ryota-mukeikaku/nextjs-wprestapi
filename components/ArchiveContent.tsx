import ArchivePaginationType from '@/types/ArchivePaginationType'
import PostsType from '@/types/PostsType'
import ArchivePagination from './parts/ArchivePagination'
import ArticleList from './parts/ArticleList'

type Props = {
    posts: PostsType
    pagination: ArchivePaginationType | null
}

const ArchiveContent = (props: Props) => {
    const { posts, pagination } = props
    return (
        <>
            {Array.isArray(posts) && (
                <>
                    <ArticleList
                        posts={posts}
                        className='grid grid-cols-1 s:grid-cols-2 m:grid-cols-3'
                    />
                    <ArchivePagination pagination={pagination} />
                </>
            )}
        </>
    )
}

export default ArchiveContent
