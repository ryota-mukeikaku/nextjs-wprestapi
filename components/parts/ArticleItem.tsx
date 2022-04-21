import Link from 'next/link'
import PostType from '@/types/PostType'
import Picture from '@/components/util/Picture'
import Categories from './Categories'
import Tags from './Tags'

type Props = {
    post: PostType
}

const ArticleItem = (props: Props) => {
    const {
        post: { thumbnail, title, date, id, post_type, taxonomies }
    } = props
    return (
        <Link href={`/${post_type}/${id}`}>
            <a className={`block flex-1`}>
                <Picture
                    name={thumbnail ? thumbnail[0] : 'ogp.png'}
                    width={thumbnail ? thumbnail[1] : '128'}
                    height={thumbnail ? thumbnail[2] : '128'}
                    className='aspect-video'
                    isExternal={thumbnail !== null}
                    isFit={true}
                />
                <div>
                    <h2>{title}</h2>
                    <time>{date}</time>
                    {taxonomies !== null && taxonomies.category && (
                        <Categories categories={taxonomies.category} />
                    )}
                    {taxonomies !== null && taxonomies.post_tag && (
                        <Tags tags={taxonomies.post_tag} />
                    )}
                </div>
            </a>
        </Link>
    )
}

export default ArticleItem
