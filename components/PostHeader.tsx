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
        <header className='layout-pageheader pt-100 @PC:pt-229'>
            {taxonomies !== null && taxonomies.tag && (
                <Tags tags={taxonomies.tag} isLink={true} />
            )}
            <h1 className='font-bold text-26 @PC:text-54 leading-42 @PC:leading-89 mt-25 @PC:mt-35'>{title}</h1>
            <div className='font-en tracking-10 text-14 @PC:text-20 leading-20 @PC:leading-40 mt-20 @PC:mt-24'>{date}</div>
        </header>
    )
}

export default PostHeader
