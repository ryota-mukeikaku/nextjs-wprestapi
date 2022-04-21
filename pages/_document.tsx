import React, { ReactElement } from 'react'
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentInitialProps,
    DocumentContext
} from 'next/document'
import sprite from 'svg-sprite-loader/runtime/sprite.build'

type NewDocumentInitialProps = DocumentInitialProps & {
    spriteContent?: string
}

class MyDocument extends Document<{ spriteContent: string }> {
    static async getInitialProps(
        context: DocumentContext
    ): Promise<NewDocumentInitialProps> {
        const initialProps = await Document.getInitialProps(context)
        const spriteContent = sprite.stringify()

        return {
            ...initialProps,
            spriteContent
        }
    }

    render(): ReactElement {
        return (
            <Html>
                <Head>
                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    ></link>
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                        crossOrigin='true'
                    ></link>
                    <link
                        href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Open+Sans:wght@500&display=swap'
                        rel='stylesheet'
                    />
                </Head>
                <body>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: this.props.spriteContent
                        }}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
