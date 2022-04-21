import PostType from '@/types/PostType'
import Link from 'next/link'
import Categories from './parts/Categories'
import Tags from './parts/Tags'

type Props = {
    post: PostType
}

const PostHeader = (props: Props) => {
    const {
        post: { title, date, taxonomies }
    } = props
    return (
        <header>
            <h1 className='text-40'>{title}</h1>
            <div>{date}</div>
            {taxonomies !== null && taxonomies.category && (
                <Categories categories={taxonomies.category} isLink={true} />
            )}
            {taxonomies !== null && taxonomies.post_tag && (
                <Tags tags={taxonomies.post_tag} isLink={true} />
            )}
        </header>
    )
}

export default PostHeader
