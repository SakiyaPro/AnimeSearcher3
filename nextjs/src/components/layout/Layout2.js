import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router'
import styles from '../../styles/layout2.module.css'
import { getSeasonAndYear, conversionSeasonName, login_request } from '../../utils/functions';
import ReviewPostCenter from '../item/ReviewPostCenter';
import LoginRequest from '../view/LoginRequest'

import SearchBar from '../item/SearchBar';

export default function Layout2(props) {
    const router = useRouter();

    const [LoginState, setLoginState] = useState()
    const [BEFORESEASON1, setBEFORESEASON1] = useState()
    const [BEFOREYEAR1, setBEFOREYEAR1] = useState()
    const [reviewPostDisplay, setReviewPostDisplay] = useState(false)
    const [searchResult, setSearchResult] = useState()

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
            <div className="sectionTop">
                <div className="ground">
                    <Link href="/" passhref="true"><a className="sectionName"><img src="/image/Logo/AnimeSearcher_logo(colorful).png" height="30vh" /></a></Link>
                </div>
            </div>
            <main className={router.pathname === "/detail/[animeId]" ? "main detailMain" : "main"}>
                <div className={`mainWrapper`}>
                    <div className={`centerWrapper`}>
                        {props.children}
                    </div>
                    {/* {
                        LoginState ?
                            reviewPostDisplay &&
                            <>
                                <div onClick={() => setReviewPostDisplay(false)} className="displayBackground" >
                                </div>
                                <div className="reviewPostBackground" >
                                    <div className="reviewPostDisableButton">
                                        <bu tton onClick={() => setReviewPostDisplay(false)} className="button-decoration1">
                                            <img src="/image/systemIcon/system/disable_icon.png" width="13px" height="13px" alt="" />
                                        </bu>
                                        <div>レビュー投稿</div>
                                    </div>
                                    <ReviewPostCenter />
                                </div>
                            </> :
                            reviewPostDisplay &&
                            <>
                                <div onClick={() => setReviewPostDisplay(false)} className="displayBackground" >
                                </div>
                                <LoginRequest setDisplay={setReviewPostDisplay} />
                            </>
                    } */}
                </div>
            </main>
            <footer className={`${styles.footerWrapper}`}>
                <div className={`${styles.footerContent}`}>
                    <Link href="/recommend/nowSeason" passhref="true">
                        {router.pathname === "/" ?
                            <a>
                                <img src="/image/systemIcon/system/active/recommend_icon.png" alt="" />
                                <span className={`${styles.active}`}>探索</span>
                            </a> :
                            <a>
                                <img src="/image/systemIcon/system/non-active/recommend_icon.png" alt="" />
                                <span>探索</span>
                            </a>
                        }
                    </Link>
                </div>
                <div className={`${styles.footerContent}`}>
                    <Link href="/search" passhref="true">
                        {router.pathname === "/aaa" ?
                            <a>
                                <img src="/image/systemIcon/system/active/search_icon.png" alt="" />
                                <span className={`${styles.active}`}>検索</span>
                            </a> :
                            <a>
                                <img src="/image/systemIcon/system/non-active/search_icon.png" alt="" />
                                <span>検索</span>
                            </a>
                        }
                    </Link>
                </div>
                <div className={`${styles.footerContent}`}>
                    <Link href="/account/private" passhref="true">
                        <a>
                            <img src={router.pathname === "/account/private" | router.pathname === "/login" ? src && src[0] : src && src[1]} alt="" />
                            <span className={router.pathname === "/account/private" | router.pathname === "/login" && `${styles.active}`}>
                                {LoginState ? "プロフィール" : "ログイン"}
                            </span>
                        </a>
                    </Link>
                </div>
                {/* <div>
                            <button className="tweetItem" onClick={() => setReviewPostDisplay(true)}>レビューする</button>
                        </div> */}
            </footer>
        </>
    )
}
