export default function SVGInline(props) {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: require(`/public/images/${props.name}.svg?include`)
            }}
        />
    )
}
