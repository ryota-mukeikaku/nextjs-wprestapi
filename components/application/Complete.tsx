import Button from "../parts/Button"

const Complete = () => {
    return (
        <>
            <h2>お申し込みありがとうございます。</h2>
            <p>ご入力いただいたメールアドレス宛に、お申込み内容についての確認メールをお送りいたしましたので、ご確認をお願いいたします。</p>
            <p>お申し込み内容を訂正したい場合は、運営事務局（washoku@pasona-nouentai.co.jp、03-6734-1260）までご連絡ください。</p>
            <Button
                text="トップページ"
                href="/"
                className="mt-60 @PC:mt-120 max-w-[68rem] mx-auto"
                large={true}
            />
        </>
    )
}

export default Complete