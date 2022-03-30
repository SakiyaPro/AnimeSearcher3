import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoginRequest from '../view/LoginRequest';
import ReviewStar from './ReviewStar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { refresh_access_token, login_request } from '../../utils/functions';

export default function AnimeSectionItem({ anime }) {
    console.log(anime);
    const router = useRouter()
    const [LoginState, setLoginState] = useState()
    const [favoriteCountState, setFavoriteCountState] = useState(false)
    const [favoriteCount, setFavoriteCount] = useState()
    const [display, setDisplay] = useState(false)
    useEffect(() => {
        setLoginState(login_request())
    }, [login_request()])

    useEffect(() => {
        setFavoriteCountState(anime.favorite_count.map(user => user.id).includes(parseInt(Cookies.get("user_id"), 10)))
        setFavoriteCount(anime.favorite_count.length + anime.watchersCount)
    }, [])

    const plusFavoriteCount = async () => {
        refresh_access_token()
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/${anime.id}/`, {
            favorite_count_plus: "true"
        }, {
            "headers": {
                Authorization: `JWT ${Cookies.get("access_token")}`,
            },
        })
    }
    const minusFavoriteCount = async () => {
        refresh_access_token()
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/${anime.id}/`, {
            favorite_count_minus: "true"
        }, {
            "headers": {
                Authorization: `JWT ${Cookies.get("access_token")}`,
            },
        })
    }
    return (
        <div>
            <div>
                <article className="centerArticle">
                    <div className="content">
                        <Link href='/detail/[animeId]' as={`/detail/${anime.id}`} passhref="true">
                            <a className="animeTitle">
                                <h1>{anime.title}</h1>
                            </a>
                        </Link>
                        <ReviewStar animeTitle={anime.title} reviewanime_set={anime.reviewanime_set} />
                        <div className="imageWrapper" >
                            <img src={anime.image} width={504} />
                        </div>
                    </div>
                </article>
            </div>
            <div>
                <div className="sectionBottomItem" >
                    <div>
                        <button className="btn1">
                            <img src="/image/systemIcon/system/balloon_icon.png" width="18px" height="18px" />
                            <span>
                                {
                                    // コメントがある場合のみカウントする
                                    anime.reviewanime_set.length
                                }
                            </span>
                        </button>
                    </div>
                    <div>
                        {
                            favoriteCountState ?
                                <button onClick={() => { LoginState && minusFavoriteCount(), LoginState && setFavoriteCountState(!favoriteCountState), LoginState && setFavoriteCount(favoriteCount - 1), !LoginState && setDisplay(true) }} className="btn2">
                                    <img src="/image/systemIcon/system/favo_icon(pink).png" />
                                    <span style={{ color: "#D83A56" }}>{favoriteCount}</span>
                                </button>
                                :
                                <button onClick={() => { LoginState && plusFavoriteCount(), LoginState && setFavoriteCountState(!favoriteCountState), LoginState && setFavoriteCount(favoriteCount + 1), !LoginState && setDisplay(true) }} className="btn2">
                                    <img src="/image/systemIcon/system/favo_icon.png" />
                                    <span>{favoriteCount}</span>
                                </button>
                        }
                        {
                            !LoginState && display &&
                            <>
                                <div onClick={() => setDisplay(false)} className="displayBackground" >
                                </div>
                                <LoginRequest setDisplay={setDisplay} />
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
