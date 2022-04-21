import { ReactElement } from 'react'

type LayoutProps = Required<{
    readonly children: ReactElement
}>

const SidebarLayout = ({ children }: LayoutProps) => (
    <>
        <div className='layout-main flex flex-col m:flex-row gap-40'>
            <section className='flex-1'>{children}</section>
            <aside
                id='sidebar'
                className='bg-gray-default m:w-240 flex-none'
            ></aside>
        </div>
    </>
)

export default SidebarLayout
