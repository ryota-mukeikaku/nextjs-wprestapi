import { FooterMenuData } from '@/libs/FooterMenu'
import Link from 'next/link'
import SVGSprite from '../util/SVGSprite'

const FooterMenu = () => {
    return (
        <>
            <nav className='mt-60 @PC:mt-65 text-15 @PC:text-15'>
                <ul className='flex flex-col gap-y-40 @PC:flex-row gap-x-80'>
                    {FooterMenuData.map((el) => {
                        return (
                            <li key={el.href} className="">
                                {el.isBlank && (
                                    <a
                                        href={el.href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex gap-12 items-center justify-center @PC:justify-start'
                                    >
                                        <div className='underline'>
                                            {el.text}
                                        </div>
                                        <div className='w-12 h-12'>
                                            <SVGSprite name="icon-blank" />
                                        </div>
                                    </a>
                                )}
                                {!el.isBlank && (
                                    <Link href={el.href}>
                                        <a
                                            className='flex gap-12 items-center justify-center @PC:justify-start'
                                        >
                                            <div className='underline'>
                                                {el.text}
                                            </div>
                                            <div className='w-12 h-12'>
                                                <SVGSprite name="icon-arrow" />
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

export default FooterMenu
