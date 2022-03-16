import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSeasonData } from "../lib/getAnimeData";
import Thumbnail from "../components/item/Thumbnail";
import ThumbnailSimple from "../components/item/ThumbnailSimple";
import AnimeViewPagenation from '../components/view/AnimeViewPagenation';
import { getSeasonAndYear, conversionSeasonName } from "../utils/functions";

import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from 'swiper'
import ReviewStar from "../components/item/ReviewStar";
import SearchBar from '../components/item/SearchBar';

const [NOWSEASON, NOWYEAR] = getSeasonAndYear(0)
const [BEFORESEASON1, BEFOREYEAR1] = getSeasonAndYear(-3)

export default function Home({ seasonData, beforeSeasonData1, popularData }) {
    console.log(NOWSEASON);
    console.log(NOWYEAR);
    const [profile, setProfile] = useState()
    const [selectMainState, setSelectMainState] = useState(1)

    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem("profile")))
    }, [])

    const images = [
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/17/2/25172_1_1.png?1638433806000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/20/2/25202_1_1.png?1639560672000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/24/8/25248_1_1.png?1639621807000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/18/2/25182_1_1.png?1638419407000",
    ]

    return (
        <div className="mainWrapper">
            <div className="centerWrapper">
                <div className="sectionTop">
                    <p className="sectionName">ホーム</p>
                </div>
                <section className="section">
                    {
                        seasonData?.map((anime, i) => {
                            return (
                                <div key={i} className="sectionItem">
                                    <Link href={`/detail/${anime.id}`} as={`/detail/${anime.id}`}><a>
                                        <article className="centerArticle">
                                            <div className="content">
                                                <h1>{anime.title}</h1>
                                                <ReviewStar datarate={anime.reviewanime_set} />
                                                <div className="imageWrapper" >
                                                    <img src={anime.image} />
                                                </div>
                                            </div>
                                        </article>
                                    </a></Link>
                                </div>
                            )
                        })
                    }
                </section>
            </div>
            <div className="rightWrapper">
                <div>
                    <SearchBar />
                    <p style={{ color: '#000' }}>aaa</p>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps() {
    // アニメデータ取得 (seasonData)
    const seasonData = await getSeasonData(NOWSEASON, NOWYEAR, {offset: 0})
    const beforeSeasonData1 = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?format=json&limit=200&watchersCount_max=true&seasonName=${BEFORESEASON1}&seasonYear=${BEFOREYEAR1}`)).data.results;
    // アニメデータ取得 (popularData)
    const popularData = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?format=json&limit=10&watchersCount_max=true`)).data.results;

    return {
        props: { seasonData, beforeSeasonData1, popularData },
    }
}
