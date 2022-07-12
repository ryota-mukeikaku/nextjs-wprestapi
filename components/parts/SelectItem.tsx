import ContactInputType from '@/types/ContactInputType'
import SVGSprite from '../util/SVGSprite'

type Props = {
    input: ContactInputType
    setInput: (input: ContactInputType) => void
    name: string
    subject: string
    className?: string
    required?: boolean
    select: string[]
    disabled: string
}


const SelectItem = (props: Props) => {
    const { input, setInput, name, subject, className = '', required = true, select, disabled } = props
    return (
        <div className={className}>
            <div className='flex gap-10 @PC:gap-20 font-bold text-16 @PC:text-24'>
                <div>{subject}
                    {required && (
                        <span className='text-red2 ml-10 @PC:ml-13'>
                            *
                        </span>
                    )}
                </div>
            </div>
            <div className='mt-12 @PC:mt-14'>
                <div className='@PC:w-fit flex items-center relative'>
                    <select
                        className='tracking-5 block font-normal text-15 @PC:text-24 bg-beige2 px-16 py-17 @PC:px-32 @PC:py-21 rounded-10 @PC:rounded-20 font-bold placeholder:text-gray2 w-full @PC:w-293 appearance-none'
                        name={name}
                        value={input[name]}
                        onChange={(e) => {
                            const newState: ContactInputType = { ...input };
                            newState[name] = e.target.value;
                            setInput(newState);
                        }}
                        required={required}
                    >
                        <option value="">{disabled}</option>
                        {select.map((el) => {
                            return (
                                <option key={el} value={el}>{el}</option>
                            )
                        })}
                    </select>
                    <div className='w-12 h-6 @PC:w-13 @PC:h-7 pointer-events-none absolute right-20 '>
                        <SVGSprite name="icon-angle-down" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectItem