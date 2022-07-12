import ContactInputType from '@/types/ContactInputType'
import InputItem from "@/components/parts/InputItem";
import SubmitItem from '@/components/parts/SubmitItem'
import { useRef } from "react"
import { Pref, Job, Year } from '@/libs/ApplicationFormSelects'
import SelectItem from '../parts/SelectItem';
import { Agreement, Date, Known, Reason, Hope, Information, MailInformation } from '@/libs/ApplicationFormInputList'
import RadioCheckItem from '../parts/RadioCheckItem';

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
                <RadioCheckItem
                    input={input}
                    setInput={setInput}
                    name="agreement"
                    subject="和食文化継承リーダーに認定された場合は、氏名、所属県が農林水産省「おいしい和食のはなし。」サイト上に掲載されることを承知します"
                    className=""
                    type="checkbox"
                    item={Agreement}
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <RadioCheckItem
                    input={input}
                    setInput={setInput}
                    name="date"
                    subject="実践研修（オンライン）希望日"
                    className=""
                    type="radio"
                    item={Date}
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <SelectItem
                    input={input}
                    setInput={setInput}
                    name="pref"
                    subject="ご自身の職場のある地域"
                    className=""
                    disabled='都道府県を選択'
                    select={Pref}
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <SelectItem
                    input={input}
                    setInput={setInput}
                    name="job"
                    subject="職種"
                    className=""
                    disabled='職種を選択'
                    select={Job}
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <InputItem
                    input={input}
                    setInput={setInput}
                    name="company"
                    subject="就業先名"
                    className=""
                    placeholder=""
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <SelectItem
                    input={input}
                    setInput={setInput}
                    name="year"
                    subject="在職年数"
                    className=""
                    disabled='年数を選択'
                    select={Pref}
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <RadioCheckItem
                    input={input}
                    setInput={setInput}
                    name="known"
                    subject="知ったきっかけ"
                    className=""
                    type="radio"
                    item={Known}
                    other={true}
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <RadioCheckItem
                    input={input}
                    setInput={setInput}
                    name="reason"
                    subject="応募した理由を教えてください。（複数選択可）"
                    className=""
                    type="checkbox"
                    item={Reason}
                    other={true}
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <RadioCheckItem
                    input={input}
                    setInput={setInput}
                    name="hope"
                    subject="認定後の活動希望について教えてください。（複数選択可）"
                    className=""
                    type="checkbox"
                    item={Hope}
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <RadioCheckItem
                    input={input}
                    setInput={setInput}
                    name="information"
                    subject="和食文化継承リーダーに係るイベントなどの情報の連絡を希望しますか？"
                    className=""
                    type="radio"
                    item={Information}
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <RadioCheckItem
                    input={input}
                    setInput={setInput}
                    name="mail_information"
                    subject="地域の和食文化継承ネットワーク （事務局：地方農政局など）の加入案内メールの受け取りを希望しますか？"
                    className=""
                    type="radio"
                    item={MailInformation}
                    note="地域における食文化の保護・継承につなげる取り組みをより一層進めるため国が事務局となって、各地域内の関係者のネットワーク化を図っています。定期的に和食文化に関するセミナーや勉強会などのイベント情報や保護・継承活動に使える予算（活動費）などの情報が入手できます。"
                />
            </div>
            <div className='mt-40 @PC:mt-64'>
                <InputItem
                    input={input}
                    setInput={setInput}
                    name="message"
                    subject="和食文化を次世代に継承していくうえで、ご自身が課題と感じていることを教えてください。（自由記載）"
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