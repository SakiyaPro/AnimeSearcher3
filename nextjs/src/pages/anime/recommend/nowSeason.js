
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/anime_recommend.module.css'
import { getSeasonData } from "../../../lib/getAnimeData";
import { getAllGenre } from '../../../lib/getGenreData';
import { getSeasonAndYear } from "../../../utils/functions";

import TagWrapper from '../../../components/item/TagWrapper';
import AnimeSectionItem from '../../../components/item/AnimeSectionItem';

import axios from 'axios';
import RecommendSectionTop from '../../../components/item/RecommendSectionTop';

const [NOWSEASON, NOWYEAR] = getSeasonAndYear(0)

export default function NowSeason({ nowSeasonData, allGenre }) {
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
            <section className={`${styles.section}`}>
                <div className={`${styles.content}`}>
                    <div className={`${styles.contentTitle}`}>
                        <h2>放送中のアニメ</h2>
                    </div>
                    <div className={`${styles.sectionItemWrapper}`}>
                        {
                            nowSeasonData?.map((anime, i) => {
                                return (
                                    <div key={i} className={`${styles.sectionItem}`}>
                                        <div className={`${styles.tags}`}>
                                            <TagWrapper anime={anime} allgenre={allGenre} />
                                        </div>
                                        <AnimeSectionItem anime={anime} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getStaticProps() {
    // アニメデータ取得
    const nowSeasonData = await getSeasonData(NOWSEASON, NOWYEAR, { offset: 0 })
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return {
        props: { nowSeasonData, allGenre },
    };
};
