import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router'
import styles from '../../styles/layout2.module.css'
import { getSeasonAndYear, conversionSeasonName, login_request } from '../../utils/functions';

export default function Layout2(props) {
    const router = useRouter();

    const [LoginState, setLoginState] = useState()
    const [BEFORESEASON1, setBEFORESEASON1] = useState()
    const [BEFOREYEAR1, setBEFOREYEAR1] = useState()

    const loginRequest = login_request()

    useEffect(() => {
        setLoginState(login_request())
        setBEFORESEASON1(getSeasonAndYear(-3)[0])
        setBEFOREYEAR1(getSeasonAndYear(-3)[1])
    }, [loginRequest])

    const [src, setSrc] = useState()

    useEffect(() => {
        if (LoginState) {
            setSrc(["/image/systemIcon/system/active/profile_icon.png", "/image/systemIcon/system/non-active/profile_icon.png"])
        } else {
            setSrc(["/image/systemIcon/system/active/login_icon.png", "/image/systemIcon/system/non-active/login_icon.png"])
        }
    }, [LoginState])

    //ログアウト処理
    const logout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        localStorage.removeItem("profile")
        localStorage.removeItem("review_anime")
        router.replace("/login");
    }

    return (
        <>
            <div className={`${styles.navigation}`}>
                <div className={`${styles.items}`}>
                    <div className={`${styles.item}`}>
                        <Link href="/" passhref="true">
                            <a>
                                <img src="/image/systemIcon/system/icons8-ホームページ-32.png" alt="ホームアイコン" />
                                <span>ホーム</span>
                            </a>
                        </Link>
                    </div>
                    <div className={`${styles.item}`}>
                        <Link href="#" passhref="true">
                            <a>
                                <img src="/image/systemIcon/system/icons8-王冠-50.png" alt="ランキングアイコン" />
                                <span>ランキング</span>
                            </a>
                        </Link>
                    </div>
                    <div className={`${styles.item}`}>
                        <Link href="/anime/search" passhref="true">
                            <a>
                                <img src="/image/systemIcon/system/icons8-検索-64.png" alt="検索アイコン" />
                                <span>検索</span>
                            </a>
                        </Link>
                    </div>
                    <div className={`${styles.item}`}>
                        <Link href="/account/private" passhref="true">
                            <a>
                                <img src="/image/systemIcon/system/icons8-性中立ユーザー-50.png" alt="ログインアイコン" />
                                <span>ログイン</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <main className={router.pathname === "/detail/[animeId]" ? "main detailMain" : "main"}>
                <div className={`mainWrapper`}>
                    <div className={`centerWrapper`}>
                        {props.children}
                    </div>
                </div>
            </main>
        </>
    )
}
