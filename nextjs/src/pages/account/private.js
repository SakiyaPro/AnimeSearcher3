import React, { useState, useEffect, useLayoutEffect, useGlobal, setGlobal } from "reactn";
import { useRouter } from "next/router";
import axios from 'axios';
import Cookies from "js-cookie";

import Thumbnail from "../../components/item/Thumbnail";
import Auth from "../../components/auth/Auth";
import styles from "../../styles/private.module.css";

export default function Private() {
    const router = useRouter();
    const [profile, setProfile] = useState()
    const [reviewAnime, setReviewAnime] = useState()

    useEffect(async () => {
        try {
            const profile = await (await axios.get(
                `${process.env.NEXT_PUBLIC_DJANGO_URL}users/profile/`, {
                headers: {
                    Authorization: `JWT ${Cookies.get("access_token")}`,
                }
            })).data.results[0]
            localStorage.setItem("profile", JSON.stringify(profile))
            setProfile(JSON.parse(localStorage.getItem("profile")))

            const reviewAnime = await (await axios.get(
                `${process.env.NEXT_PUBLIC_DJANGO_URL}users/review_anime/`, {
                headers: {
                    Authorization: `JWT ${Cookies.get("access_token")}`,
                }
            })).data.results[0]
            setReviewAnime(reviewAnime)

        } catch (error) {
            //アクセストークンの再取得
            const refresh_access_token = await (await axios.post(
                `${process.env.NEXT_PUBLIC_DJANGO_URL}dj-rest-auth/token/refresh/`, {
                refresh: `${Cookies.get("refresh_token")}`,
            })).data.access
            Cookies.set("access_token", refresh_access_token);

            const profile = await (await axios.get(
                `${process.env.NEXT_PUBLIC_DJANGO_URL}users/profile/`, {
                headers: {
                    Authorization: `JWT ${refresh_access_token}`,
                }
            })).data.results[0]
            localStorage.setItem("profile", JSON.stringify(profile))
            setProfile(JSON.parse(localStorage.getItem("profile")))

            const reviewAnime = await (await axios.get(
                `${process.env.NEXT_PUBLIC_DJANGO_URL}users/review_anime/`, {
                headers: {
                    Authorization: `JWT ${refresh_access_token}`,
                }
            })).data.results[0]
            setReviewAnime(reviewAnime)
        }
    }, [])

    useEffect(() => {
        console.log(reviewAnime);
    }, [reviewAnime])

    const targetImg = profile?.user_icon && document.getElementById('user_icon')
    const width = targetImg?.width

    //ログアウト処理
    const logout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        localStorage.removeItem("profile")
        localStorage.removeItem("review_anime")
        router.replace("/login");
    }

    return (
        <Auth>
            <div>
                <div className={`${styles.outerWrapper}`}>
                    <div className={`${styles.innerWrapper}`}>
                        <button className={`${styles.logout}`} onClick={logout}>ログアウト</button>
                        <div className={`${styles.profile}`}>
                            <img id="user_icon" className={`${styles.user_icon}`} src={profile?.user_icon} width="150px" height="150px" />
                            <div className={`${styles.profileInfo}`}>
                                <p className={`${styles.username}`}>{profile?.user && profile.user.username}</p>
                                <p>好きなアニメジャンル :　感動　恋愛</p>
                            </div>
                        </div>
                        <div className={`${styles.articleTitleWrapper}`}>
                            <div>
                                <button>評価したアニメ</button>
                            </div>
                            <div>
                                <button>作った記事</button>
                            </div>
                        </div>
                        <div className={`${styles.reviewAnime}`}>
                            <p>感想　>>　{reviewAnime?.comment}</p>
                            {reviewAnime?.anime.title &&
                                <Thumbnail title={reviewAnime?.anime.title} watchersCount={reviewAnime?.anime.watchersCount} reviewanime_set={reviewAnime?.anime.reviewanime_set} src={reviewAnime?.anime.image} width="270px" />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Auth>
    );
}
