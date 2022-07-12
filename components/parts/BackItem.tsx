type Props = {
    setStepHundler: (mode: string) => void
}

const BackItem = (props: Props) => {
    const { setStepHundler } = props
    return (
        <button
            className="underline text-16 @PC:text-20"
            onClick={(e) => {
                setStepHundler('input');
                e.preventDefault()
            }}
        >
            入力画面に戻る
        </button>
    )
}

export default BackItem