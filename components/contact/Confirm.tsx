import ConfirmItem from '@/components/parts/ConfirmItem'
import SubmitItem from '../parts/SubmitItem';
import { useRef } from "react"
import BackItem from '../parts/BackItem';

type Props = {
    input: {
        firstname: string,
        lastname: string,
        firstname_kana: string,
        lastname_kana: string,
        email: string,
        email_confirm: string,
        tel: string,
        company: string,
        message: string,
    };
    setStepHundler: (mode: string) => void
}

const Confirm = (props: Props) => {
    const { input, setStepHundler } = props
    const formRef = useRef<HTMLFormElement>(null)
    return (
        <form ref={formRef}>
            <div className=''>
                <ConfirmItem
                    value={`${input['firstname']} ${input['lastname']}`}
                    subject="名前"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={`${input['firstname_kana']} ${input['lastname_kana']}`}
                    subject="ふりがな"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['email']}
                    subject="メールアドレス"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['tel']}
                    subject="電話番号"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['company']}
                    subject="所属"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['message']}
                    subject="お問合わせ内容"
                />
            </div>
            <div className='mt-40 @PC:mt-64 @PC:flex flex-row-reverse'>
                <SubmitItem
                    text="この内容で送信する"
                    className='@PC:max-w-[69rem] mx-auto'
                    setStepHundler={setStepHundler}
                    mode="submit"
                    formRef={formRef}
                />
                <div className='mx-auto w-fit mt-40'>
                    <BackItem
                        setStepHundler={setStepHundler}
                    />
                </div>
            </div>
        </form>
    )
}

export default Confirm