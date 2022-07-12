import { useEffect, useState, useRef } from "react";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import SVGSprite from "../util/SVGSprite";
gsap.registerPlugin(ScrollTrigger);

type Props = {
    qa: {
        q: string;
        a: string;
    }
}

const FaqItem = (props: Props) => {
    const {
        qa
    } = props
    const [open, setOpen] = useState(false);
    const faqRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const faqGsap = gsap.timeline()
        if (open) {
            faqGsap
                .to(faqRef.current, {
                    height: "auto",
                    duration: "0.4",
                    ease: "power3.inOut",
                })
                .to(faqRef.current, {
                    opacity: 1,
                    duration: "0.3",
                    ease: "power3.inOut",
                });
        } else {
            faqGsap
                .to(faqRef.current, {
                    opacity: 0,
                    duration: "0.3",
                    ease: "power3.inOut",
                })
                .to(faqRef.current, {
                    height: 0,
                    duration: "0.4",
                    ease: "power3.inOut",
                });

        }
        return () => {
            faqGsap.kill();
        };
    }, [open]);
    return (
        <div key={qa.q} className="u-dotted pb-20 @PC:pb-24 @SP:leading-32">
            <div className='flex gap-7 items-start cursor-pointer' onClick={() => {
                setOpen(!open)
            }}>
                <div className='font-en'>Q.</div>
                <div>{qa.q}</div>
                <div className={`${!open ? "" : "rotate-[180deg]"
                    } mt-12 w-13 h-8 @PC:w-15 @PC:h-9 ml-auto mr-0`}>
                    <SVGSprite name="icon-angle-down" />
                </div>
            </div>
            <div ref={faqRef} className='pointer-events-none h-0 opacity-0'>
                <div className="h-20"></div>
                <div className='bg-beige rounded-20 p-24 @PC:p-32 flex gap-7 items-center'>
                    <div className='font-en'>A.</div>
                    <div>{qa.a}</div>
                </div>
            </div>
        </div>
    );
}

export default FaqItem