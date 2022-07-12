import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import SVGSprite from './util/SVGSprite'
import Hamburger from './parts/Hamburger'
import ScrollCancel from '../utils/ScrollCancel'
import HeaderMenu from './parts/HeaderMenu'

export default function Header() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isHome, setIsHome] = useState(false)

    const scrollCancel = new ScrollCancel()

    useEffect(() => {
        setIsHome(router.pathname == '/')
    }, [router.pathname])

    useEffect(() => {
        scrollCancel.set(!open)
        return () => {
            scrollCancel.clear()
        }
    }, [open])

    return (
        <header
            className={`z-30 pt-23 @PC:pt-0 h-100 @PC:h-140 pl-20 @PC:pl-40 w-full fixed top-0 left-0 @PC:flex @PC:gap-x-160 @PC:items-center`}
        >
            <div className='flex justify-between'>
                <div className={`z-30 w-220 h-26 @PC:w-401 @PC:h-57 text-white`}>
                    {isHome && (
                        <h1>
                            <div className='hidden @PC:block'>
                                <SVGSprite name='logo' />
                            </div>
                            <div className='@PC:hidden'>
                                <SVGSprite name='logo-sp' />
                            </div>
                        </h1>
                    )}
                    {!isHome && (
                        <Link href='/'>
                            <a className={``} onClick={() => { setOpen(false) }}>
                                <div className='hidden @PC:block'>
                                    <SVGSprite name='logo' />
                                </div>
                                <div className='@PC:hidden'>
                                    <SVGSprite name='logo-sp' />
                                </div>
                            </a>
                        </Link>
                    )}
                </div>
                <Hamburger open={open} setOpen={setOpen} />
                <div className={`${open ? 'text-beige' : 'text-white'} z-30 absolute top-0 right-0 w-110 h-93 @PC:hidden`}>
                    <SVGSprite name="hamburger-bg" />
                </div>
            </div>
            <HeaderMenu open={open} setOpen={setOpen} />
        </header>
    )
}
