import Button from "./Button"
import Dotted from "./Dotted"

type Props = {
    subject: string
    child: string
    teacher: string
    className?: string
}

const EducationPrintItem = (props: Props) => {
    const { subject, child, teacher, className } = props
    return (
        <div className={className}>
            <Dotted isMedium={true} text={subject} />
            <div className="grid gap-24 mt-20 @PC:gap-40 @PC:mt-30">
                <Button text="児童用" href={child} isPdf={true} large={true} />
                <Button text="教師用" href={teacher} isPdf={true} large={true} />
            </div>
        </div>
    )
}

export default EducationPrintItem