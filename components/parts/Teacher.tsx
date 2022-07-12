import Picture from "../util/Picture"
import Dotted from "./Dotted"

type Props = {
    h4: string
    num: string
    position: string
    name: string
    honorific: string
    en: string
    profile: string[]
}

const Teacher = (props: Props) => {
    const {
        h4,
        num,
        position,
        name,
        honorific,
        en,
        profile
    } = props
    return (
        <div>
            <h4>
                <Dotted text={h4} />
            </h4>
            <div className="mt-24 @PC:mt-22 rounded-60 @PC:rounded-[12rem] relative z-10 overflow-hidden">
                <Picture name={`training-teacher-${num}.png`} alt={name} isFit={true} className="aspect-square" />
            </div>
            <div className="mt-27 @PC:mt-40 text-15 @PC:text-20">{position}</div>
            <h5 className="mt-10 @PC:mt-10 font-bold text-25 @PC:text-36">
                {name}
                <span className="ml-12 @PC:ml-17 text-16 @PC:text-24">{honorific}</span>
            </h5>
            <div className="@PC:-mt-6 font-en text-14 @PC:text-18">{en}</div>
            <div className="mt-14 @PC:mt-28">
                {profile.map((el) => {
                    return (
                        <div key={el} className="mt-10 @PC:mt-0 first:mt-0">
                            <Dotted text={el} isSmall={true} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Teacher