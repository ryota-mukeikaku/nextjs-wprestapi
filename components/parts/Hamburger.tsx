type Props = {
    open: boolean
    setOpen: (value: boolean) => void
}

const Hamburger = (props: Props) => {
    const { open, setOpen } = props

    const lineStyle = {
        common: 'w-40 h-2 bg-white absolute left-10 top-29 origin-center transition-all',
        close: {
            line1: '-translate-y-10',
            line2: '',
            line3: 'translate-y-10'
        },
        open: {
            line1: 'translate-y-0 rotate-[30deg]',
            line2: 'scale-x-0',
            line3: 'translate-y-0 -rotate-[30deg]'
        }
    }

    return (
        <div
            className='w-60 h-60 bg-gray-dark relative cursor-pointer'
            onClick={() => {
                setOpen(!open)
            }}
        >
            <div
                className={`${lineStyle.common} ${
                    open ? lineStyle.open.line1 : lineStyle.close.line1
                }`}
            />
            <div
                className={`${lineStyle.common} ${
                    open ? lineStyle.open.line2 : lineStyle.close.line2
                }`}
            />
            <div
                className={`${lineStyle.common} ${
                    open ? lineStyle.open.line3 : lineStyle.close.line3
                }`}
            />
        </div>
    )
}

export default Hamburger
