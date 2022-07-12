import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Meta from '@/components/Meta'
import SVGSprite from '@/components/util/SVGSprite'
import Link from 'next/link'
import LowerPageLayout from '@/layouts/LowerPageLayout'
import PageHeader from '@/components/PageHeader'
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Input from '@/components/application/Input'
import Confirm from '@/components/application/Confirm'
import Submit from '@/components/application/Submit'
import Complete from '@/components/application/Complete'
import { Pref, Job, Year } from '@/libs/ApplicationFormSelects'
import Breadcrumbs from '@/components/parts/Breadcrumbs'

const Page: NextPage = () => {
    const meta = {
        title: "和食文化継承リーダー研修申込フォーム｜おいしい和食のはなし。",
        description: "この研修は、国の事業として、子どもたちや子育て世代に対して、和食文化を伝える人材を全国に育成するために実施するものです。",
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
    // agreement: "",
    // date: "",
    // job: "",
    // company: "",
    // year: "",
    // known: "",
    // known_other:"",
    // hope: "",
    // information:"",
    // mail_information: "",
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
        pref: "",
        agreement: [],
        date: "",
        job: "",
        company: "",
        year: "",
        known: "",
        known_other: "",
        reason: [],
        reason_other: "",
        hope: [],
        information: "",
        mail_information: "",
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
            const apiEndPoint = process.env.NEXT_PUBLIC_FORM_API_ROOT + 'application.php';
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
            if ((value == "" || value == null) && key.indexOf('_other') == -1) {
                newError = true;
                console.log(`empty:${key}`);
                continue;
            }
            switch (key) {
                case "firstname":
                case "lastname":
                case "firstname_kana":
                case "lastname_kana":
                case "pref":
                case "agreement":
                case "date":
                case "job":
                case "company":
                case "year":
                case "hope":
                case "information":
                case "mail_information":
                case "message":
                    if (value.length < 1) {
                        newError = true;
                        // console.log(`short:${key}`);
                    }
                    break;
                case "email":
                    if (
                        typeof value == 'string' && value.match(
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
                        typeof value == 'string' && value.match(
                            /^[-\d]{10,14}$/
                        ) == null
                    ) {
                        newError = true;
                        // console.log(`invalied:${key}`);
                    }
                    break;
                case "known":
                    if (value == "その他（自由記載）" && input['known_other'] == "") {
                        newError = true;
                        // console.log(`other_empty:${key}`);
                    }
                    break;
                case "reason":
                    if (Object.values(value).indexOf('その他（自由記載）') > -1 && input['reason_other'] == "") {
                        newError = true;
                        // console.log(`other_empty:${key}`);
                    }
                    break
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
    useEffect(() => {
        // console.log('new')
        // console.log(input.mail_information)
    }, [input])
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
                    title: "和食文化継承リーダー研修",
                    url: "/training/"
                },
                {
                    title: "申込フォーム",
                    url: "/training/application/"
                }
            ]} />
        </>
    )
}

export default Page
