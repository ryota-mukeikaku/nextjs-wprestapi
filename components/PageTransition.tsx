import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { gsap } from 'gsap'
import ScrollCancel from '../utils/ScrollCancel'

type Props = {
    setPageTransitioning: (value: boolean) => void
}

const PageTransition = (props: Props) => {
    const router = useRouter()
    const { setPageTransitioning } = props
    const pageTransitionRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(true)
    const [animating, setAnimating] = useState(true)

    const scrollCancel = new ScrollCancel()

    useEffect(() => {
        const routeChangeComplete = (url: string) => {
            if (url !== router.pathname) {
                setLoading(false)
            }
        }
        router.events.on('routeChangeComplete', routeChangeComplete)

        return () => {
            router.events.off('routeChangeComplete', routeChangeComplete)
        }
    }, [router.events])

    useEffect(() => {
        if (!loading) {
            return
        }
        scrollCancel.set(true)
        const pageTransitionGsap = gsap.to(pageTransitionRef.current, {
            opacity: 1,
            duration: 0.05,
            onComplete: () => {
                scrollCancel.set(false)
                window.scrollTo(0, 0)
                setAnimating(false)
            }
        })
        return () => {
            scrollCancel.clear()
            pageTransitionGsap.kill()
        }
    }, [])

    useEffect(() => {
        if (loading === false && animating === false) {
            scrollCancel.set(true)
            const pageTransitionGsap = gsap.to(pageTransitionRef.current, {
                opacity: 0,
                duration: 0.1,
                onComplete: () => {
                    setPageTransitioning(false)
                    scrollCancel.set(false)
                }
            })
            return () => {
                scrollCancel.clear()
                pageTransitionGsap.kill()
            }
        }
    }, [loading, animating])

    return (
        <>
            <div
                ref={pageTransitionRef}
                className='fixed w-full h-full bg-gray-dark top-0 left-0 opacity-0 z-[10000]'
            />
        </>
    )
}

export default PageTransition
