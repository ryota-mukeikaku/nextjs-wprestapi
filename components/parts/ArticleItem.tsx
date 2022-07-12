import Link from 'next/link'
import PostType from '@/types/PostType'
import Picture from '@/components/util/Picture'
import Categories from './Categories'
import Tags from './Tags'
import SVGSprite from '../util/SVGSprite'

type Props = {
    post: PostType
}

const ArticleItem = (props: Props) => {
    const {
        post: { thumbnail, title, date, id, post_type, taxonomies }
    } = props
    return (
        <Link href={`/${post_type}/${id}`}>
            <a className={`block flex-1 relative`}>
                <div className='relative'>
                    <Picture
                        name={thumbnail ? thumbnail[0] : 'ogp.png'}
                        width={thumbnail ? thumbnail[1] : '128'}
                        height={thumbnail ? thumbnail[2] : '128'}
                        className='aspect-thumb rounded-60 @PC:rounded-[12rem] overflow-hidden'
                        isExternal={thumbnail !== null}
                        isFit={true}
                    />
                    {taxonomies !== null && taxonomies.category && (
                        <div className='absolute -right-17 -bottom-40 @PC:-right-52 @PC:-bottom-50 w-154 h-131 @PC:w-349 @PC:h-297 flex items-center justify-center'>
                            <Picture
                                name={taxonomies.category[0].slug + '.png'}
                                width={thumbnail ? thumbnail[1] : '250'}
                                height={thumbnail ? thumbnail[2] : '250'}
                                className='relative z-10 aspect-square w-95 @PC:w-250'
                                isFit={true}
                            />
                            <div className='absolute top-0 left-0 w-154 h-131 @PC:w-349 @PC:h-297'>
                                <SVGSprite name="icon-bg" />
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {taxonomies !== null && taxonomies.tag && (
                        <Tags tags={taxonomies.tag} className="mt-40 @PC:mt-50" />
                    )}
                    <h2 className='font-bold text-24 leading-38 @PC:text-36 @PC:leading-57 mt-16 @PC:mt-30'>{title}</h2>
                    <time className='block font-en tracking-10 text-14 @PC:text-18 mt-16 @PC:mt-14'>{date}</time>
                </div>
                <div className='@PC:hidden flex items-center gap-15 justify-end -mt-24 mr-10'>
                    <div className='font-en'>More</div>
                    <div className='h-57 w-57 rounded-half border border-black border-dashed flex items-center justify-center'>
                        <div className='w-11 h-11'>
                            <SVGSprite name="icon-arrow" />
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ArticleItem
