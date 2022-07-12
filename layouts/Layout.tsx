import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SVGInline from '../components/util/SVGInline'
import Breadcrumbs from '@/components/parts/Breadcrumbs'

type LayoutProps = Required<{
    readonly children: ReactElement
}>

const Layout = ({ children }: LayoutProps) => {

    const router = useRouter()
    const [mode, setMode] = useState({ name: 'common', h_sp: 260, h_pc: 658 })

    useEffect(() => {

        if (router.pathname == '/') {
            setMode({ name: 'index', h_sp: 501, h_pc: 981 })
        } else if (router.pathname.match(/^\/(article|news)\/\[id\]$/)) {
            setMode({ name: 'article', h_sp: 505, h_pc: 728 })
        } else if (router.pathname == '/about') {
            setMode({ name: 'article', h_sp: 180, h_pc: 638 })
        } else if (router.pathname == '/training' || router.pathname == '/education') {
            setMode({ name: 'special', h_sp: 260, h_pc: 618 })
        } else {
            setMode({ name: 'common', h_sp: 260, h_pc: 658 })
        }
    }, [router.pathname])

    return (
        <>
            <Header />
            <div className={`absolute top-0 z-0 w-full h-${mode.h_sp} @PC:h-${mode.h_pc} `}>
                <SVGInline name={`bg-${mode.name}-pc`} className='pc-show' />
                <SVGInline name={`bg-${mode.name}-sp`} className='sp-show' />
            </div>
            <main className='relative z-100'>{children}</main>
            {children.props.breadcrumbs && (
                <Breadcrumbs breadcrumbs={children.props.breadcrumbs} />
            )}
            <Footer />
        </>
    )
}

export default Layout
