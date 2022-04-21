export default function SVGImage({ name, alt, isLazy = true }) {
    return (
        <picture>
            <img
                src={require(`/public/images/${name}.svg`)}
                alt={alt}
                loading={isLazy ? 'lazy' : undefined}
                decoding={!isLazy ? 'async' : undefined}
            />
        </picture>
    )
}
