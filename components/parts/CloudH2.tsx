import React, { ReactElement } from 'react'
import SVGSprite from '../util/SVGSprite'
type fnType = (props: {
    en: string,
    jp: string,
    pc: string,
    sp: string,
    className?: string
}) => ReactElement

const CloudH2: fnType = ({ en, jp, className = '', pc, sp }) => {
    return (
        <div
            className={`w-full h-full relative flex items-center ${className}`}
        >
            <div className={`relative z-10 ${sp} ${pc}`}>
                <div className='flex items-center'>
                    <div className='w-8 h-11 @PC:w-15 @PC:h-20'>
                        <SVGSprite name="icon-sticks" />
                    </div>
                    <div className='font-en text-15 @PC:text-30 ml-8 @PC:ml-12'>{en}</div>
                </div>
                <h2 className='u-keep font-bold text-28 @PC:text-56 tracking-5 @PC:tracking-10'>
                    {jp}
                </h2>
            </div>
            <div className='absolute w-full h-full'>
                <SVGSprite name="cloud1" />
            </div>
        </div>
    )
}

export default CloudH2