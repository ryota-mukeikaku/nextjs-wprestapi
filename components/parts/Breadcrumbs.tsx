import BreadcrumbsType from '@/types/BreadcrumbsType'
import Link from 'next/link'

const Breadcrumbs = (props: BreadcrumbsType) => {
    const { breadcrumbs } = props
    return (
        <nav className='layout-main'>
            <ol className='flex gap-20'>
                {breadcrumbs.map((el, i) => {
                    return (
                        <li key={el.url}>
                            {breadcrumbs.length - 1 === i && (
                                <span>{el.title}</span>
                            )}
                            {breadcrumbs.length - 1 !== i && (
                                <Link href={el.url}>
                                    <a>{el.title}</a>
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumbs
