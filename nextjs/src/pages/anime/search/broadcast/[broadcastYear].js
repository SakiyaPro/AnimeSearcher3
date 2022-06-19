import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router';
import styles from '../../../../styles/anime_search.module.css'
import AnimeSectionItem from '../../../../components/item/AnimeSectionItem';
import TagWrapper from '../../../../components/item/TagWrapper';
import { getSeasonData } from '../../../../lib/getAnimeData';
import { getAllGenre } from '../../../../lib/getGenreData';
import { getSeasonAndYear } from '../../../../utils/functions';

export default function Broadcast({ broadcastData, allGenre }) {
    const router = useRouter()

    const [broadcastYearDisplay, setBroadcastYearDisplay] = useState()
    const [broadcastSeasonDisplay, setBroadcastSeasonDisplay] = useState()
    const broadcastYear = useRef()
    const broadcastSeason = useRef()

    useEffect(() => {
        if (router.query.broadcastYear) {
            broadcastYear.current?.value = router.query.broadcastYear
        }
        if (router.query.broadcastSeason) {
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
    }, [])

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
    )
}

export async function getServerSideProps({ query }) {
    const broadcastData = await getSeasonData(query.broadcastSeason, query.broadcastYear, { offset: 0 })
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return { props: { broadcastData, allGenre } }
}
