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
            className={`h-100 w-full pt-20 bg-gray-default fixed top-0 left-0`}
        >
            <div className='layout-main flex justify-between'>
                <div className={`w-120 h-60 text-white`}>
                    {isHome && (
                        <h1>
                            <SVGSprite name='logo' />
                        </h1>
                    )}
                    {!isHome && (
                        <Link href='/'>
                            <a className={``}>
                                <SVGSprite name='logo' />
                            </a>
                        </Link>
                    )}
                </div>
                <Hamburger open={open} setOpen={setOpen} />
            </div>
            <HeaderMenu open={open} setOpen={setOpen} />
        </header>
    )
}
