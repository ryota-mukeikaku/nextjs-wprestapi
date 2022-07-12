import ContactInputType from '@/types/ContactInputType'
import SVGSprite from '../util/SVGSprite'

type Props = {
    input: ContactInputType
    setInput: (input: ContactInputType) => void
    name: string
    subject: string
    className?: string
    required?: boolean
    type: string
    item: string[]
    other?: boolean
    note?: string
}


const RadioCheckItem = (props: Props) => {
    const { input, setInput, name, subject, className = '', required = true, type = "radio", item, other = false, note = '' } = props
    // console.log(item)
    return (
        <div className={`${className} mt-27 @PC:mt-16`}>
            <div className='flex gap-10 @PC:gap-20 font-bold text-16 @PC:text-24'>
                <div>{subject}
                    {required && (
                        <span className='text-red2 ml-10 @PC:ml-13'>
                            *
                        </span>
                    )}
                </div>
            </div>
            {note != '' && (
                <div className='flex leading-21 text-14 @PC:leading-24 @PC:text-16 mt-10 @PC:'>
                    <div>*</div>
                    <div>{note}</div>
                </div>
            )}
            <div className='mt-12 @PC:mt-14'>
                <div>
                    {item.map((val, i) => {
                        return (
                            <label key={val} className='flex gap-16 @PC:gap-24 cursor-pointer mt-21 @PC:mt-2 first:mt-0'>
                                <div className=''>
                                    {type == 'radio' && (
                                        <>
                                            <input
                                                className='appearance-none hidden'
                                                type="radio"
                                                value={val}
                                                checked={val == input[name]}
                                                onChange={(e) => {
                                                    const newState: ContactInputType = { ...input };
                                                    newState[name] = e.target.value;
                                                    setInput(newState);
                                                }}
                                            />
                                            <div className='flex items-center justify-center w-21 h-21 @PC:w-24 @PC:h-24 border border-gray translate-y-5 @PC:translate-y-12 rounded-half'>
                                                <div className={`w-11 h-11 @PC:w-12 @PC:h-12 rounded-half bg-orange transition-transform ${(val == input[name]) ? 'scale-100' : 'scale-0'}`} />
                                            </div>
                                        </>
                                    )}
                                    {type == "checkbox" && (
                                        <>
                                            <input
                                                className='appearance-none hidden'
                                                type="checkbox"
                                                value={val}
                                                checked={Object.values(input[name]).indexOf(val) > -1}
                                                onChange={(e) => {
                                                    const newState: ContactInputType = { ...input };
                                                    if (Object.values(newState[name]).indexOf(e.target.value) > -1) {
                                                        newState[name] = newState[name].filter((el: string) => {
                                                            return el != e.target.value
                                                        })
                                                    } else {
                                                        newState[name].push(e.target.value)
                                                    }
                                                    setInput(newState);
                                                }}
                                            />
                                            <div className='flex items-center justify-center w-21 h-21 @PC:w-24 @PC:h-24 border border-gray translate-y-5 @PC:translate-y-12 rounded-3'>
                                                <div className={`w-16 h-13 @PC:w-17 @PC:h-15 transition-transform ${(val != undefined && Object.values(input[name]).indexOf(val) > -1) ? 'scale-100' : 'scale-0'}`}>
                                                    <SVGSprite name="icon-check" />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className='tracking-10 text-15 leading-30 @PC:text-24 @PC:leading-50'>{val}</div>
                            </label>
                        )
                    })}
                    {other && (
                        <div className='mt-12 @PC:mt-24 ml-37 @PC:ml-48'>
                            <textarea
                                className='min-h-[26rem] @PC:min-h-[12rem] text-15 @PC:text-24 bg-beige2 px-16 py-17 @PC:px-32 @PC:py-15 rounded-10 @PC:rounded-20 font-bold placeholder:text-gray2 w-full'
                                name={`${name}_other`}
                                onChange={(e) => {
                                    const newState: ContactInputType = { ...input };
                                    newState[`${name}_other`] = e.target.value;
                                    setInput(newState);
                                }}
                                disabled={
                                    (
                                        (
                                            type == "checkbox" && Object.values(input[name]).indexOf('その他（自由記載）') > -1
                                        ) || (
                                            type == "radio" && input[name] == 'その他（自由記載）'
                                        )
                                    ) ? false : true
                                }
                                value={(
                                    (
                                        type == "checkbox" && Object.values(input[name]).indexOf('その他（自由記載）') > -1
                                    ) || (
                                        type == "radio" && input[name] == 'その他（自由記載）'
                                    )
                                ) ? input[`${name}_other`] : ''
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RadioCheckItem