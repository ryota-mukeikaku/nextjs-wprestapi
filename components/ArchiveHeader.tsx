type Props = {
    label: string
}

const ArchiveHeader = (props: Props) => {
    const { label } = props
    return (
        <header className="pt-100 @PC:pt-229">
            <h1 className='font-bold text-26 @PC:text-64 leading-45 @PC:leading-64 tracking-5 @PC:tracking-10'>{label}</h1>
        </header>
    )
}

export default ArchiveHeader
