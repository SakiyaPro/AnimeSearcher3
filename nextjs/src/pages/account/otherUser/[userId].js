import React, { useState, useEffect } from 'react'
import styles from '../../../styles/private.module.css'
import ReviewSectionItem from '../../../components/item/ReviewSectionItem'
import axios from 'axios'

export default function OtherUserProfile({ reviewData }) {
    const [user, setUser] = useState()
    const [reviewAnime, setReviewAnime] = useState()
    const [selectState, setSelectState] = useState(1)

    useEffect(() => {
        setUser(reviewData[0].user)
        setReviewAnime(reviewData)
        console.log(reviewData);
    }, [reviewData])

    const user_date_joined = user?.date_joined.replace('-', '年').replace('-', '月')

    return (
        <div>
            <section className="section">
                <div className="sectionTop">
                    <button onClick={() => history.back()} className="button-decoration1"><img src="/image/systemIcon/system/allow_icon(left).png" width="13px" height="13px" alt="" /></button>
                    <p className="sectionName">{user && user.username}さんのプロフィール</p>
                </div>
                <div className={`${styles.profileWrapper}`}>
                    <div>
                        <button>
                            <img className={`${styles.user_backImage}`} src={user?.profile.user_backImage} alt="" />
                        </button>
                    </div>
                    <div className={`${styles.bottomProfileWrapper}`}>
                        <div className={`${styles.user_iconWrapper}`}>
                            <button>
                                <img id="user_icon" className={`${styles.user_icon}`} src={user?.profile.user_icon} alt="" />
                            </button>
                        </div>
                        <div className={`${styles.top}`}>
                        </div>
                        <div className={`${styles.infomation}`}>
                            <div className={`${styles.user_name}`}>
                                <p>{user?.username}</p>
                            </div>
                            <div className={`${styles.self_introduction}`}>
                                <p>{user?.profile.self_introduction}</p>
                            </div>
                            <div className={`${styles.date_joined}`}>
                                <img src="/image/systemIcon/system/calendar_icon(darkblue).png" width="22px" alt="" />
                                <span>{user_date_joined?.slice(0, user_date_joined.indexOf('月') + 1)}から利用しています。</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.selectButtonWrapper}`}>
                        <div className={`${styles.selectButton}`}>
                            <button className={`${selectState === 1 && styles.active}`} onClick={() => setSelectState(1)}>レビューしたアニメ</button>
                        </div>
                        <div className={`${styles.selectButton}`}>
                            <button className={`${selectState === 2 && styles.active}`} onClick={() => setSelectState(2)}>いいねしたアニメ</button>
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
        </div>
    )
}

export async function getStaticPaths() {
    // animeId をすべて取得
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}users/userIds/?format=json&limit=100000`)).data.results
    // params に animeId を指定
    const paths = res.map(obj => ({
        params: {
            userId: `${obj.id}`
        },
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params, context }) {
    const reviewData = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}users/review_anime/?user_id=${params.userId}`)).data.results

    return { props: { reviewData } }
}
