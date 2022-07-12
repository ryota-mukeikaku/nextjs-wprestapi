import ContactInputType from '@/types/ContactInputType'

type Props = {
    input: ContactInputType
    setInput: (input: ContactInputType) => void
    name: string
    subject: string
    className?: string
    placeholder?: string
    required?: boolean
    type?: string
    pattern?: string
}


const InputItem = (props: Props) => {
    const { input, setInput, name, subject, className = '', placeholder = "", required = true, type = "text", pattern = "" } = props
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
            <div className='mt-12 @PC:mt-24'>
                {type != "textarea" && (
                    <input
                        className='text-15 @PC:text-24 bg-beige2 px-16 py-17 @PC:px-32 @PC:py-15 rounded-10 @PC:rounded-20 font-bold placeholder:text-gray2 w-full'
                        name={name}
                        placeholder={placeholder}
                        value={input[name]}
                        type={type}
                        pattern={pattern != "" ? pattern : undefined}
                        onChange={(e) => {
                            const newState: ContactInputType = { ...input };
                            newState[name] = e.target.value;
                            setInput(newState);
                        }}
                        required={required}
                    />
                )}
                {type == "textarea" && (
                    <textarea
                        className='min-h-[17rem] @PC:min-h-[30rem] text-15 @PC:text-24 bg-beige2 px-16 py-17 @PC:px-32 @PC:py-15 rounded-10 @PC:rounded-20 font-bold placeholder:text-gray2 w-full'
                        name={name}
                        placeholder={placeholder}
                        value={input[name]}
                        onChange={(e) => {
                            const newState: ContactInputType = { ...input };
                            newState[name] = e.target.value;
                            setInput(newState);
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default InputItem