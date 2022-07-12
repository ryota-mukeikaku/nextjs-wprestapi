import React, { useEffect, useState, useRef } from "react";
import SteamSVG from "@/libs/SteamSvg";

import { gsap } from 'gsap/dist/gsap'
import Picture from "./util/Picture";

type Props = {
    setLoaded: (value: boolean) => void
}

const Steam = (props: Props) => {
    const { setLoaded } = props
    const wrapperRef = useRef<HTMLDivElement>(null)
    const gsapArr: any = []

    useEffect(() => {
        resize();
        window.addEventListener('resize', () => resize())
        setTimeout(() => {

            start()

        }, 1800)

        return (() => {
            window.removeEventListener('resize', () => resize())
            gsapArr.map((el: any, i: number) => {
                gsapArr[i].kill()
            })
        })
    }, [])

    const start = () => {
        SteamSVG.map((el, i) => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            svg.setAttribute("viewBox", `0 0 ${el.w} ${el.h}`)
            svg.setAttribute("width", el.w.toString())
            svg.setAttribute("height", el.h.toString())
            svg.style.transformOrigin = "center"
            const path = document.createElementNS('http://www.w3.org/2000/svg', "path")
            path.setAttribute("d", el.path)
            path.setAttribute("fill", "#FFF3DC")
            svg.appendChild(path)
            svg.style.position = "absolute"
            wrapperRef.current?.appendChild(svg)
            gsapArr[i] = gsap.fromTo(svg, {
                scale: 0,
                x: el.x - el.w / 2,
                y: el.y - el.h / 2,
                width: el.w,
                height: el.h
            }, {
                scale: el.scaledW / el.w,
                x: el.toX ? el.toX - el.w / 2 : el.x - el.w / 2,
                y: el.toY ? el.toY - el.h / 2 : el.y - el.h / 2,
                duration: 1.2 - el.delay,
                delay: el.delay,
                ease: "power1.out",
                onComplete: () => {
                    gsapArr[22] = gsap.fromTo(wrapperRef.current, {
                        maskImage: 'linear-gradient(110deg, rgba(0,0,0,0) -20%, rgba(0,0,0,1) 0%)'
                    }, {
                        maskImage: 'linear-gradient(110deg, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 120%)',
                        duration: 1.2,
                        onComplete: () => setLoaded(true)
                    })
                }
            })
        })
    }

    const resize = () => {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        if (!wrapperRef.current) {
            return
        }
        const wrapperRect = wrapperRef.current.getBoundingClientRect()
        const wrapperRatio = wrapperRect.width / wrapperRect.height
        const windowRatio = windowWidth / windowHeight
        let scale = 0
        let x = 0
        let y = 0
        if (windowRatio > wrapperRatio) {
            scale = windowWidth / wrapperRect.width
            x = 0
            y = windowHeight / 2 - (wrapperRect.height * scale) / 2
        } else {
            scale = windowHeight / wrapperRect.height
            x = windowWidth / 2 - (wrapperRect.width * scale) / 2
            y = 0
        }
        wrapperRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    }
    return (
        <div ref={wrapperRef} className="bg-white pointer-events-none w-[192rem] h-[108rem] z-[999] origin-top-left fixed top-0 left-0 overflow-hidden">
            <div className="w-85 h-107 @PC:w-108 @PC:h-136 fixed top-half left-half -translate-x-half -translate-y-half">
                <Picture name="loading.gif" />
            </div>
        </div>
    )
    // return (
    //     <div
    //         className="bg-orange fixed top-0 left-0 w-[100vw] h-[100vh]"
    //     >
    //     </div>
    // )
}

export default Steam