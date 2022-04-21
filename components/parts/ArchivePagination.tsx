import Link from 'next/link'
import ArchivePaginationType from '@/types/ArchivePaginationType'

type Props = {
    pagination: ArchivePaginationType
}

const ArchivePagination = (props: Props) => {
    if (props.pagination === null) {
        return <></>
    }
    const {
        pagination: { numbers, current, prev, next, mode, slug }
    } = props
    const url = (num: number) => {
        if (mode === 'post_type') {
            if (slug === 'article') {
                return `/page/${num}`
            } else {
                return `/${slug}/page/${num}`
            }
        } else {
            return num === 1
                ? `/${mode}/${slug}/`
                : `/${mode}/${slug}/page/${num}`
        }
    }
    return (
        <>
            {numbers && (
                <nav className='flex justify-center mt-40 gap-20'>
                    <div>
                        {prev && (
                            <Link href={url(prev)}>
                                <a>Prev</a>
                            </Link>
                        )}
                        {!prev && <span>Prev</span>}
                    </div>
                    <ol className='flex justify-center gap-20'>
                        {numbers.map((num) => {
                            return (
                                <li key={num}>
                                    {num === current && <span>{num}</span>}
                                    {num !== current && (
                                        <Link href={url(num)}>
                                            <a>{num}</a>
                                        </Link>
                                    )}
                                </li>
                            )
                        })}
                    </ol>
                    <div>
                        {next && (
                            <Link href={url(next)}>
                                <a>Next</a>
                            </Link>
                        )}
                        {!next && <span>Next</span>}
                    </div>
                </nav>
            )}
        </>
    )
}

export default ArchivePagination
