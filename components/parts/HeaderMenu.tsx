import { HeaderMenuData } from '@/libs/HeaderMenu'
import Link from 'next/link'
type Props = {
    open: boolean
    setOpen: (value: boolean) => void
}

const HeaderMenu = (props: Props) => {
    const { open, setOpen } = props

    const menuStyle = {
        common: 'fixed top-100 left-0 w-full overflow-hidden bg-gray-light transition-all',
        open: 'h-[calc(100%-10rem)]',
        close: 'h-0'
    }
    return (
        <div
            className={`${menuStyle.common} ${
                open ? menuStyle.open : menuStyle.close
            }`}
        >
            <nav className='layout-main'>
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
        </div>
    )
}

export default HeaderMenu
