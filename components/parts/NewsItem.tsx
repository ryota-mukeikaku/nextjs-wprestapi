import Link from 'next/link'
import PostType from '@/types/PostType'
import SVGSprite from '../util/SVGSprite'

type Props = {
    post: PostType
}

const NewsItem = (props: Props) => {
    const {
        post: { thumbnail, title, date, id, post_type, taxonomies }
    } = props
    return (
        <Link href={`/${post_type}/${id}/`}>
            <a className='block u-dotted pb-16 pt-32 @PC:pb-38 @PC:pt-60'>
                <div className={`@PC:flex items-center`}>
                    <time className='text-16 leading-20 tracking-10 @PC:text-24 @PC:leading-48 font-en block @PC:w-320 flex-none'>{date}</time>
                    <div className='flex gap-10 @PC:gap-40 items-end @PC:w-full @PC:items-center mt-12 @PC:mt-0 @PC:ml-auto @PC:mr-0'>
                        <h2 className='text-15 tracking-5 leading-32 @PC:text-24 @PC:leading-48'>{title}</h2>
                        <div className='w-11 h-11 @PC:w-14 @PC:h-14 ml-auto mr-0 flex-none @SP:-translate-y-6'>
                            <SVGSprite name="icon-arrow" />
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default NewsItem
