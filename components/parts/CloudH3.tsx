import React, { ReactElement } from 'react'
import SVGSprite from '../util/SVGSprite'
type fnType = (props: {
    text: string,
    className?: string
}) => ReactElement

const CloudH3: fnType = ({ text, className = '' }) => {
    return (
        <div
            className={`relative w-457 h-162 @PC:w-610 @PC:h-228 flex items-center -left-100 @PC:left-230 ${className}`}
        >
            <div className='relative z-10 flex items-center gap-12 @PC:gap-19 pt-18 pl-123 @PC:pt-32 @PC:pl-89'>
                <div className='w-16 h-21 @PC:w-21 @PC:h-29 flex-none'>
                    <SVGSprite name="icon-sticks" />
                </div>
                <h3 className='font-bold text-28 @PC:text-40'>
                    {text}
                </h3>
            </div>
            <div className='absolute w-full h-full'>
                <SVGSprite name="cloud2" />
            </div>
        </div>
    )
}

export default CloudH3