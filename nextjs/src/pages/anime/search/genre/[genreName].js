import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../../../../styles/anime_search_genre.module.css'
import TagWrapper from '../../../../components/item/TagWrapper';
import AnimeSectionItem from '../../../../components/item/AnimeSectionItem';
import { getAllGenreData } from '../../../../lib/GenreDataViewSet';
import { getAnimeSimpleFindToGenres } from '../../../../lib/AnimeSimpleViewSet';
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from 'swiper'

export default function GenreSort({ allGenre, genreName, genreAnimeData }) {
    const [genres, setGenres] = useState()
    const [slidesPerViewWidth, setSlidePerViewWidth] = useState(typeof window !== "undefined" && window.outerWidth / 250)

    useEffect(() => {
        setGenres(allGenre);
        typeof window !== "undefined" && window.outerWidth <= 600 && setSlidePerViewWidth(window.outerWidth / 120)
    }, [])

    // Swiper
    SwiperCore.use([EffectCoverflow, Pagination, Navigation])

    return (
        <section className={`${styles.section}`}>
            <div className={`${styles.content}`}>
                <div className={`${styles.items}`}>
                    <Swiper
                        pagination={{
                            clickable: true,
                        }} //　何枚目のスライドかを示すアイコン、スライドの下の方にある
                        slidesPerView={slidesPerViewWidth} // 表示するスライドの枚数
                        centeredSlides={false}
                        modules={[EffectCoverflow, Navigation]}
                        loop={true}
                    >
                        {
                            genres?.map((genre, i) => {
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
                                    <SwiperSlide key={`${i}`} className={`${styles.swiperSlideWrapper}`}>
                                        <div className={`${styles.button}`}>
                                            <Link href="/anime/search/genre/[genreName]" as={`/anime/search/genre/${genre}`} passhref="true">
                                                <a>
                                                    <img src={icon[i]} alt={genre} />
                                                    <span className={`${styles.tagName} ${styles.genreName}`}>{genre}</span>
                                                </a>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                );
                            })
                        }
                    </Swiper>
                </div>
                <div className={`${styles.resultWrapper}`}>
                    {
                        genreAnimeData?.map((anime, i) => {
                            return (
                                <div key={i} className={`${styles.resultItem}`}>
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
    )
}

export async function getStaticPaths() {
    // animeId をすべて取得
    const res = await (getAllGenreData()).then(async res => await res.map(data => data.genre));
    // params に animeId を指定
    const paths = res.map(genre => ({
        params: {
            genreName: `${genre}`
        },
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    // アニメデータ取得
    const genreName = params.genreName
    const allGenre = await (getAllGenreData()).then(async res => await res.map(data => data.genre));
    const genreAnimeData = await (getAnimeSimpleFindToGenres(params.genreName, null, null, { offset: 0 }));

    return {
        props: { genreName, allGenre, genreAnimeData },
    };
}
