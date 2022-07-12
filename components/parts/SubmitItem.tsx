import SVGSprite from "../util/SVGSprite"

type Props = {
    text: string
    className?: string
    setStepHundler: (mode: string) => void
    mode: string
    formRef: any
}

const SubmitItem = (props: Props) => {
    const { text, className = "", setStepHundler, mode, formRef } = props
    return (
        <button
            className={`flex items-center justify-center relative w-full border h-70 @PC:h-140 rounded-35 @PC:rounded-70 gap-x-8 @PC:gap-x-16 ${className}`}
            onClick={(e) => {
                formRef.current.reportValidity()
                setStepHundler(mode);
                e.preventDefault()
            }}
        >
            <div className={`text-16 @PC:text-20`}>{text}</div>
            <div className={`w-11 h-11 @PC:w-14 @PC:h-14`}>
                <SVGSprite name="icon-arrow" />
            </div>
        </button>
    )
}

export default SubmitItem