import Link from 'next/link'
import SVGSprite from '../util/SVGSprite'

type Props = {
    href: string
    text: string
    isBlank?: boolean
    className?: string
}

export default function Button(props: Props) {
    const { href, text, isBlank = false, className = '' } = props
    return (
        <div className={`w-fit mx-auto ${className}`}>
            {!isBlank && (
                <Link href={href}>
                    <a
                        className={`flex items-center relative w-full s:w-fit border py-10 px-40`}
                    >
                        <div className={``}>{text}</div>
                        <div className={`w-20 h-20 absolute right-20`}>
                            <SVGSprite name='icon-angle-right' />
                        </div>
                    </a>
                </Link>
            )}
            {isBlank && (
                <Link href={href}>
                    <a
                        className={`flex items-center relative w-full s:w-fit border py-10 px-40`}
                        target='_blank'
                        rel='noopener noreffere'
                    >
                        <div className={``}>{text}</div>
                        <div className='w-20 h-20 absolute right-20'>
                            <SVGSprite name='icon-angle-right' />
                        </div>
                    </a>
                </Link>
            )}
        </div>
    )
}
