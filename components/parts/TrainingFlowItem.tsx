import { useEffect, useState, useRef } from "react";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SVGSprite from "../util/SVGSprite";

gsap.registerPlugin(ScrollTrigger);

type Props = {
    className?: string
    num: string
    subject: string
    desc: string
    // more: any
    more: React.FC
}

const TrainingFlowItem = (props: Props) => {
    const { className, num, subject, desc, more } = props
    const [open, setOpen] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const itemGsap = gsap.timeline()
        if (open) {
            itemGsap
                .to(buttonRef.current, {
                    opacity: 0,
                    duration: "0.3",
                    ease: "power3.inOut",
                })
                .to(buttonRef.current, {
                    height: "0",
                    duration: "0.4",
                    ease: "power3.inOut",
                }, 'show')
                .to(itemRef.current, {
                    height: "auto",
                    duration: "0.4",
                    ease: "power3.inOut",
                }, 'show')
                .to(buttonRef.current, {
                    display: 'none'
                }, 'show')
                .to(itemRef.current, {
                    opacity: 1,
                    duration: "0.3",
                    ease: "power3.inOut",
                });
        } else {
            itemGsap
                .to(itemRef.current, {
                    opacity: 0,
                    duration: "0.3",
                    ease: "power3.inOut",
                })
                .to(itemRef.current, {
                    height: 0,
                    duration: "0.4",
                    ease: "power3.inOut",
                });

        }
        return () => {
            itemGsap.kill();
        };
    }, [open]);
    return (
        <div className={`${className} ${num != '1' ? '@SP:mt-39' : '@SP:mt-60'} flex flex-col @PC:flex-row items-center @PC:items-stretch @PC:gap-40 @PC:pt-60 @PC:min-h-[15rem]`}>
            <div className="flex-none flex items-center justify-center relative bg-beige w-150 h-150 @PC:w-152 @PC:h-152 rounded-half">
                <div className="w-58 h-58 @PC:w-58 @PC:h-58">
                    <SVGSprite name={`training-flow-${num}`} />
                </div>
                <div className="absolute flex items-center justify-center bg-white rounded-half font-en font-bold w-58 h-58 @PC:w-58 @PC:h-58 @PC:text-24 -right-10 -top-10 @PC:-top-10 @PC:-right-10">
                    {num}
                </div>
            </div>
            <div className={`${num != '4' ? 'u-dotted' : ''} w-full pb-39 @PC:pb-64`}>
                <div className="">
                    <div className="text-center @PC:text-left font-bold @SP:mt-26 text-18 @PC:text-24">{subject}</div>
                    <div className="text-15 @PC:text-24 mt-20 @PC:mt-6">{desc.replace(/\n/g, '<br />')}</div>
                </div>
                <div>
                    <div
                        className=" @PC:mt-18 cursor-pointer flex items-center gap-11 @PC:gap-13 @SP:mt-20 @SP:w-fit @SP:mx-auto"
                        onClick={() => setOpen(true)}
                        ref={buttonRef}
                    >
                        <div className="text-14 @PC:text-22 underline">詳細を見る</div>
                        <div className="w-13 h-8 @PC:w-15 @PC:h-9">
                            <SVGSprite name="icon-angle-down" />
                        </div>
                    </div>
                    <div ref={itemRef} className="h-0 opacity-0">
                        {more({})}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainingFlowItem