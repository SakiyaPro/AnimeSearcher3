import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TagWrapper from '../components/item/TagWrapper';
import AnimeSectionItem from '../components/item/AnimeSectionItem';
import AnimeSwiperItem from '../components/item/AnimeSwiperItem';
import { getSeasonData, getWatchersData } from '../lib/getAnimeData';
import { getAllGenre } from '../lib/getGenreData';
import { login_request, getSeasonAndYear } from '../utils/functions';


import axios from 'axios'

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
                    今期のアニメ
                    <img src="/image/systemIcon/system/hot_icon.png" width={secIconWidth} alt="hot_icon" />
                </h2>
                <AnimeSwiperItem animesData={nowSeasonData?.slice(0, 10)} />

                <h2 className="sectionTitle">
                    前期のアニメ
                    <img src="/image/systemIcon/system/bofore_icon.png" width={secIconWidth} alt="before_icon" />
                </h2>
                <AnimeSwiperItem animesData={onePrevSeasonData?.slice(0, 10)} />

                <h2 className="sectionTitle">
                    人気のアニメ
                    <img src="/image/systemIcon/system/popular_icon.png" width={secIconWidth} alt="popular_icon" />
                </h2>
                <AnimeSwiperItem animesData={popularData?.slice(0, 10)} />

                {/* {
                    nowSeasonData?.map((anime, i) => {
                        return (
                            <div key={i} className="sectionItem">
                                <TagWrapper anime={anime} allgenre={allGenre} />
                                <AnimeSectionItem anime={anime} />
                            </div>
                        )
                    })
                } */}
            </section>
        </>
    );
};

export async function getStaticProps() {
    // アニメデータ取得
    const nowSeasonData = await getSeasonData(NOWSEASON, NOWYEAR, { offset: 0 });
    const onePrevSeasonData = await getSeasonData(BEFORESEASON1, BEFOREYEAR1, { offset: 0 });
    const popularData = await getWatchersData("", 4000, { offset: 0 });
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return {
        props: { nowSeasonData, onePrevSeasonData, popularData,  allGenre },
    };
}
