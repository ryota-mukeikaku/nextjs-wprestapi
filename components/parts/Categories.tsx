import Link from 'next/link'

type Props = {
    categories: {
        slug: string
        name: string
    }[]
    isLink?: boolean
}

const Categories = (props: Props) => {
    const { categories, isLink = false } = props
    return (
        <ul>
            {categories.map((cat) => {
                return (
                    <li key={cat.slug}>
                        {isLink && (
                            <Link href={`/category/${cat.slug}/`}>
                                <a>{cat.name}</a>
                            </Link>
                        )}
                        {!isLink && <span>{cat.name}</span>}
                    </li>
                )
            })}
        </ul>
    )
}

export default Categories
