import PostType from '@/types/PostType'
import ArticleItem from './ArticleItem'

type Props = {
    posts: PostType[]
    className?: string
}

const ArticleList = (props: Props) => {
    const { posts, className } = props
    return (
        <>
            {posts && (
                <div className={className ? className : ''}>
                    {posts.map((post) => {
                        return <ArticleItem post={post} key={post.id} />
                    })}
                </div>
            )}
        </>
    )
}

export default ArticleList
