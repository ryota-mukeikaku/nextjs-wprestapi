import Dotted from "./Dotted"
import TrainingFlowItemDetail1ListItem from "./TrainingFlowItemDetail1ListItem"

type Props = {
    className?: string
}

const TrainingFlowItemDetail1 = (props: Props) => {
    const { className } = props
    return (
        <div className={`${className} @PC:-mb-20`}>
            <div className="text-14 pt-24 @PC:text-20 @PC:pt-24 @PC:leading-40">
                和食文化継承の必要性や和食文化の基本的な知識について学習します。<br />
                本研修には（株）NTTドコモのシステム「gacco」を使用致します。
            </div>
            <Dotted text="プログラム" className="mt-40 mb-32 @PC:mt-64 @PC:mb-40" />
            <TrainingFlowItemDetail1ListItem num="1" text="開催目的" />
            <TrainingFlowItemDetail1ListItem num="2" text="和食とは何か・和食文化" />
            <TrainingFlowItemDetail1ListItem num="3" text="和食の4つの特徴における事例と詳細・歴史など①" />
            <TrainingFlowItemDetail1ListItem num="4" text="和食の4つの特徴における事例と詳細・歴史など②" />
            <TrainingFlowItemDetail1ListItem num="5" text="和食の4つの特徴における事例と詳細・歴史など③" />
            <TrainingFlowItemDetail1ListItem num="6" text="和食の4つの特徴における事例と詳細・歴史など④" />
            <TrainingFlowItemDetail1ListItem num="7" text="和食文化とライフステージ" />
            <TrainingFlowItemDetail1ListItem num="8" text="各地域の郷土料理について" bool={false} />
            <TrainingFlowItemDetail1ListItem num="9" text="食事様式の変遷" bool={false} />
            <TrainingFlowItemDetail1ListItem num="10" text="これからの和食" bool={false} />
            <TrainingFlowItemDetail1ListItem num="11" text="子どもの和食文化の形成を支える" />
            <TrainingFlowItemDetail1ListItem num="12" text="和食文化を育む手法" bool={false} />
        </div>
    )
}

export default TrainingFlowItemDetail1