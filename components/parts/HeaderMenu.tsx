import { HeaderMenuData } from '@/libs/HeaderMenu'
import Link from 'next/link'
import SVGSprite from '../util/SVGSprite'
type Props = {
    open: boolean
    setOpen: (value: boolean) => void
}

const HeaderMenu = (props: Props) => {
    const { open, setOpen } = props

    const menuStyle = {
        common: 'h-[100vh] fixed bg-white pointer-none top-0 left-0 w-full overflow-hidden transition-all @PC:hidden',
        open: 'block',
        close: 'hidden'
    }
    return (
        <>
            <nav className='hidden @PC:block'>
                <ul className='flex gap-x-50'>
                    {HeaderMenuData.map((el) => {
                        return (
                            <li key={el.href}>
                                {el.isBlank && (
                                    <a
                                        href={el.href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        {el.text}
                                    </a>
                                )}
                                {!el.isBlank && (
                                    <Link href={el.href}>
                                        <a >
                                            {el.text}
                                        </a>
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div
                className={`@PC:hidden ${menuStyle.common} ${open ? menuStyle.open : menuStyle.close
                    }`}
            >
                <nav className='font-bold text-18 leading-70 pt-110 pl-115'>
                    <ul>
                        {HeaderMenuData.map((el) => {
                            return (
                                <li key={el.href}>
                                    {el.isBlank && (
                                        <a
                                            href={el.href}
                                            onClick={() => setOpen(!open)}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            {el.text}
                                        </a>
                                    )}
                                    {!el.isBlank && (
                                        <Link href={el.href}>
                                            <a onClick={() => setOpen(!open)}>
                                                {el.text}
                                            </a>
                                        </Link>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <div className='absolute w-full h-129 bottom-0 left-0'>
                    <SVGSprite name="hamburger-bg-bottom" />
                </div>
            </div>
        </>
    )
}

export default HeaderMenu
