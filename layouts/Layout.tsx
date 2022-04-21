import { ReactElement } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/parts/Breadcrumbs'

type LayoutProps = Required<{
    readonly children: ReactElement
}>

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main className='pt-100 my-40'>{children}</main>
            {children.props.breadcrumbs && (
                <Breadcrumbs breadcrumbs={children.props.breadcrumbs} />
            )}
            <Footer />
        </>
    )
}

export default Layout
