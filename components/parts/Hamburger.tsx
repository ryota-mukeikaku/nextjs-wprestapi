import SVGSprite from "../util/SVGSprite"

type Props = {
    open: boolean
    setOpen: (value: boolean) => void
}

const Hamburger = (props: Props) => {
    const { open, setOpen } = props

    const lineStyle = {
        common: 'w-31 h-3 absolute left-10 top-5 origin-center transition-all',
        close: {
            line1: '-translate-y-5',
            line2: 'translate-y-0',
            line3: 'translate-y-5'
        },
        open: {
            line1: 'translate-y-0 rotate-[20deg]',
            line2: 'opacity-0',
            line3: 'translate-y-0 -rotate-[20deg]'
        }
    }

    return (
        <div
            className='z-50 w-55 h-30 relative right-10 cursor-pointer @PC:hidden'
            onClick={() => {
                setOpen(!open)
            }}
        >
            <div
                className={`${lineStyle.common} ${open ? lineStyle.open.line1 : lineStyle.close.line1
                    }`}
            >
                <SVGSprite name="icon-hamburger" />
            </div>
            <div
                className={`${lineStyle.common} ${open ? lineStyle.open.line2 : lineStyle.close.line2
                    }`}
            >
                <SVGSprite name="icon-hamburger" />
            </div>
            <div
                className={`${lineStyle.common} ${open ? lineStyle.open.line3 : lineStyle.close.line3
                    }`}
            >
                <SVGSprite name="icon-hamburger" />
            </div>
            <div className="text-10 font-bold absolute -bottom-6 w-full text-center">
                {`${(open) ? '閉じる' : 'おしながき'}`}
            </div>
        </div>
    )
}

export default Hamburger
