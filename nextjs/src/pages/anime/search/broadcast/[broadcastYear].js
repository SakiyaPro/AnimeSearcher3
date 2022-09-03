// React
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
// CSS
import styles from '../../../../styles/anime_search.module.css';
// Components
import AnimeSectionItem from '../../../../components/items/sectionItem/AnimeSectionItem';
import TagWrapper from '../../../../components/items/TagWrapper';
// ViewSets
import { getAnimeSimpleFindToSeason } from '../../../../libs/AnimeSimpleViewSet';
import { getAllGenreData } from '../../../../libs/GenreDataViewSet';
// Other
import { getSeasonAndYear } from '../../../../utils/functions';


/* 放送年度検索結果 */
export default function Broadcast({ broadcastData, allGenre }) {
    // useRouter
    const router = useRouter();

    // useState
    const [broadcastYearDisplay, setBroadcastYearDisplay] = useState();         // 放送年度ディスプレイ状態管理
    const [broadcastSeasonDisplay, setBroadcastSeasonDisplay] = useState();     // 放送年度ディスプレイ状態管理
    const broadcastYear = useRef();                                             // 放送年度ディスプレイ状態管理
    const broadcastSeason = useRef();                                           // 放送年度ディスプレイ状態管理

    // useEffect
    useEffect(() => {
        if (router.query.broadcastYear) {
            // URLパラメータに放送年度が入っているなら
            broadcastYear.current?.value = router.query.broadcastYear
        }
        if (router.query.broadcastSeason) {
            // URLパラメータに放送季節が入っているなら
            if (router.query.broadcastSeason === "WINTER") {
                broadcastSeason.current?.value = "冬 1～3月"
            } else if (router.query.broadcastSeason === "SPRING") {
                broadcastSeason.current?.value = "春 4～6月"
            } else if (router.query.broadcastSeason === "SUMMER") {
                broadcastSeason.current?.value = "夏 7～9月"
            } else if (router.query.broadcastSeason === "AUTUMN") {
                broadcastSeason.current?.value = "秋 10～12月"
            }
        }
    }, []);

    return (
        <section className="section">
            <div className={`${styles.broadcast} ${styles.broadcastResult}`}>
                <div className={`${styles.year}`}>
                    <p>Year: </p>
                    <div className={`${styles.inputArea}`}>
                        <input onFocus={() => setBroadcastYearDisplay(true)} onBlur={() => setBroadcastYearDisplay(false)} ref={broadcastYear} placeholder="放送年" />
                        {
                            broadcastYearDisplay &&
                            <ul className={`${styles.suggest}`}>
                                {
                                    [...Array(getSeasonAndYear(0)[1] - 2009).keys()].map((e, i) => {
                                        return (
                                            <li key={i}><button onMouseDown={() => { broadcastYear.current.value = e + 2010, setBroadcastYearDisplay(!broadcastYearDisplay) }}>{e + 2010}</button></li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </div>
                </div>
                <div className={`${styles.season}`}>
                    <p>Season: </p>
                    <div className={`${styles.inputArea}`}>
                        <input onFocus={() => setBroadcastSeasonDisplay(true)} onBlur={() => setBroadcastSeasonDisplay(false)} ref={broadcastSeason} placeholder="放送季節" />
                        {
                            broadcastSeasonDisplay &&
                            <ul className={`${styles.suggest}`}>
                                <li>
                                    <button onMouseDown={() => { broadcastSeason.current.value = "冬 1～3月", setBroadcastSeasonDisplay(!broadcastSeasonDisplay) }}>
                                        冬 1～3月
                                    </button>
                                </li>
                                <li>
                                    <button onMouseDown={() => { broadcastSeason.current.value = "春 4～6月", setBroadcastSeasonDisplay(!broadcastSeasonDisplay) }}>
                                        春 4～6月
                                    </button>
                                </li>
                                <li>
                                    <button onMouseDown={() => { broadcastSeason.current.value = "夏 7～9月", setBroadcastSeasonDisplay(!broadcastSeasonDisplay) }}>
                                        夏 7～9月
                                    </button>
                                </li>
                                <li>
                                    <button onMouseDown={() => { broadcastSeason.current.value = "秋 10～12月", setBroadcastSeasonDisplay(!broadcastSeasonDisplay) }}>
                                        秋 10～12月
                                    </button>
                                </li>
                            </ul>
                        }
                    </div>
                    <a className={`${styles.searchButton}`}
                        href={encodeURI(`/anime/search/broadcast/${broadcastYear.current?.value === "" ? getSeasonAndYear(0)[1] : broadcastYear.current?.value}?broadcastSeason=${broadcastSeason.current?.value === "冬 1～3月" ? "WINTER" :
                            broadcastSeason.current?.value === "春 4～6月" ? "SPRING" :
                                broadcastSeason.current?.value === "夏 7～9月" ? "SUMMER" :
                                    broadcastSeason.current?.value === "秋 10～12月" ? "AUTUMN" : ""}`)} >
                        <img src="/image/systemIcon/system/search_icon.png" />
                        <span>検索</span>
                    </a>
                </div>
            </div>
            <div className={`${styles.resultWrapper}`}>
                {
                    broadcastData ?
                        broadcastData.map((anime, i) => {
                            return (
                                <div key={i} className={`${styles.resultItem}`}>
                                    <div className={`${styles.tags}`}>
                                        <TagWrapper anime={anime} allgenre={allGenre} />
                                    </div>
                                    <AnimeSectionItem anime={anime} />
                                </div>
                            )
                        })
                        :
                        <p>no result</p>
                }
            </div>
        </section>
    );
};

export async function getServerSideProps({ query }) {
    // 放送年度アニメを取得
    const broadcastData = await getAnimeSimpleFindToSeason(query.broadcastSeason, query.broadcastYear, { offset: 0 });
    // ジャンルデータ取得
    const allGenre = await (getAllGenreData()).then(async res => await res.map(data => data.genre));

    return { props: { broadcastData, allGenre } }
};
