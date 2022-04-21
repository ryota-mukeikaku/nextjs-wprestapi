import { useRef, useEffect } from 'react'

import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function SplitText(props) {
    const wrapperRef = useRef()
    useEffect(() => {
        const TextGsapTimeline = gsap
            .timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top 85%'
                }
            })
            .fromTo(
                wrapperRef.current.children,
                {
                    opacity: 0,
                    y: '4rem'
                },
                {
                    opacity: 1,
                    y: '0',
                    stagger: {
                        from: 'start',
                        amount: 0.65
                    }
                }
            )
        return () => TextGsapTimeline.kill()
    }, [])

    return (
        <div ref={wrapperRef} className='h-fit w-fit overflow-hidden flex'>
            {Array.from(props.children).map((str, index) => {
                return (
                    <span
                        className={`opacity-0 block ${
                            str == ' ' ? 'ml-7' : ''
                        }`}
                        key={index}
                    >
                        {str}
                    </span>
                )
            })}
        </div>
    )
}
