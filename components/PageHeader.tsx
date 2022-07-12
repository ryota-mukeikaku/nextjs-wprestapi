import Link from 'next/link'

type Props = {
    jp: string;
    en: string
}

const PageHeader = (props: Props) => {
    const {
        jp, en
    } = props
    return (
        <header className='layout-pageheader pt-110 @PC:pt-229'>
            <h1 className='font-bold text-26 @PC:text-64 leading-26 @PC:leading-89 @PC:tracking-10'>{jp}</h1>
            <div className='font-en tracking-0 text-15 @PC:text-30 leading-15 @PC:leading-30 mt-20 @PC:mt-24'>{en}</div>
        </header>
    )
}

export default PageHeader
