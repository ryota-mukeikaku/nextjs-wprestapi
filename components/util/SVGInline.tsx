import React, { ReactElement } from 'react'
type fnType = (props: {
    name: string
    className?: string
}) => ReactElement

const SVGInline: fnType = ({ name, className = '' }) => {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{
                __html: require(`/public/images/${name}.svg?include`)
            }}
        />
    )
}

export default SVGInline