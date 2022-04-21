type Props = {
    label: string
}

const ArchiveHeader = (props: Props) => {
    const { label } = props
    return (
        <header>
            <h1 className='text-40'>{label}の記事一覧</h1>
        </header>
    )
}

export default ArchiveHeader
