import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router'
import styles from '../../styles/layout2.module.css'
import { login_request } from '../../utils/functions';

export default function Layout2(props) {
    const router = useRouter();

    const [src, setSrc] = useState()
    const [loginState, setLoginState] = useState()
    useEffect(() => {
        setLoginState(login_request())
        if (loginState) {
            setSrc(["/image/systemIcon/system/active/profile_icon.png", "/image/systemIcon/system/non-active/profile_icon.png"])
        } else {
            setSrc(["/image/systemIcon/system/active/login_icon.png", "/image/systemIcon/system/non-active/login_icon.png"])
        }
    }, [login_request()])

    return (
        <>
            <header className={router.pathname === "/detail/[animeId]" ? "header detailHeader" : "header"}>
                <div className={`${styles.headerWrapper}`}>
                    <div className={`${styles.headerItemsWrapper}`}>
                        <div className={`${styles.headerItem} ${styles.tentativeLogo}`}>
                            ロ
                        </div>
                        <div className={`${styles.headerItem}`}>
                            <Link href="/">
                                {router.pathname === "/" ?
                                    <a>
                                        <img src="/image/systemIcon/system/active/home_icon.png" width="22px" />
                                        <span className={`${styles.active}`}>ホーム</span>
                                    </a> :
                                    <a>
                                        <img src="/image/systemIcon/system/non-active/home_icon.png" width="22px" />
                                        <span>ホーム</span>
                                    </a>
                                }
                            </Link>
                        </div>
                        <div className={`${styles.headerItem}`}>
                            <Link href="/recommend/nowSeason">
                                {router.pathname === "/recommend/nowSeason" ?
                                    <a>
                                        <img src="/image/systemIcon/system/active/recommend_icon.png" width="22px" />
                                        <span className={`${styles.active}`}>オススメ</span>
                                    </a> :
                                    <a>
                                        <img src="/image/systemIcon/system/non-active/recommend_icon.png" width="22px" />
                                        <span>オススメ</span>
                                    </a>
                                }
                            </Link>
                        </div>
                        <div className={`${styles.headerItem}`}>
                            <Link href="#">
                                {router.pathname === "#" ?
                                    <a>
                                        <img src="/image/systemIcon/system/active/review_icon.png" width="22px" />
                                        <span className={`${styles.active}`}>レビュー</span>
                                    </a> :
                                    <a>
                                        <img src="/image/systemIcon/system/non-active/review_icon.png" width="22px" />
                                        <span>レビュー</span>
                                    </a>
                                }
                            </Link>
                        </div>
                        <div className={`${styles.headerItem}`}>
                            <Link href="/account/private">
                                <a>
                                    <img src={router.pathname === "/account/private" | router.pathname === "/login" ? src && src[0] : src && src[1]} width="22px" />
                                    <span className={router.pathname === "/account/private" | router.pathname === "/login" && `${styles.active}`}>
                                        {loginState ? "プロフィール" : "ログイン"}
                                    </span>
                                </a>
                            </Link>
                        </div>
                        <div className={`${styles.tweetItem}`}>
                            <button>レビューする</button>
                        </div>
                    </div>
                </div>
            </header>
            <main className={router.pathname === "/detail/[animeId]" ? "main detailMain" : "main"}> {props.children} </main>
        </>
    )
}
