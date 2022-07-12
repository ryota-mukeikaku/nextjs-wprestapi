import TrainingFlowItem from "./parts/TrainingFlowItem"
import TrainingFlowItemDetail1 from "./parts/TrainingFlowItemDetail1"
import TrainingFlowItemDetail2 from "./parts/TrainingFlowItemDetail2"
import TrainingFlowItemDetail3 from "./parts/TrainingFlowItemDetail3"
import TrainingFlowItemDetail4 from "./parts/TrainingFlowItemDetail4"

type Props = {
    className?: string
}

const TrainingFlow = (props: Props) => {
    const { className } = props
    return (
        <div className={`${className} u-dotted`}>
            <TrainingFlowItem
                className=""
                num="1"
                subject="基礎研修"
                desc="専用テキストを全12回のオンデマンド講座（動画）で受講し、理解度チェックテストを受ける。"
                more={() => <TrainingFlowItemDetail1 />}
            />
            <TrainingFlowItem
                className=""
                num="2"
                subject="実践研修"
                desc="実際に保育所や小学校などで和食文化を伝えるための実践的な方法について学習します。
                本年度は全都道府県を対象としておりますので、ご都合の良い日程をお選びください。後半になりますと日程が限られますので、お早めにお申込み下さい。"
                more={() => <TrainingFlowItemDetail2 />}
            />
            <TrainingFlowItem
                className=""
                num="3"
                subject="実地研修"
                desc="研修内容を踏まえて、ご自身の職場などで実践を行い、その内容をレポート提出。"
                more={() => <TrainingFlowItemDetail3 />}
            />
            <TrainingFlowItem
                className=""
                num="4"
                subject="認定証の発行"
                desc="全ての課程を終えた方に対して、和食文化継承リーダーに認定します。"
                more={() => <TrainingFlowItemDetail4 />}
            />
        </div>
    )
}

export default TrainingFlow