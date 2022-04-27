import React from 'react'
import { useRouter } from 'next/router'
import { getDetailAnimeData } from '../../lib/getAnimeData'
import { getAllGenre } from '../../lib/getGenreData'
import { conversionStrDate } from '../../utils/functions'
import styles from '../../styles/anime_detail.module.css'
import BarGraph from '../../components/item/BarGraph'

import axios from 'axios'
import TagWrapper from '../../components/item/TagWrapper'
import ReviewSectionItem from '../../components/item/ReviewSectionItem'
import Cookies from 'js-cookie'

export default function AnimeDetail({ anime, reviewData, allGenre }) {
    const router = useRouter()

    return (
        <>
            <div className="sectionTop detailSectionTop">
                <button onClick={() => router.back()} className="button-decoration1"><img src="/image/systemIcon/system/allow_icon(left).png" width="13px" height="13px" alt="" /></button>
                <p className="sectionName">戻る</p>
            </div>
            <section className="section detailSection">
                <div className="detailSectionItem">
                    <article className="centerArticle detailCenterArticle">
                        <div className="viewContent">
                            <TagWrapper anime={anime} allgenre={allGenre} />
                            <p>{anime.title}{anime.media === 'MOVIE' ? ' （映画）' : (anime.media === 'OVA' ? ' （OVA）' : '')}</p>
                            <BarGraph animeId={anime.id} reviewanime_set={anime.reviewanime_set} />
                            <div className="imageWrapper detailImageWrapper" >
                                <img src={anime.image} alt={anime.title} />
                            </div>
                            <div className="modified">最終更新日： <span>{conversionStrDate(anime.modified)}</span></div>
                        </div>
                        <div className={`${styles.bottomItems}`}>
                        </div>
                    </article>
                </div>
                {
                    reviewData?.map((review, i) => {
                        delete review.anime.image
                        return (
                            <div key={i} className="sectionItem">
                                <ReviewSectionItem review={review} />
                            </div>
                        )
                    })
                }
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

    return { props: { anime, reviewData, allGenre }, revalidate: 1 }
}
