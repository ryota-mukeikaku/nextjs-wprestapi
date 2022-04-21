import { useRef, useEffect } from 'react'

import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function FadeTransition(props) {
    const fadeRef = useRef()
    useEffect(() => {
        const fadeGsap = gsap.fromTo(
            fadeRef.current,
            {
                opacity: 0,
                y: '4rem'
            },
            {
                opacity: 1,
                y: '0',
                scrollTrigger: {
                    trigger: fadeRef.current,
                    start: 'top 75%'
                },
                duration: 1
            }
        )
        return () => fadeGsap.kill()
    }, [])

    return (
        <div className='w-full'>
            <div className='opacity-0 w-full' ref={fadeRef}>
                {props.children}
            </div>
        </div>
    )
}
