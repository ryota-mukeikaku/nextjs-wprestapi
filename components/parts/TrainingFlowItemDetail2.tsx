import Button from "./Button"
import Dotted from "./Dotted"
import TrainingFlowItemDetail2ListItem from "./TrainingFlowItemDetail2ListItem"

type Props = {
    className?: string
}

const TrainingFlowItemDetail2 = (props: Props) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="text-14 pt-24 @PC:text-20 @PC:pt-24 @PC:leading-40">
                実際に保育所や小学校などで和食文化を伝えるための実践的な方法について学習します。<br />
                本年度は全都道府県を対象としておりますので、ご都合の良い日程をお選びください。後半になりますと日程が限られますので、お早めにお申込み下さい。
            </div>
            <Dotted text="テーマ" className="mt-40 @PC:mt-64 @PC:mb-40" />
            <div className="text-18 @PC:text-28 font-bold mt-16">「地域の郷土料理をどう伝えていくか」</div>
            <Dotted text="開催日程" className="mt-40 mb-32 @PC:mt-64 @PC:mb-40" />
            <div className="grid grid-cols-1 @PC:grid-cols-2 gap-x-40" >
                <TrainingFlowItemDetail2ListItem className="" date="10/1(土)" time="12:30～16:00" teacher="藤本先生" />
                <TrainingFlowItemDetail2ListItem className="" date="10/15(土)" time="12:30～16:00" teacher="藤本先生" />
                <TrainingFlowItemDetail2ListItem className="" date="10/22(土)" time="12:30～16:00" teacher="舘岡先生" />
                <TrainingFlowItemDetail2ListItem className="" date="10/29(土)" time="12:30～16:00" teacher="舘岡先生" />
                <TrainingFlowItemDetail2ListItem className="" date="11/5(土)" time="12:30～16:00" teacher="舘岡先生" />
                <TrainingFlowItemDetail2ListItem className="" date="11/18(金)" time="17:30～21:00" teacher="藤本先生" />
                <TrainingFlowItemDetail2ListItem className="" date="11/19(土)" time="12:30～16:00" teacher="舘岡先生" />
                <TrainingFlowItemDetail2ListItem className="" date="11/26(土)" time="12:30～16:00" teacher="藤本先生" />
                <TrainingFlowItemDetail2ListItem className="" date="12/2(金)" time="17:30～21:00" teacher="藤本先生" />
                <TrainingFlowItemDetail2ListItem className="" date="12/10(土)" time="12:30～16:00" teacher="舘岡先生" />
                <TrainingFlowItemDetail2ListItem className="" date="12/16(金)" time="17:30～21:00" teacher="藤本先生" />
                <TrainingFlowItemDetail2ListItem className="" date="12/17(土)" time="12:30～16:00" teacher="舘岡先生" />
                <TrainingFlowItemDetail2ListItem className="" date="12/24(土)" time="12:30～16:00" teacher="舘岡先生" />
                <TrainingFlowItemDetail2ListItem className="" date="1/14(土)" time="12:30～16:00" teacher="舘岡先生" />
                <TrainingFlowItemDetail2ListItem className="" date="1/21(土)" time="12:30～16:00" teacher="藤本先生" />
            </div>
            <div className="text-14 @PC:text-20 mt-10 @PC:mt-50">◎エントリーの際に対象エリアでの実施日程が難しいかたは実践研修の希望日を備考に記載ください。</div>
            <Button isPdf text="ワークシート" href="/" large={true} className="mt-32 @PC:mt-64" />
        </div>
    )
}

export default TrainingFlowItemDetail2