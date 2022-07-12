import ContactInputType from '@/types/ContactInputType'

type Props = {
    value?: string
    subject: string
    className?: string
}


const ConfirmItem = (props: Props) => {
    const { value, subject, className = '' } = props
    return (
        <>{value && (
            <div className={`u-dotted pb-20 @PC:pb-24 ${className}`}>
                <div className='@PC:flex items-center gap-64'>
                    <div className='font-bold text-16 @PC:text-24 @PC:w-300 flex-none'>
                        <div>{subject}</div>
                    </div>
                    <div
                        className='mt-2 @PC:mt-0 text-16 @PC:text-24'
                        dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br />') }}>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default ConfirmItem