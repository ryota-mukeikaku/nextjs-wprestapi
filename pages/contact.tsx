import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Meta from '@/components/Meta'
import SVGSprite from '@/components/util/SVGSprite'
import Link from 'next/link'
import LowerPageLayout from '@/layouts/LowerPageLayout'
import PageHeader from '@/components/PageHeader'
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Input from '@/components/contact/Input'
import Confirm from '@/components/contact/Confirm'
import Submit from '@/components/contact/Submit'
import Complete from '@/components/contact/Complete'
import Breadcrumbs from '@/components/parts/Breadcrumbs'

const Page: NextPage = () => {
    const meta = {
        title: "お問い合わせ｜おいしい和食のはなし。",
        description: "“おいしい和食のはなし”をご覧いただきありがとうございます。本ウェブサイトの管理運営は、農林水産省より委託された株式会社パソナ農援隊が運営しています。本サイトに関するお問い合わせについては、このページよりお願いします。",
        ogImage: process.env.NEXT_PUBLIC_URL + "images/ogp.png",
        ogType: "website",
        siteName: "おいしい和食のはなし。｜農林水産省",
        twitter: "@washoku_maff"
    }
    const router = useRouter();
    // const defaultInput = {
    //     firstname: "和食",
    //     lastname: "太郎",
    //     firstname_kana: "わしょく",
    //     lastname_kana: "たろう",
    //     email: "washoku@tarou.com",
    //     email_confirm: "washoku@tarou.com",
    //     tel: "07021832703",
    //     company: "株式会社無計画",
    //     message: "テスト送信です\nあのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモーリオ市、郊外のぎらぎらひかる草の波。",
    // }
    const defaultInput = {
        firstname: "",
        lastname: "",
        firstname_kana: "",
        lastname_kana: "",
        email: "",
        email_confirm: "",
        tel: "",
        company: "",
        message: "",
    }
    const [input, setInput] = useState(defaultInput);
    useEffect(() => {
        router.events.on("routeChangeComplete", handleChangeRoute);
        return () => {
            router.events.off("routeChangeComplete", handleChangeRoute);
        };
    }, []);
    function handleChangeRoute(path: string) {
        setStep("input");
    }
    const { executeRecaptcha } = useGoogleReCaptcha();
    const submit = async () => {
        async function send() {
            console.log(executeRecaptcha)
            const apiEndPoint = process.env.NEXT_PUBLIC_FORM_API_ROOT + 'contact.php';
            const response = await fetch(apiEndPoint, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: (executeRecaptcha) ? await executeRecaptcha("getToken") : "",
                    input: input,
                }),
            });
            return response.json();
        }
        send().then((data) => {
            setInput(defaultInput);
            if (data.status == 200) {
                setStep("complete");
            } else {
                setStep("error");
            }
        });
    };
    const [step, setStep] = useState("input");
    const [error, setError] = useState(false);
    const setStepHundler = (mode: string) => {
        window.scrollTo({
            top: 0,
        });
        if (mode == "input") {
            setStep(mode);
            setError(false);
            return;
        }

        let newError = false;
        for (const [key, value] of Object.entries(input)) {
            if (value == "" || value == null) {
                newError = true;
                // console.log(`empty:${key}`);
                continue;
            }
            switch (key) {
                case "firstname":
                case "lastname":
                case "firstname_kana":
                case "lastname_kana":
                case "company":
                case "message":
                    if (value.length < 1) {
                        newError = true;
                        // console.log(`short:${key}`);
                    }
                    break;
                case "email":
                    if (
                        value.match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        ) == null
                    ) {
                        newError = true;
                        // console.log(`invalied:${key}`);
                    }
                    break;
                case "email_confirm":
                    if (value != input.email) {
                        newError = true;
                        // console.log(`short:${key}`);
                    }
                    break;
                case "tel":
                    if (
                        value.match(
                            /^[-\d]{10,14}$/
                        ) == null
                    ) {
                        newError = true;
                        // console.log(`invalied:${key}`);
                    }
                    break;
            }
        }
        // console.log(newError);
        if (newError) {
            // console.log(newError)
            setError(true);
            setStep("input");
        } else {
            setStep(mode);
            if (mode == "submit") {
                const res = submit();
            }
        }
    };
    return (
        <>
            <Meta {...meta} />
            <PageHeader jp="お問い合わせ" en="Contact" />
            <LowerPageLayout>
                <section className='post_content'>
                    {step == "input" && (
                        <Input
                            setInput={setInput}
                            input={input}
                            setStepHundler={setStepHundler}
                            error={error}
                        />
                    )}
                    {step == "confirm" && (
                        <Confirm setStepHundler={setStepHundler} input={input} />
                    )}
                    {step == "submit" && <Submit />}
                    {step == "complete" && <Complete />}
                    {step == "error" && <Complete />}
                </section>
            </LowerPageLayout>
            <Breadcrumbs breadcrumbs={[
                {
                    title: "HOME",
                    url: "/"
                },
                {
                    title: "お問い合わせ",
                    url: "/contact/"
                }
            ]} />
        </>
    )
}

export default Page
