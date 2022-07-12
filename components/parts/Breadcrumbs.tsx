import BreadcrumbsType from '@/types/BreadcrumbsType'
import Link from 'next/link'

const Breadcrumbs = (props: BreadcrumbsType) => {
    const { breadcrumbs } = props
    return (
        <nav className='layout-large mb-16 @PC:-mb-32 relative z-10 mt-100 @PC:mt-184'>
            <ol className='flex justify-end text-12 @PC:text-16'>
                {breadcrumbs.map((el, i) => {
                    if (el.title != "News") {
                        return (
                            <li key={el.url} className="breadcrumbs__item">
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
                    }
                })}
            </ol>
        </nav >
    )
}

export default Breadcrumbs
