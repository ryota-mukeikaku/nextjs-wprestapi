import SVGSprite from "../util/SVGSprite"
import Dotted from "./Dotted"

type Props = {
    className?: string
    text: string
    bool?: boolean
    num: string
}

const TrainingFlowItemDetail1ListItem = (props: Props) => {
    const { className, text, bool = true, num } = props
    return (
        <div className={`${className} ${num != '1' ? 'mt-32 @PC:mt-40' : ''} ${num != '12' ? 'u-dotted pb-32 @PC:pb-40' : ''} `}>
            <div className="flex items-center">
                <div className="font-bold text-14 @PC:text-24">
                    第{num}回
                </div>
                <div className="hidden @PC:block @PC:text-24 ml-12 font-bold">
                    {text}
                </div>
                <div className="ml-auto mr-0 text-13 @PC:text-22">
                    理解度チェックテスト
                </div>
                <div
                    className={`mr-0 flex-none ${bool ? 'ml-19 @PC:ml-30 w-24 h-24 @PC:w-33 @PC:h-33' : 'ml-22 @PC:ml-30 w-21 h-21 @PC:w-33 @PC:h-33'}`}
                >
                    {bool && (
                        <SVGSprite name="icon-circle" />
                    )}
                    {!bool && (
                        <SVGSprite name="icon-cross" />
                    )}
                </div>
            </div>
            <div className="text-18 mt-7 font-bold @PC:hidden">
                {text}
            </div>
        </div>
    )
}

export default TrainingFlowItemDetail1ListItem