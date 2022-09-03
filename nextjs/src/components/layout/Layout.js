// React
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'
// CSS
import styles from 'Styles/components-css/layout/Layout.module.css'
// Utils
import { getLoginState } from 'Utils/functions/getLoginState'

export default function Layout2(props) {
    const router = useRouter()
    const [loginState, setLoginState] = useState()

    useEffect(() => {
        setLoginState(getLoginState())
    }, [])

    return (
        <>
            <header className={`${styles.navigation}`}>
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
            </header>
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
