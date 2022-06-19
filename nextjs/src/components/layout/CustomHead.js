import React, {useState, useEffect} from 'react'
import Head from "next/head";
import { useRouter } from "next/router";

export default function CustomHead({ changeTitle }) {
    const router = useRouter();
    const title = "あにめ大革命"
    return (
        <Head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>{title}</title>
            {
                changeTitle ? <title>{changeTitle} | {title}</title> :
                    router.pathname === '/' ? <title>アニメレビューするなら 『{title}』</title> :
                        router.pathname.match(/\/anime\/search.*/) ? <title>自分にあったおすすめアニメを見つけよう！ | {title}</title> :
                            router.pathname.match(/\/anime\/recommend.*/) ? <title>話題沸騰中アニメの評価が見つかるサイト | {title}</title> :
                                router.pathname.match(/\/anime\/account.*/) && <title>{title} - あかうんと</title>
            }
            <meta name="description" content={`次世代のレビューサイト『${title}』。「見やすい」「探しやすい」「レビューしやすい」を目的として日々アップデートしております。評価の高いアニメを探したり、自分の好きなアニメをレビューして、みんなでアニメライフを充実させましょう！`} />
            <meta property="og:url" content="https://anime-wo-kataru.com" />
            <meta property="og:title" content={title} />
            <meta property="og:image" content="/image/favicon/aRfavicon.png" />
            <meta name="twitter:card" content="カード種類" />
            <meta name="twitter:site" content="@Twitterユーザー名" />
            <meta property="og:site_name" content="サイト名" />
            <meta property="og:locale" content="ja_JP" />
            <meta property="fb:app_id" content="appIDを入力" />
        </Head>
    )
}
