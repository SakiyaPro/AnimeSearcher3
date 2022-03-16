import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getAnimeData } from '../../lib/getAnimeData'
import { getAllGenre } from '../../lib/getGenreData'
import { update_genre, remove_genre, login_request, conversionStrDate, conversionSeasonName } from '../../utils/functions'
import styles from '../../styles/anime_detail.module.css'
import BarGraph from '../../components/item/BarGraph'


import axios from 'axios'

export default function AnimeDetail({ anime, allGenre }) {
    console.log(anime);
    const router = useRouter()
    const [display, setDisplay] = useState(false)
    let addTag = []
    allGenre.map(data => {
        addTag.push(data.genre)
    })
    anime.genres.map(data => {
        if (addTag.includes(data.genre)) {
            addTag.splice(addTag.indexOf(data.genre), 1)
        }
    })
    console.log(addTag);
    return (
        <div className="mainWrapper detailMainWrapper">
            <div className="centerWrapper detailCenterWrapper">
                <div className="sectionTop detailSectionTop">
                    <button onClick={() => router.back()} className="button-decoration1"><img src="/image/systemIcon/system/allow_icon(left).png" width="13px" height="13px" /></button>
                    <p className="sectionName">{anime.title}{anime.media === 'MOVIE' ? ' （映画）' : (anime.media === 'OVA' ? ' （OVA）' : '')}</p>
                </div>
                <section className="section detailSection">
                    <div className="sectionItem detailSectionItem">
                        <article className="centerArticle detailCenterArticle">
                            <div className="viewContent">
                                <BarGraph reviewanime_set={anime.reviewanime_set} />
                                <div className="imageWrapper detailImageWrapper" >
                                    <img src={anime.image} />
                                </div>
                                <div className={`${styles.modifired}`}>最終更新日： <span>{conversionStrDate(anime.modified)}</span></div>
                            </div>
                            <div className={`${styles.bottomItems}`}>
                                <div className={`${styles.tagWrapper}`}>
                                    <p className={`${styles.tag}`}>{anime.seasonYear}年 {conversionSeasonName(anime.seasonName)}アニメ</p>
                                    {anime.genres.map((data, i) => {
                                        return (
                                            <p key={i} className={`${styles.tag}`}>{data.genre}</p>
                                        )
                                    })}
                                    <button onClick={() => { setDisplay(true) }} className={`${styles.addButton}`}>
                                        <img src="/image/systemIcon/system/plus_icon(blue).png" width="25px" />
                                    </button>
                                    {login_request() === true ?
                                        display &&
                                        <div onClick={() => setDisplay(false)} className={`${styles.desableAddButton}`}>
                                            <div className={`${styles.activeAddButton}`}>
                                                <div className={`${styles.contentTop}`}>
                                                    <button className="button-decoration1">
                                                        <img src="/image/systemIcon/system/disable_icon.png" width="13px" height="13px" />
                                                    </button>
                                                    <div>ジャンルタグ追加</div>
                                                </div>
                                                <div className={`${styles.contentWrapper}`}>
                                                    <div className={`${styles.text}`}>
                                                        <div className={`${styles.currentTagWrapper}`}>
                                                            <div className={`${styles.iconWrapper}`}>
                                                                <img src="/image/systemIcon/system/label_icon.png" width="20px" />
                                                                <p className={`${styles.smallBlueText}`}>現在タグ:</p>
                                                            </div>
                                                            {anime.genres.map((data, i) => {
                                                                return (
                                                                    <div key={i} onClick={() => remove_genre(anime.id, data.genre)} className={`${styles.tag}`}>
                                                                        <img src="/image/systemIcon/system/minus_icon(blue).png" width="13px" />
                                                                        <p>{data.genre}</p>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        <div className={`${styles.addTagWrapper}`}>
                                                            <div className={`${styles.iconWrapper}`}>
                                                                <img src="/image/systemIcon/system/label_icon(black).png" width="20px" />
                                                                <p className={`${styles.smallBlueText}`}>追加タグ:</p>
                                                            </div>
                                                            {addTag.map((genre, i) => {
                                                                return (
                                                                    <div key={i} onClick={() => update_genre(anime.id, genre)} className={`${styles.tag}`}>
                                                                        <img src="/image/systemIcon/system/plus_icon(333).png" width="13px" />
                                                                        <p>{genre}</p>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        display &&
                                        <div onClick={() => setDisplay(false)} className={`${styles.desableAddButton}`}>
                                            <div className={`${styles.activeAddButton}`}>
                                                <div className={`${styles.contentTop}`}>
                                                    <button className="button-decoration1">
                                                        <img src="/image/systemIcon/system/disable_icon.png" width="13px" height="13px" />
                                                    </button>
                                                    <div>ジャンルタグ追加</div>
                                                </div>
                                                <div className={`${styles.contentWrapper}`}>
                                                    <div>
                                                        <img src="https://iconbu.com/wp-content/uploads/2019/11/%E5%B7%A5%E4%BA%8B%E4%B8%AD.png" width="60px" />
                                                    </div>
                                                    <div className={`${styles.text}`}>
                                                        <p>申し訳ございません。</p>
                                                        <p>本機能は会員専用機能であるため、ご利用いただけません。</p>
                                                        <p>下記より無料会員登録（またはログイン）を行うことで、当サイトの会員専用機能を開放できます。</p>
                                                        <p>ご不便をおかけしますが、ご理解のほど宜しくおねがいします。</p>
                                                        <Link href="#"><a className="a-decoration1">会員登録またはログインはこちら</a></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </div>
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
    // 事前ビルドしたいパスをpathsとして渡す fallbackについては後述
    return { paths, fallback: false }
}

export async function getStaticProps({ params, context }) {
    const anime = await getAnimeData(params.animeId, { offset: 0 })
    const allGenre = await getAllGenre()

    return { props: { anime, allGenre } }
}
