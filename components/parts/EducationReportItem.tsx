import Button from "./Button"
import Dotted from "./Dotted"
import Youtube from "./Youtube"

type Props = {
    school: string
    report: string
    parent: string
    child: string
    youtube: string
    caption: string
}

const EducationReportItem = (props: Props) => {
    const {
        school, report, parent, child, youtube, caption
    } = props
    return (
        <div>
            <div className="layout-special">
                <Dotted text={school} />
                <div className="grid grid-cols-1 @PC:grid-cols-3 gap-y-20 gap-x-70 @PC:mt-38">
                    <Button text="レポートブック" isPdf={true} href={report} large={true} />
                    <Button text="保護者アンケート" isPdf={true} href={parent} large={true} />
                    <Button text="生徒アンケート" isPdf={true} href={child} large={true} />
                </div>
            </div>
            <div className="layout-small-youtube mt-40 @PC:mt-80">
                <Youtube id={youtube} />
                <div className="font-bold text-18 mt-24 @PC:text-27 @PC:mt-40">{caption}</div>
            </div>
        </div>
    )
}

export default EducationReportItem