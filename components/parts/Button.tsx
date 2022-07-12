import Link from 'next/link'
import SVGSprite from '../util/SVGSprite'

type Props = {
    href: string
    text: string
    isBlank?: boolean
    className?: string
    download?: boolean
    large?: boolean
    icon?: {
        name: string
        className: string
    }
    isPdf?: boolean
}

export default function Button(props: Props) {
    const { href, text, isBlank = false, className = '', download = false, icon = { name: 'icon-arrow', className: 'w-11 h-11 @PC:w-14 @PC:h-14' }, large = false, isPdf = false } = props
    const size = large ? 'h-70 @PC:h-140 rounded-35 @PC:rounded-70 text-16 @PC:text-20' : 'h-40 @PC:h-65 rounded-20 @PC:rounded-33 text-11 @PC:text-18'
    return (
        <div className={`${className}`}>
            {!isPdf && (
                <>
                    {!isBlank && (
                        <Link href={href}>
                            <a
                                className={`${size} flex items-center justify-center relative w-full border gap-x-8 @PC:gap-x-16`}
                            >
                                <div className='text-center @SP:leading-22' dangerouslySetInnerHTML={{ __html: text }}></div>
                                <div className={`${icon.className}`}>
                                    <SVGSprite name={icon.name} />
                                </div>
                            </a>
                        </Link>
                    )}
                    {isBlank && (
                        <>
                            {!download && (
                                <Link href={href}>
                                    <a
                                        className={`${size} flex items-center justify-center relative w-full border gap-x-8 @PC:gap-x-16`}
                                        target='_blank'
                                        rel='noopener noreferrerr'
                                    >
                                        <div className='text-center @SP:leading-22' dangerouslySetInnerHTML={{ __html: text }}></div>
                                        <div className={`w-12 h-12 @PC:w-14 @PC:h-14`}>
                                            <SVGSprite name="icon-blank" />
                                        </div>
                                    </a>
                                </Link>
                            )}
                            {download && (
                                <a
                                    className={`${size} flex items-center justify-center relative w-full border gap-x-8 @PC:gap-x-16`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    download
                                    href={href}
                                >
                                    <div className='text-center @SP:leading-22' dangerouslySetInnerHTML={{ __html: text }}></div>
                                    <div className={`${icon.className}`}>
                                        <SVGSprite name={icon.name} />
                                    </div>
                                </a>
                            )}
                        </>
                    )}
                </>
            )}
            {isPdf && (
                <>
                    <a
                        className={`${size} flex items-center justify-center relative w-full border gap-x-8 @PC:gap-x-16`}
                        target='_blank'
                        rel='noopener noreferrer @SP:leading-22'
                        download
                        href={href}
                    >
                        <div className='text-center' dangerouslySetInnerHTML={{ __html: text }}></div>
                        <div className={`w-20 h-22 @PC:w-21 @PC:h-23`}>
                            <SVGSprite name="icon-pdf" />
                        </div>
                    </a>
                </>
            )}
        </div>
    )
}
