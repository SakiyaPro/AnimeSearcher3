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
            <header className={router.pathname === "/detail/[animeId]" ? "header detailHeader" : "header"}>
                <div className={`${styles.headerWrapper}`}>
                    <div onClick={() => sessionStorage.setItem(router.pathname, window.scrollY)} className={`${styles.headerItemsWrapper}`}>
                        <div onClick={() => sessionStorage.setItem(router.pathname, window.scrollY)} className={`${styles.headerItem}`}>
                            <Link href="/" passhref="true">
                                {router.pathname === "/" ?
                                    <a>
                                        <img src="/image/systemIcon/system/active/home_icon.png" width="26px" alt="" />
                                        <span className={`${styles.active}`}>最新レビュー</span>
                                    </a> :
                                    <a>
                                        <img src="/image/systemIcon/system/non-active/home_icon.png" width="26px" alt="" />
                                        <span>最新レビュー</span>
                                    </a>
                                }
                            </Link>
                        </div>
                        <div onClick={() => sessionStorage.setItem(router.pathname, window.scrollY)} className={`${styles.headerItem}`}>
                            <Link href="/search" passhref="true">
                                {router.pathname === "/search" ?
                                    <a>
                                        <img src="/image/systemIcon/system/active/search_icon.png" width="26px" alt="" />
                                        <span className={`${styles.active}`}>アニメを検索</span>
                                    </a> :
                                    <a>
                                        <img src="/image/systemIcon/system/non-active/search_icon.png" width="26px" alt="" />
                                        <span>アニメを検索</span>
                                    </a>
                                }
                            </Link>
                        </div>
                        <div onClick={() => sessionStorage.setItem(router.pathname, window.scrollY)} className={`${styles.headerItem}`}>
                            <Link href="/recommend/nowSeason" passhref="true">
                                {router.pathname === "/recommend/nowSeason" ?
                                    <a>
                                        <img src="/image/systemIcon/system/active/recommend_icon.png" width="26px" alt="" />
                                        <span className={`${styles.active}`}>今期アニメ</span>
                                    </a> :
                                    <a>
                                        <img src="/image/systemIcon/system/non-active/recommend_icon.png" width="26px" alt="" />
                                        <span>今期アニメ</span>
                                    </a>
                                }
                            </Link>
                        </div>
                        <div onClick={() => sessionStorage.setItem(router.pathname, window.scrollY)} className={`${styles.headerItem}`}>
                            <Link href="/recommend/onePrevSeason" passhref="true">
                                <a>
                                    {router.pathname === "/recommend/onePrevSeason" ?
                                        <>
                                            <img src="/image/systemIcon/system/active/recommend_icon.png" width="26px" alt="" />
                                            <span className={`${styles.active}`}>{BEFOREYEAR1} {conversionSeasonName(BEFORESEASON1)}アニメ</span>
                                        </>
                                        :
                                        <>
                                            <img src="/image/systemIcon/system/non-active/recommend_icon.png" width="26px" alt="" />
                                            <span>{BEFOREYEAR1} {conversionSeasonName(BEFORESEASON1)}アニメ</span>
                                        </>
                                    }
                                </a>
                            </Link>
                        </div>
                        <div onClick={() => sessionStorage.setItem(router.pathname, window.scrollY)} className={`${styles.headerItem}`}>
                            <Link href="/recommend/popularAnime" passhref="true">
                                {router.pathname === "/recommend/popularAnime" ?
                                    <a>
                                        <img src="/image/systemIcon/system/active/recommend_icon.png" width="26px" alt="" />
                                        <span className={`${styles.active}`}>人気アニメ</span>
                                    </a> :
                                    <a>
                                        <img src="/image/systemIcon/system/non-active/recommend_icon.png" width="26px" alt="" />
                                        <span>人気アニメ</span>
                                    </a>
                                }
                            </Link>
                        </div>
                        <div onClick={() => sessionStorage.setItem(router.pathname, window.scrollY)} className={`${styles.headerItem}`}>
                            <Link href="/account/private" passhref="true">
                                <a>
                                    <img src={router.pathname === "/account/private" | router.pathname === "/login" ? src && src[0] : src && src[1]} width="26px" alt="" />
                                    <span className={router.pathname === "/account/private" | router.pathname === "/login" && `${styles.active}`}>
                                        {LoginState ? "プロフィール" : "ログイン"}
                                    </span>
                                </a>
                            </Link>
                        </div>
                        <div>
                            <button className="tweetItem" onClick={() => setReviewPostDisplay(true)}>レビューする</button>
                        </div>
                    </div>
                </div>
            </header>
            <main className={router.pathname === "/detail/[animeId]" ? "main detailMain" : "main"}>
                <div className={`mainWrapper ${router.pathname.match(/^\/detail\//) && "detailMainWrapper"}`}>
                    <div className={`centerWrapper ${router.pathname.match(/^\/detail\//) && "detailCenterWrapper"}`}>
                        {props.children}
                    </div>
                    {
                        LoginState ?
                            reviewPostDisplay &&
                            <>
                                <div onClick={() => setReviewPostDisplay(false)} className="displayBackground" >
                                </div>
                                <div className="reviewPostBackground" >
                                    <div className="reviewPostDisableButton">
                                        <button onClick={() => setReviewPostDisplay(false)} className="button-decoration1">
                                            <img src="/image/systemIcon/system/disable_icon.png" width="13px" height="13px" alt="" />
                                        </button>
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
                    }
                </div>
                <div className="rightWrapper">
                    <div>
                        <div className={`${styles.tentativeLogo}`}>
                            <Link href="/" passhref="true">
                                <a>
                                    <img src="/image/Logo/AnimeSearcher_logo(colorful).png" width="150px" alt="サイトロゴ" />
                                </a>
                            </Link>
                        </div>
                        <div className={`${styles.rightContents}`}>
                            <div className={`${styles.streamingNameWrapper}`}>
                                <a href="https://anime.dmkt-sp.jp/animestore/" className={`${styles.streamingName}`} target="_blank" rel="noopener noreferrer">ｄアニメストア</a>
                                <a href="https://www.netflix.com/jp/browse/genre/7424" className={`${styles.streamingName}`} target="_blank" rel="noopener noreferrer">NETFLIX</a>
                                <a href="https://www.amazon.co.jp/Amazon-Video/b?ie=UTF8&node=2351649051" className={`${styles.streamingName}`} target="_blank" rel="noopener noreferrer">PrimeVideo</a>
                                <a href="https://video.unext.jp/freeword?query=%E3%82%A2%E3%83%8B%E3%83%A1" className={`${styles.streamingName}`} target="_blank" rel="noopener noreferrer">U-NEXT</a>
                                <a href="https://fod.fujitv.co.jp/genre/anime" className={`${styles.streamingName}`} target="_blank" rel="noopener noreferrer">FOD</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer></footer>
        </>
    )
}
