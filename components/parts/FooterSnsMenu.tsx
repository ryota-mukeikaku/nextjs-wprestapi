import { FooterSnsMenuData } from '@/libs/FooterSnsMenu'
import Link from 'next/link'
import SVGSprite from '../util/SVGSprite'

const FooterSnsMenu = () => {
    return (
        <>
            <nav className='mt-60 @PC:mt-0 font-en text-18 @PC:absolute @PC:right-140 @PC:top-85'>
                <ul className='flex gap-x-45'>
                    {FooterSnsMenuData.map((el) => {
                        return (
                            <li key={el.href}>
                                {el.isBlank && (
                                    <a
                                        href={el.href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex gap-x-8 items-center'
                                    >
                                        <div className='w-26 h-26'>
                                            <SVGSprite name={`icon-${el.text.toLowerCase()}`} />
                                        </div>
                                        <div className='hidden @PC:block'>
                                            {el.text}
                                        </div>
                                    </a>
                                )}
                                {!el.isBlank && (
                                    <Link href={el.href}>
                                        <a
                                            className='flex gap-x-8 items-center'
                                        >
                                            <div className='w-26 h-26'>
                                                <SVGSprite name={`icon-${el.text.toLowerCase()}`} />
                                            </div>
                                            <div className='hidden @PC:block'>
                                                {el.text}
                                            </div>
                                        </a>
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default FooterSnsMenu
