import React, { useState, useEffect } from 'react'
import styles from '../../../styles/private.module.css'
import ReviewSectionItem from '../../../components/item/ReviewSectionItem'
import axios from 'axios'
import ReviewStarSimple from '../../../components/item/ReviewStarSimple'

export default function OtherUserProfile({ reviewData }) {
    const [user, setUser] = useState()
    const [reviewAnime, setReviewAnime] = useState()
    const [selectState, setSelectState] = useState(1)

    useEffect(() => {
        setUser(reviewData[0].user)
        setReviewAnime(reviewData)
    }, [reviewData])

    const user_date_joined = user?.date_joined.replace('-', '年').replace('-', '月')

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.sectionTop}`}>
                <div className={`${styles.sectionName}`}>
                    <button onClick={() => history.back()} className="button-decoration1"><img src="/image/systemIcon/system/allow_icon(left).png" width="13px" height="13px" alt="" /></button>
                    <p>{user?.username}さんのプロフィール</p>
                </div>
                <div></div>
            </div>
            <section className="section">
                <div className={`${styles.profileWrapper}`}>
                    <div className={`${styles.user_backImage}`}>
                        <button>
                            <img src={user?.profile.user_backImage} alt="" />
                        </button>
                        <div className={`${styles.user_iconWrapper}`}>
                            <button className={`${styles.user_icon}`}>
                                <img id="user_icon" src={user?.profile.user_icon} alt="" />
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.bottomProfileWrapper}`}>
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
                            <button className={`${selectState === 1 && styles.active}`} onClick={() => setSelectState(1)}>レビューアニメ</button>
                        </div>
                        <div className={`${styles.selectButton}`}>
                            <button className={`${selectState === 2 && styles.active}`} onClick={() => setSelectState(2)}>お気に入りアニメ</button>
                        </div>
                    </div>
                </div>
                {
                    selectState === 1 &&
                    reviewAnime?.map((review, i) => {
                        console.log(review);
                        return (
                            <div key={i} className={`${styles.sectionItemWrapper}`}>
                                <div className={`${styles.sectionItem}`}>
                                    <div className={`${styles.itemImage}`}>
                                        <img src={review.anime.image} alt={review.anime.title} />
                                    </div>
                                    <div className={`${styles.itemInfo}`}>
                                        <p>{review.anime.title}</p>
                                        <p>{user?.username}さんの評価： <span className={`${styles.star}`}>★{review.star}</span></p>
                                    </div>
                                    {
                                        <span className={`${styles.moreInfo}`}>続きを読む</span>
                                    }
                                </div>
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

export async function getServerSideProps({ query }) {
    const reviewData = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}users/ReviewAnime/?user_id=${query.userId
        }`)).data.results

    return { props: { reviewData } }
}

/* export async function getStaticPaths() {
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

export async function getStaticProps({ params, query }) {
    const reviewData = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}users/review_anime/?user_id=${query.userId
        }`)).data.results

    return { props: { reviewData } }
} */
