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
        pref: string,
        date: string,
        agreement: string[],
        job: string,
        year: string,
        information: string,
        mail_information: string,
        known: string,
        known_other: string,
        hope: string[],
        reason: string[],
        reason_other: string
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
                    value={input['pref']}
                    subject="ご自身の職場のある地域"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['agreement'][0]}
                    subject="和食文化継承リーダー認定後に、氏名、所属県が農林水産省「おいしい和食のはなし。」サイト上に掲載されることを承知します"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['date']}
                    subject="実践研修（オンライン）希望日 "
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['job']}
                    subject="職種"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['company']}
                    subject="就業先名"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['year']}
                    subject="在職年数"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={`${input['known']}${input['known'] == "その他（自由記載）" ? "\n" + input['known_other'] : ''}`}
                    subject="知ったきっかけ"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={`${input['reason'].join("\n")}${Object.values(input['reason']).indexOf('その他（自由記載）') > -1 ? "\n" + input['reason_other'] : ''}`}
                    subject="応募した理由"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['hope'].join("\n")}
                    subject="認定後の活動希望"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['information']}
                    subject="和食文化継承リーダーに係るイベント情報などの連絡を希望する"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['mail_information']}
                    subject="地域の和食文化継承ネットワークの加入案内メールの受け取りを希望する"
                />
            </div>
            <div className='mt-20 @PC:mt-24'>
                <ConfirmItem
                    value={input['message']}
                    subject="和食文化を次世代に継承していくうえで、ご自身が課題と感じていること"
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