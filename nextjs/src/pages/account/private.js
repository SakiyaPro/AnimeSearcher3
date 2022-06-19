import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Auth from "../../components/auth/Auth";
import styles from "../../styles/private.module.css";
import ReviewSectionItem from "../../components/item/ReviewSectionItem";
import axios from 'axios';
import Cookies from "js-cookie";
import { refresh_access_token } from "../../utils/functions";
import AnimeSectionItem from "../../components/item/AnimeSectionItem";


export default function Private() {
    const router = useRouter();
    const [display, setDisplay] = useState(false)
    const [user, setUser] = useState()
    const [profile, setProfile] = useState()
    const [reviewAnime, setReviewAnime] = useState()
    const [selectState, setSelectState] = useState(1)

    // 編集要素
    const editUsername = useRef()
    const editUserIcon = useRef()
    const editUserBackImage = useRef()
    const editSelfIntroduction = useRef()
    // 編集状態監視
    const [saveUsername, setSaveUsername] = useState()
    const [saveUserBackImage, setSaveUserBackImage] = useState()
    const [saveUserIcon, setSaveUserIcon] = useState()
    const [saveSelfIntroduction, setSaveSelfIntroduction] = useState()

    // エラー文状態管理
    const [error, setError] = useState({})

    useEffect(() => {
        const asyncEffect = async () => {
            if (Cookies.get("access_token")) {
                try {
                    const res = await (await axios.get(
                        `${process.env.NEXT_PUBLIC_DJANGO_URL}users/user/`, {
                        headers: {
                            Authorization: `JWT ${Cookies.get("access_token")}`,
                        }
                    })).data.results[0]
                    setUser(res)
                    setProfile(res.profile)
                    localStorage.setItem("user_icon", profile.user_icon)
                    setReviewAnime(res.reviewanime_set)
                    setSaveUsername(user.username)
                    setSaveSelfIntroduction(profile.self_introduction)
                } catch (error) {
                    //アクセストークンの再取得
                    refresh_access_token()

                    const res = await (await axios.request(
                        `${process.env.NEXT_PUBLIC_DJANGO_URL}users/user/`, {
                        method: "GET",
                        headers: {
                            Authorization: `JWT ${Cookies.get("access_token")}`,
                        }
                    })).data.results[0]
                    setUser(res)
                    setProfile(res.profile)
                    localStorage.setItem("user_icon", res.profile.user_icon)
                    setReviewAnime(res.reviewanime_set)
                    setSaveUsername(res.username)
                    setSaveSelfIntroduction(res.profile.self_introduction)
                }
            }
        }
        asyncEffect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // プロフィール画像状態管理
    const onChangeUserIcon = (e) => {
        const image = e.target.files[0];
        setSaveUserIcon(image)
        editUserIcon.current.title = image.name;
        const reader = new FileReader();
        reader.onload = (event) => {
            editUserIcon.current.setAttribute('src', event.target.result)
        };
        reader.readAsDataURL(image);
    }
    const onChangeUserBackImage = (e) => {
        const image = e.target.files[0];
        setSaveUserBackImage(image)
        editUserBackImage.current.title = image.name;
        const reader = new FileReader();
        reader.onload = (event) => {
            editUserBackImage.current.setAttribute('src', event.target.result)
        };
        reader.readAsDataURL(image);
    }

    // プロフィール編集
    const editProfile = async () => {
        await refresh_access_token()

        let data = new FormData()
        saveUserBackImage && data.append("user_backImage", saveUserBackImage);
        saveUserIcon && data.append("user_icon", saveUserIcon);
        data.append("self_introduction", saveSelfIntroduction)

        const options = {
            method: 'PATCH',
            data,
            headers: {
                Authorization: `JWT ${Cookies.get("access_token")}`,
            },
        };

        const res = await axios.request(
            `${process.env.NEXT_PUBLIC_DJANGO_URL}users/profile/${profile.id}/`,
            options
        )

        data = new FormData()
        data.append("username", saveUsername)
        try {
            const res = await axios.request(
                `${process.env.NEXT_PUBLIC_DJANGO_URL}users/user/${user.id}/`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `JWT ${Cookies.get("access_token")}`,
                    },
                    data,
                }
            )
            setError(error => { delete error.username; return { ...error } })
        } catch (error) {
            const errorMassage = error.response.data
            if (errorMassage.username) {
                setError({ ...error, "username": errorMassage.username })
            }
            return
        }
        location.reload()
    };

    //ログアウト処理
    const logout = () => {
        Cookies.remove("user_id");
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("loginRetention")
        localStorage.removeItem("profile")
        localStorage.removeItem("user_icon")
        localStorage.removeItem("review_anime")
        router.replace("/account/login");
    }

    const user_date_joined = user?.date_joined.replace('-', '年').replace('-', '月')

    useEffect(() => {
        console.log(reviewAnime?.length);
    }, [])

    return (
        <Auth>
            <div className={`${styles.wrapper}`}>
                {/* <button className={`${styles.logout}`} onClick={logout}>ログアウト</button> */}
                {/* <div className={`${styles.sectionTop}`}>
                    <div className={`${styles.sectionName}`}>
                        <button onClick={() => history.back()} className="button-decoration1"><img src="/image/systemIcon/system/allow_icon(left).png" width="13px" height="13px" alt="" /></button>
                        <p>マイプロフィール</p>
                    </div>
                    <button className={`${styles.logout}`} onClick={logout}>ログアウト</button>
                </div>
                <section>
                    <div className={`${styles.profileWrapper}`}>
                        <div className={`${styles.user_backImage}`}>
                            <button>
                                <img src={profile?.user_backImage} alt="" />
                            </button>
                            <div className={`${styles.user_iconWrapper}`}>
                                <button className={`${styles.user_icon}`}>
                                    <img id="user_icon" src={profile?.user_icon} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className={`${styles.bottomProfileWrapper}`}>
                            <div className={`${styles.top}`}>
                                <div>
                                    <button className={`${styles.editProfileButton}`} onClick={() => setDisplay(true)}>プロフィールを編集</button>
                                </div>
                            </div>
                            <div className={`${styles.infomation}`}>
                                <div className={`${styles.user_name}`}>
                                    <p>{user?.username}</p>
                                </div>
                                <div className={`${styles.self_introduction}`}>
                                    <p>{profile?.self_introduction}</p>
                                </div>
                                <div className={`${styles.date_joined}`}>
                                    <img src="/image/systemIcon/system/calendar_icon(darkblue).png" width="22px" alt="" />
                                    <span>{user_date_joined?.slice(0, user_date_joined.indexOf('月') + 1)}から利用しています。</span>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.selectButtonWrapper}`}>
                            <div className={`${styles.selectButton}`}>
                                <button className={`${selectState === 1 && styles.active}`} onClick={() => setSelectState(1)}>レビューしたアニメ（{reviewAnime?.length}）</button>
                            </div>
                            <div className={`${styles.selectButton}`}>
                                <button className={`${selectState === 2 && styles.active}`} onClick={() => setSelectState(2)}>いいねしたアニメ（{user?.favorite_anime.length}）</button>
                            </div>
                        </div>
                    </div>
                    {
                        selectState === 1 &&
                        reviewAnime?.map((review, i) => {
                            return (
                                <div key={i} className="sectionItem">
                                    <ReviewSectionItem review={review} />
                                </div>
                            )
                        })
                    }
                    {
                        selectState === 2 &&
                        user?.favorite_anime?.map((favorite_anime, i) => {
                            return (
                                <div key={i} className="sectionItem favoriteItem">
                                    <p className="animeTitle">{favorite_anime.title}</p>
                                </div>
                            )
                        })
                    }
                </section>
                {
                    display &&
                    <>
                        <div onClick={() => setDisplay(false)} className="displayBackground" >
                        </div>
                        <div className={`${styles.editProfileWrapper}`}>
                            <div className={`${styles.editProfileTop}`}>
                                <div className={`${styles.topContent}`}>
                                    <button className="button-decoration1" onClick={() => setDisplay(false)}>
                                        <img src="/image/systemIcon/system/disable_icon.png" width="13px" height="13px" alt="" />
                                    </button>
                                    <p>プロフィールを編集</p>
                                </div>
                                <button onClick={() => editProfile()} className={`${styles.saveButton}`}>
                                    保存
                                </button>
                            </div>
                            <div className={`${styles.profileWrapper}`}>
                                <form className={`${styles.editForm}`}>
                                    <div className={`${styles.user_backImage}`}>
                                        <img ref={editUserBackImage} src={profile?.user_backImage} alt="" />
                                        <label className={`${styles.backImageInput}`}>
                                            <input onChange={onChangeUserBackImage} type="file" accept="image/*" />
                                        </label>
                                        <div className={`${styles.user_iconWrapper}`}>
                                            <div className={`${styles.user_icon}`} >
                                                <img id="user_icon" ref={editUserIcon} src={profile?.user_icon} alt="" />
                                            </div>
                                            <label className={`${styles.iconImageInput}`}>
                                                <input onChange={onChangeUserIcon} type="file" accept="image/*" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className={`${styles.bottomProfileWrapper}`}>
                                        <div className={`${styles.top}`}>
                                        </div>
                                        <div className={`${styles.editInfomation}`}>
                                            {error?.username &&
                                                <p className="errorMassage">{error.username}</p>
                                            }
                                            <div className={`${styles.editContent}`}>
                                                <span>名前</span>
                                                <input onChange={(e) => setSaveUsername(e.target.value)} ref={editUsername} defaultValue={user?.username} />
                                            </div>
                                            <div className={`${styles.editContent}`}>
                                                <span>自己紹介</span>
                                                <textarea onChange={(e) => { e.target.value ? setSaveSelfIntroduction(e.target.value) : setSaveSelfIntroduction(""); }}
                                                    onCompositionUpdate={(e) => { e.target.value ? setSaveSelfIntroduction(e.target.value) : setSaveSelfIntroduction("") }} ref={editSelfIntroduction} defaultValue={profile?.self_introduction}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                } */}
            </div>

            <div className={`${styles.mainContent}`}>
                <div className={`${styles.top}`}>
                    <h2 className={`${styles.username}`}>{user?.username}</h2>
                    <div className={`${styles.profileFrame}`}>
                        <div className={`${styles.backImage}`}>
                            <img src={profile?.user_backImage} alt="" />
                        </div>
                        <div className={`${styles.user_icon}`}>
                            <img id="user_icon" src={profile?.user_icon} alt="" />
                        </div>
                        <div className={`${styles.info}`}>
                            <p>レビューしたアニメ　{reviewAnime?.length ? `${reviewAnime?.length}作品` : "0作品"}</p>
                            <p>いいねしたアニメ　　{user?.favorite_anime.length}作品</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.recommend}`}>
                    <h2>おすすめしたいアニメ</h2>
                    <div className={`${styles.playlist}`}>
                        <div className={`${styles.animeFrame}`}>
                            <div className={`${styles.thumbnail}`}>
                            </div>
                            <button className={`${styles.playlistAddButton}`}>アニメを追加 +</button>
                        </div>
                    </div>
                </div>
            </div>
        </Auth >
    );
}
