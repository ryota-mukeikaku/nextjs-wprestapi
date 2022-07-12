type Props = {
    text: string
    isSmall?: boolean
    isMedium?: boolean
    className?: string
}
const Dotted = (props: Props) => {
    const { text, isSmall = false, isMedium = false, className = "" } = props
    let wrapperStyle: string = ''
    let dotStyle: string = ''
    let textStyle: string = ''
    if (isSmall) {
        wrapperStyle = 'gap-12'
        dotStyle = 'w-10 h-10 @PC:w-9 @PC:h-9 translate-y-7 @PC:translate-y-9'
        textStyle = 'text-14 leading-24 @PC:text-16 @PC:leading-28'
    } else if (isMedium) {
        wrapperStyle = 'gap-12 @PC:gap-20'
        dotStyle = 'w-14 h-14 @PC:w-16 @PC:h-16 translate-y-8 @PC:translate-y-15'
        textStyle = 'text-15 leading-32 @PC:text-24 @PC:leading-48'
    } else {
        wrapperStyle = 'gap-12 @PC:gap-20'
        dotStyle = 'w-14 h-14 @PC:w-16 @PC:h-16 translate-y-8 @PC:translate-y-16'
        textStyle = 'font-bold text-19 leading-32 @PC:text-28 @PC:leading-50'
    }
    return (
        <div className={`flex ${wrapperStyle} ${className}`}>
            <div className={`flex-none bg-orange rounded-half ${dotStyle}`} />
            <div className={`${textStyle}`}>{text}</div>
        </div>
    )
}

export default Dotted