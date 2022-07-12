import Button from "./Button"

type Props = {
    className?: string
}

const TrainingFlowItemDetail3 = (props: Props) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="text-14 pt-24 @PC:text-20 @PC:pt-24 @PC:leading-40">
                これまで学んだことを活かし、ご自身の職場等で、学んだことを活用して和食文化継承に関する実践を行っていただきます。 その取り組みに関して、gaccoサイト内の報告フォーマットを使用してレポートを作成して頂き、提出をしていただきます。内容については、gaccoサイト内のレポートフォームにて報告してください。
            </div>
            <Button icon={{ name: "icon-doc", className: "w-17 h-20 @PC:w-11 @PC:h-13" }} text="ワークシート" href="/" large={true} className="mt-32 @PC:mt-64" />
        </div>
    )
}

export default TrainingFlowItemDetail3