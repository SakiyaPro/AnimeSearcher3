import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { getDetailAnimeData } from '../../../lib/getAnimeData'
import { getAllGenre } from '../../../lib/getGenreData'
import { conversionStrDate } from '../../../utils/functions'
import styles from '../../../styles/anime_detail.module.css'
import BarGraph from '../../../components/item/BarGraph'
import ReviewStar from '../../../components/item/ReviewStar'

import axios from 'axios'
import TagWrapper from '../../../components/item/TagWrapper'
import ReviewSectionItem from '../../../components/item/ReviewSectionItem'
import Cookies from 'js-cookie'

export default function AnimeDetail({ anime, reviewData, allGenre }) {
    const router = useRouter()
    const [displayState, setDisplayState] = useState(1)

    console.log(anime);

    return (
        <>
            <section className="section">
                <div className={`${styles.detailInfo}`}>
                    <div className={`${styles.animeImage}`}>
                        {/* <img src={anime.image} alt={anime.title} /> */}
                        <img src={"https://cs1.animestore.docomo.ne.jp/anime_kv/img/11/37/5/11375_1_9_8b.png?1551176232000"} />
                        <div className={`${styles.imageMaskY}`}></div>
                        <div className={`${styles.imageMaskX}`}></div>
                    </div>
                    <div className={`${styles.bottomContents}`}>
                        <h2 className={`${styles.animeTitle}`}>
                            {anime.title}
                        </h2>
                        <div className={`${styles.switchInfo}`}>
                            <div>
                                <button onClick={() => setDisplayState(1)} className={`${styles.firstButton} ${displayState === 1 && styles.active}`}>評価分布</button>
                            </div>
                            <div>
                                <button onClick={() => setDisplayState(2)} className={`${styles.secondButton} ${displayState === 2 && styles.active}`}>アニメ情報</button>
                            </div>
                        </div>

                        <article className="centerArticle">
                            {
                                displayState === 1 &&
                                <>
                                    <div className="viewContent">
                                        <ReviewStar reviewanime_set={anime.reviewanime_set} />
                                        <BarGraph animeId={anime.id} reviewanime_set={anime.reviewanime_set} />
                                        <div className="modified"><span>あなたの感想をお待ちしています！</span></div>
                                    </div>
                                    {
                                        reviewData?.map((review, i) => {
                                            delete review.anime.image
                                            return (
                                                <ReviewSectionItem key={i} review={review} />
                                            )
                                        })
                                    }
                                </>
                            }
                            {
                                displayState === 2 &&
                                <>
                                    <div className="viewContent">
                                        <h3>あらすじ</h3>
                                        {
                                            anime.story ?
                                                <p>{anime?.story}</p> :
                                                <p className={`${styles.noInfo}`} >情報がありません。</p>
                                        }
                                        <h3>キャスト</h3>
                                        {
                                            anime.casts ?
                                                <div className={`${styles.animeInfo}`}>
                                                    {anime?.casts.map((cast, i) => {
                                                        return (
                                                            <button key={i}>
                                                                {cast.character.map((chara, i) => {
                                                                    return (
                                                                        <span key={`character_name ${i}`}>{chara.name} </span>
                                                                    )
                                                                })}: {cast.name}
                                                            </button>
                                                        )
                                                    })}
                                                </div> :
                                                <p className={`${styles.noInfo}`} >情報がありません。</p>
                                        }
                                        <h3>スタッフ</h3>
                                        {
                                            anime.staffs ?
                                                <div className={`${styles.animeInfo}`}>
                                                    {anime?.staffs.map((staff, i) => {
                                                        return (
                                                            <button key={i}>{staff.roleOther}: {staff.name}</button>
                                                        )
                                                    })}
                                                </div> :
                                                <p className={`${styles.noInfo}`}>情報がありません。</p>
                                        }
                                    </div>
                                </>
                            }
                        </article>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getStaticPaths() {
    // animeId をすべて取得
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animeids/?format=json&limit=100000`)).data.results
    // params に animeId を指定
    const paths = res.map(obj => ({
        params: {
            animeId: `${obj.id}`
        },
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const anime = await getDetailAnimeData(params.animeId, { offset: 0 })
    const reviewData = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}users/review_anime/?anime_id=${anime.id}`)).data.results
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return { props: { anime, reviewData, allGenre } }
}
