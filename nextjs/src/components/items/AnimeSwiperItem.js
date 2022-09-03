import React, { useState, useEffect, useCallback } from 'react'
import styles from 'Styles/components-css/AnimeSwiperItem.module.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation, EffectCoverflow, EffectCards } from 'swiper'
import Link from 'next/link'
import ReviewStar from './ReviewStar'
import AnimeItemTitle from './_parts/title/AnimeItemTitle'

export default function AnimeSwiperItem({ animesData }) {
    /* アニメデータ */
    const [animes, setAnimes] = useState()
    useEffect(() => {
        setAnimes(animesData);
    }, [])

    /* Swiper */
    SwiperCore.use([EffectCoverflow, Pagination, Navigation])
    /* レスポンシブサイズ監視 -> SwipperSlide の枚数を調整 */
    const [responsiveWidth, setResponsiveWidth] = useState(typeof window !== "undefined" && window.outerWidth / 380)
    useEffect(() => {
        typeof window !== "undefined" &&
            window.addEventListener('resize', () => {
                setResponsiveWidth(typeof window !== "undefined" && window.outerWidth / 380)
            })
        return () => {
            typeof window !== "undefined" && window.removeEventListener('resize', setResponsiveWidth);
        }
    }, [responsiveWidth])


    return (
        <div className={`${styles.swipperWrapper}`}>
            <Swiper
                effect={"cards"}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }} //　何枚目のスライドかを示すアイコン、スライドの下の方にある
                slidesPerView={responsiveWidth} // 表示するスライドの枚数
                modules={[EffectCards]}
                loop={true}
            >
                {
                    animes?.map((anime, index) => {
                        return (
                            <SwiperSlide key={`${index}`} className={`${styles.swiperSlideWrapper}`}>
                                <div className={`${styles.swiperSlide}`}>
                                    <Link href='/anime/detail/[animeId]' as={`/anime/detail/${anime.id}`} passhref="true">
                                        <a>
                                            <div className={`${styles.image}`}>
                                                <img
                                                    src={anime.image}
                                                    /* src="https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/17/2/25172_1_1.png?1638433806000" */
                                                    layout="responsive"
                                                    alt={anime.title}
                                                />
                                                <div className={`${styles.reviewStar}`}>
                                                    <ReviewStar animeTitle={anime.title} reviewanime_set={anime.reviewanime_set} />
                                                </div>
                                                <div className={`${styles.imageMaskX}`}></div>
                                            </div>
                                        </a>
                                    </Link>
                                    <div className={`${styles.animeTitle}`}>
                                        <AnimeItemTitle animeTitle={anime.title} animeId={anime.id} />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
            </Swiper>
        </div>
    )
}
