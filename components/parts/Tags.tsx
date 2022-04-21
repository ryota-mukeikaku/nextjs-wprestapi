import Link from 'next/link'

type Props = {
    tags: {
        slug: string
        name: string
    }[]
    isLink?: boolean
}

const Tags = (props: Props) => {
    const { tags, isLink = false } = props
    return (
        <ul>
            {tags.map((tag) => {
                return (
                    <li key={tag.slug}>
                        {isLink && (
                            <Link href={`/tag/${tag.slug}/`}>
                                <a>#{tag.name}</a>
                            </Link>
                        )}
                        {!isLink && <span>#{tag.name}</span>}
                    </li>
                )
            })}
        </ul>
    )
}

export default Tags
