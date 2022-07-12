import Link from 'next/link'

type Props = {
    tags: {
        slug: string
        name: string
    }[]
    isLink?: boolean
    className?: string
}

const Tags = (props: Props) => {
    const { tags, isLink = false, className } = props
    const childClassName = 'rounded-21 @PC:rounded-53 px-10 py-5 @PC:px-14 @PC:py-8'
    return (
        <ul className={`font-bold text-white text-14 @PC:text-18 flex flex-wrap gap-16 ${className}`}>
            {tags.map((tag, i) => {
                if (isLink || (!isLink && i < 2)) {
                    return (
                        <li key={tag.slug}>
                            {isLink && (
                                <Link href={`/article/tag/${tag.slug}/`}>
                                    <a className={`${childClassName} bg-${tag.slug}`}>{tag.name}</a>
                                </Link>
                            )}
                            {!isLink && <span className={`${childClassName} bg-${tag.slug}`}>{tag.name}</span>}
                        </li>
                    )
                }
            })}
        </ul>
    )
}

export default Tags
