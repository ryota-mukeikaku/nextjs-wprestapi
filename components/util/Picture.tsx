import PictureType from '@/types/PictureType'

export default function Picture(props: PictureType) {
  const {
    name,
    alt = '',
    className = '',
    isLazy = true,
    isFit = false,
    isExternal = false
  } = props
  return (
    <picture className={`${className}`}>
      <source
        srcSet={
          isExternal
            ? `${name}.webp`
            : require(`/public/images/${name}?webp`)
        }
        type='image/webp'
      />
      <img
        src={isExternal ? name : require(`/public/images/${name}?webp`)}
        alt={alt}
        loading={isLazy ? 'lazy' : undefined}
        decoding={!isLazy ? 'async' : undefined}
        className={`${isFit ? 'h-full' : ''} ${isFit ? 'object-cover' : undefined
          }`}
      />
    </picture>
  )
}
