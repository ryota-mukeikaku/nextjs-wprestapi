import SVGSprite from "../util/SVGSprite"
import Dotted from "./Dotted"

type Props = {
    className?: string
    date: string
    time: string
    teacher: string
}

const TrainingFlowItemDetail2ListItem = (props: Props) => {
    const { className, date, time, teacher, } = props
    return (
        <div className={`${className} u-dotted text-16 @PC:text-24 pb-20 mb-20`}>
            <div className="flex items-center">
                <div className="font-bold w-108 @PC:w-183 flex-none">
                    {date}
                </div>
                <div>
                    {time}
                </div>
                <div className="ml-auto mr-0">
                    {teacher}
                </div>
            </div>
        </div>
    )
}

export default TrainingFlowItemDetail2ListItem