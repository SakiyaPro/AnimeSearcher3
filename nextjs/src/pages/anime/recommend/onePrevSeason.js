import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/anime_recommend.module.css'
import { getSeasonData } from "../../../lib/getAnimeData";
import { getAllGenre } from "../../../lib/getGenreData"
import { getSeasonAndYear, conversionSeasonName } from "../../../utils/functions";

import ReviewStar from "../../../components/item/ReviewStar";
import TagWrapper from '../../../components/item/TagWrapper';
import AnimeSectionItem from '../../../components/item/AnimeSectionItem';


const [BEFORESEASON1, BEFOREYEAR1] = getSeasonAndYear(-3)

export default function OnePrevSeason({ onePrevSeasonData, allGenre }) {
    const router = useRouter()

    // ページ移動時のスクロール位置を記録
    /* useEffect(() => {
        window.addEventListener('beforeunload', window.scrollTo({ top: sessionStorage.getItem(router.pathname), behavior: "smooth" }))
        return () => {
            window.removeEventListener('beforeunload', window.scrollTo({ top: sessionStorage.getItem(router.pathname), behavior: "smooth" }))
        };
    }, [router.pathname]) */

    return (
        <>
            <div className="sectionTop">
                <Link href="/recommend/onePrevSeason" passhref="true"><a className="sectionName">{BEFOREYEAR1} {conversionSeasonName(BEFORESEASON1)}アニメ</a></Link>
            </div>
            <section className="section">
                {
                    onePrevSeasonData?.map((anime, i) => {
                        return (
                            <div key={i} className="sectionItem">
                                <TagWrapper anime={anime} allgenre={allGenre} />
                                <AnimeSectionItem anime={anime} />
                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}

export async function getStaticProps() {
    // アニメデータ取得
    const onePrevSeasonData = await getSeasonData(BEFORESEASON1, BEFOREYEAR1, { offset: 0 });
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return {
        props: { onePrevSeasonData, allGenre },
    };
};
