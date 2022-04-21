import React, { ReactElement } from 'react'

type fnType = (props: {
    name: string
    title?: string
    className?: string
}) => ReactElement

const SVGSprite: fnType = ({ name, title = '', className = '' }) => {
    const Sprite = require(`/public/images/${name}.svg?sprite`)

    return (
        <svg
            viewBox={Sprite.viewBox}
            className={`w-full h-full object-contain ${className}`}
        >
            {title && <title>{title}</title>}
            <use xlinkHref={`#${Sprite.id}`} />
        </svg>
    )
}

export default SVGSprite
