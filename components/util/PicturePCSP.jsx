export default function PicturePCSP({
    namePC,
    nameSP,
    alt,
    isLazy = true,
    isFit = false,
    isExternal = false
}) {
    const media = '(min-width: 1024px)'

    return (
        <picture className={isFit ? 'h-full' : undefined}>
            <source
                srcSet={
                    isExternal
                        ? `${namePC}.webp`
                        : require(`/public/images/${namePC}?webp`)
                }
                type='image/webp'
                media={media}
            />
            <source
                srcSet={
                    isExternal
                        ? `${namePC}`
                        : require(`/public/images/${namePC}`)
                }
                media={media}
            />
            <source
                srcSet={
                    isExternal
                        ? `${nameSP}.webp`
                        : require(`/public/images/${nameSP}?webp`)
                }
                type='image/webp'
            />
            <img
                src={
                    isExternal
                        ? `${nameSP}`
                        : require(`/public/images/${nameSP}`)
                }
                alt={alt}
                loading={isLazy ? 'lazy' : undefined}
                decoding={!isLazy ? 'async' : undefined}
                className={`${isFit ? 'h-full' : undefined} ${
                    isFit ? 'object-cover' : undefined
                }`}
            />
        </picture>
    )
}
