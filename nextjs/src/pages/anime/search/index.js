import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import styles from '../../../styles/anime_search.module.css'
import SearchBar from '../../../components/item/SearchBar'
import { getAllGenre } from '../../../lib/getGenreData'
import { conversionSeasonName, getSeasonAndYear } from '../../../utils/functions'

export default function AnimeSearch({ allGenre }) {
    const [BEFORESEASON1, setBEFORESEASON1] = useState()
    const [BEFOREYEAR1, setBEFOREYEAR1] = useState()

    // 放送年度ディスプレイ状態管理
    const [broadcastYearDisplay, setBroadcastYearDisplay] = useState()
    const [broadcastSeasonDisplay, setBroadcastSeasonDisplay] = useState()
    const broadcastYear = useRef()
    const broadcastSeason = useRef()



    useEffect(() => {
        setBEFORESEASON1(getSeasonAndYear(-3)[0])
        setBEFOREYEAR1(getSeasonAndYear(-3)[1])
    }, [])

    return (
        <>
            <section className={`${styles.section}`}>
                <div className={`${styles.content}`}>
                    <div className={`${styles.contentTitle}`}>
                        <h2>アニメタイトルで探す</h2>
                    </div>
                    <div className={`${styles.contentInfo}`}>
                        <div className={`${styles.items}`}>
                            <SearchBar />
                        </div>
                    </div>
                </div>
                <div className={`${styles.content}`}>
                    <div className={`${styles.contentTitle}`}>
                        <h2>放送時期で探す</h2>
                    </div>
                    <div className={`${styles.contentInfo}`}>
                        <div className={`${styles.items}`}>
                            <div className={`${styles.broadcast}`}>
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
                                </div>
                                <a className={`${styles.searchButton}`}
                                    href={encodeURI(`/anime/search/broadcast/${broadcastYear.current?.value === "" ? getSeasonAndYear(0)[1] : broadcastYear.current?.value }?broadcastSeason=${broadcastSeason.current?.value === "冬 1～3月" ? "WINTER" :
                                            broadcastSeason.current?.value === "春 4～6月" ? "SPRING" :
                                                broadcastSeason.current?.value === "夏 7～9月" ? "SUMMER" :
                                                    broadcastSeason.current?.value === "秋 10～12月" ? "AUTUMN" : ""}`)} >
                                    <img src="/image/systemIcon/system/search_icon.png" />
                                    <span>検索</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.content}`}>
                    <div className={`${styles.contentTitle}`}>
                        <h2>おすすめのタグ</h2>
                    </div>
                    <div className={`${styles.contentInfo}`}>
                        <div className={`${styles.items}`}>
                            <div className={`${styles.button}`}>
                                <Link href="/anime/recommend/nowSeason" passhref="true" >
                                    <a>
                                        <img src="https://spy-family.net/assets/img/special/anya/01.png" alt="放送中アニメ" />
                                        <span className={`${styles.tagName}`}>放送中</span>
                                    </a>
                                </Link>
                            </div>
                            <div className={`${styles.button}`}>
                                <Link href="/anime/recommend/onePrevSeason" passhref="true" >
                                    <a>
                                        <img src="https://news.mynavi.jp/article/20211025-2168777/images/001.jpg" alt="前期アニメ" />
                                        <span className={`${styles.tagName}`}>{BEFOREYEAR1}年{conversionSeasonName(BEFORESEASON1)}</span>
                                    </a>
                                </Link>
                            </div>
                            <div className={`${styles.button}`}>
                                <Link href="/anime/recommend/popularAnime" passhref="true" >
                                    <a>
                                        <img src="https://pbs.twimg.com/media/CskazHRUEAAPtDJ.jpg" alt="人気アニメ" />
                                        <span className={`${styles.tagName}`}>人気</span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.content}`}>
                    <div className={`${styles.contentTitle}`}>
                        <h2>ジャンルから探す</h2>
                    </div>
                    <div className={`${styles.contentInfo}`}>
                        <div className={`${styles.items}`}>
                            {
                                allGenre.map((genre, i) => {
                                    const icon = [
                                        "https://pbs.twimg.com/media/EWW-6cNUwAIFbCt.png", // 絵がきれい
                                        "https://i.pinimg.com/564x/26/0f/63/260f63a683a7ecd8e4d325e16ae60ec9.jpg", // 恋愛・ラブコメ
                                        "https://cdn-ak.f.st-hatena.com/images/fotolife/t/tableturning/20161014/20161014064854.jpg", // 逆ハーレム
                                        "https://animemiru.jp/wp-content/uploads/2018/06/clannad-nagisa03.jpg", // 感動
                                        "https://sportshub.cbsistatic.com/i/2021/03/18/ed886b61-ebe7-4bce-bfbd-2434fd0f6770/sword-art-online-kirito-anime-return-tease-1237666.jpg", // バトル
                                        "https://images-na.ssl-images-amazon.com/images/I/91MoAJWzc0L.jpg", // ハーレム
                                        "https://shuntaro-0816.up.seesaa.net/image/fe4a9371.jpg", // 青春
                                        "https://bookvilogger.com/wp-content/uploads/2018/07/h-2.jpg", // スポーツ
                                        "https://animemiru.jp/wp-content/uploads/2019/02/singeki_oogata.jpg", // ダークファンタジー
                                        "https://stat.ameba.jp/user_images/20110530/12/seisokukiroku/4d/22/j/o0600065011259876740.jpg?caw=800", // 日常・ほのぼの
                                    ]
                                    return (
                                        <div key={i} className={`${styles.button}`}>
                                            <Link href="/anime/search/genre/[genreName]" as={`/anime/search/genre/${genre}`} passhref="true">
                                                <a>
                                                    <img src={icon[i]} alt={genre} />
                                                    <span className={`${styles.tagName} ${styles.genreName}`}>{genre}</span>
                                                </a>
                                            </Link>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps() {
    // ジャンルデータ取得
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return {
        props: { allGenre },
    };
};
