type Props = {
    id: string
    className?: string
}

const Youtube = (props: Props) => {
    const { id, className = '' } = props
    return (
        <div className={`${className}`}>
            <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}

export default Youtube