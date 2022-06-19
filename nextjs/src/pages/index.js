import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import TagWrapper from '../components/item/TagWrapper';
import AnimeSectionItem from '../components/item/AnimeSectionItem';
import AnimeSwiperItem from '../components/item/AnimeSwiperItem';
import { getSeasonData, getWatchersData } from '../lib/getAnimeData';
import { getAllGenre } from '../lib/getGenreData';
import { login_request, getSeasonAndYear } from '../utils/functions';


const [NOWSEASON, NOWYEAR] = getSeasonAndYear(0)
const [BEFORESEASON1, BEFOREYEAR1] = getSeasonAndYear(-3)

export default function Home({ nowSeasonData, onePrevSeasonData, popularData, allGenre }) {
    const [LoginState, setLoginState] = useState()
    const [secIconWidth, setSecIconWidth] = useState("14px")

    useEffect(() => {
        setLoginState(login_request())
        typeof window !== "undefined" && window.outerWidth > 600 && setSecIconWidth("23px")
    }, [])


    return (
        <>
            <section className="section">
                <h2 className="sectionTitle">
                    放送中アニメ
                    <span className={`${styles.sectionTitleMoreInfo}`}>
                        <Link href="/anime/recommend/nowSeason" passhref="true"><a>もっと見る（{nowSeasonData.length}作品）</a></Link>
                    </span>
                </h2>
                <AnimeSwiperItem animesData={nowSeasonData?.slice(0, 10)} />

                <h2 className="sectionTitle">
                    前期アニメ
                    <span className={`${styles.sectionTitleMoreInfo}`}>
                        <Link href="/anime/recommend/onePrevSeason" passhref="true"><a>もっと見る（{onePrevSeasonData.length}作品）</a></Link>
                    </span>
                </h2>
                <AnimeSwiperItem animesData={onePrevSeasonData?.slice(0, 10)} />

                <h2 className="sectionTitle">
                    人気アニメ
                    <span className={`${styles.sectionTitleMoreInfo}`}>
                        <Link href="/anime/recommend/popularAnime" passhref="true"><a>もっと見る</a></Link>
                    </span>
                </h2>
                <AnimeSwiperItem animesData={popularData?.slice(0, 10)} />
            </section>
        </>
    );
};

export async function getServerSideProps() {
    // アニメデータ取得
    const nowSeasonData = await getSeasonData(NOWSEASON, NOWYEAR, { offset: 0 });
    const onePrevSeasonData = await getSeasonData(BEFORESEASON1, BEFOREYEAR1, { offset: 0 });
    const popularData = await getWatchersData("", 4000, { offset: 0 });
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return {
        props: { nowSeasonData, onePrevSeasonData, popularData, allGenre },
    };
}
