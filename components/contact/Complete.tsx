import Button from "../parts/Button"

const Complete = () => {
    return (
        <>
            <h2>お問い合わせありがとうございます。</h2>
            <p>ご入力いただいたメールアドレス宛に、お問い合わせ内容についての確認メールをお送りいたしましたので、ご確認をお願いいたします。</p>
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