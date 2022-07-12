import { ReactElement } from 'react'

type LayoutProps = Required<{
    readonly children: ReactElement
}>

const LowerPageLayout = ({ children }: LayoutProps) => (
    <>
        <div className='px-20 py-40 @PC:px-140 @PC:py-85 layout-medium bg-white mt-38 @PC:mt-86 rounded-30 @PC:rounded-60'>
            {children}
        </div>
    </>
)

export default LowerPageLayout
