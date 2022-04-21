import RelationType from '@/types/RelationType'
import ArticleList from './ArticleList'

const PostRelation = (props: RelationType) => {
    const { relation } = props
    if (!relation) {
        return <></>
    } else {
        return (
            <>
                {relation && (
                    <div className='bg-gray-default mt-40 p-10'>
                        <h2 className='text-white'>関連記事</h2>
                        <div>
                            <ArticleList
                                posts={relation}
                                className='grid grid-cols-1 s:grid-cols-3'
                            />
                        </div>
                    </div>
                )}
            </>
        )
    }
}

export default PostRelation
