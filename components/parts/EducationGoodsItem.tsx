import Picture from "../util/Picture"
import Button from "./Button"

type Props = {
    img: string
    name: string
    url: string
}

const EducationGoodsItem = (props: Props) => {
    const { img, name, url } = props
    return (
        <div className="flex flex-col">
            <div className="aspect-[380/537] border border-gray2">
                <Picture name={img} alt={name} isFit={true} />
            </div>
            <div className="text-12 mt-20 text-center @PC:text-20 @PC:mt-32 mb-20 @PC:mb-40">{name}</div>
            <Button isPdf={true} text="ダウンロード" href={url} className="w-full mb-0 mt-auto @PC:max-w-[32rem] @PC:mx-auto" />
        </div>
    )
}

export default EducationGoodsItem
