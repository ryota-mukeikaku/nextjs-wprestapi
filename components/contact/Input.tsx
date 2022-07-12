import ContactInputType from '@/types/ContactInputType'
import InputItem from "@/components/parts/InputItem";
import SubmitItem from '@/components/parts/SubmitItem'
import { useRef } from "react"

type Props = {
    input: ContactInputType
    error: boolean
    setStepHundler: (mode: string) => void
    setInput: (input: ContactInputType) => void
}

const Input = (props: Props) => {
    const { input, setInput, error, setStepHundler } = props
    const formRef = useRef<HTMLFormElement>(null)
    return (
        <form ref={formRef}>
            {error && (
                <div className='font-bold text-red mb-40'>
                    ※入力内容に誤りがあります。
                </div>
            )}
            <div className='@PC:flex gap-40'>
                <InputItem
                    input={input}
                    setInput={setInput}
                    name="firstname"
                    subject="姓"
                    className="w-full"
                    placeholder="和食"
                />
                <InputItem
                    input={input}
                    setInput={setInput}
                    name="lastname"
                    subject="名"
                    className="w-full"
                    placeholder="太郎"
                />
            </div>
            <div className='@PC:flex gap-40 mt-40 @PC:mt-64'>
                <InputItem
                    input={input}
                    setInput={setInput}
                    name="firstname_kana"
                    subject="姓（ふりがな）"
                    className="w-full"
                    placeholder="わしょく"
                />
                <InputItem
                    input={input}
                    setInput={setInput}
                    name="lastname_kana"
                    subject="名（ふりがな）"
                    className="w-full"
                    placeholder="たろう"
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <InputItem
                    input={input}
                    setInput={setInput}
                    name="email"
                    subject="メールアドレス"
                    className=""
                    placeholder="foodculture@pasona-nouentai.co.jp"
                    type="email"
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <InputItem
                    input={input}
                    setInput={setInput}
                    name="email_confirm"
                    subject="メールアドレス（確認用）"
                    className=""
                    placeholder=""
                    type="email"
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <InputItem
                    input={input}
                    setInput={setInput}
                    name="tel"
                    subject="電話番号"
                    className=""
                    placeholder=""
                    pattern="^[-\d]{10,14}$"
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <InputItem
                    input={input}
                    setInput={setInput}
                    name="company"
                    subject="所属"
                    className=""
                    placeholder=""
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <InputItem
                    input={input}
                    setInput={setInput}
                    name="message"
                    subject="お問合わせ内容"
                    className=""
                    placeholder=""
                    type="textarea"
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <SubmitItem
                    text="この内容で確認する"
                    className='@PC:max-w-[69rem] mx-auto'
                    setStepHundler={setStepHundler}
                    mode="confirm"
                    formRef={formRef}
                />
            </div>
        </form>
    )
}

export default Input