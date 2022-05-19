import React, { useState, useEffect } from 'react'
import styles from '../../styles/components-css/AnimeSwiperItem.module.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from 'swiper'
import Link from 'next/link'
import ReviewStar from './ReviewStar'

export default function AnimeSwiperItem({ animesData }) {
    const [animes, setAnimes] = useState()
    const[slidesPerViewWidth, setSlidePerViewWidth] = useState(3.5)

    useEffect(() => {
        setAnimes(animesData);
        typeof window !== "undefined" && window.outerWidth <= 600 && setSlidePerViewWidth(window.outerWidth / 140)
    }, [])

    // swiper で使用するアニメ画像
    SwiperCore.use([EffectCoverflow,Pagination, Navigation])
    const images = [
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/17/2/25172_1_1.png?1638433806000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/20/2/25202_1_1.png?1639560672000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/24/8/25248_1_1.png?1639621807000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/18/2/25182_1_1.png?1638419407000",
    ]

    return (
        <div className={`${styles.swipperWrapper}`}>
            <Swiper
                pagination={{
                    clickable: true,
                }} //　何枚目のスライドかを示すアイコン、スライドの下の方にある
                slidesPerView={slidesPerViewWidth} // 表示するスライドの枚数
                centeredSlides={false}
                modules={[EffectCoverflow, Pagination, Navigation]}
                loop={true}
            >
                {animes?.map((anime, index) => {
                    return (
                        <SwiperSlide key={`${index}`} className={`${styles.swiperSlideWrapper}`}>
                            <div className={`${styles.swiperSlide}`}>
                                <Link href='/anime/detail/[animeId]' as={`/anime/detail/${anime.id}`} passhref="true">
                                    <a>
                                        <div className={`${styles.image}`}>
                                            <img
                                                /* src={anime.image} */
                                                src="https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/17/2/25172_1_1.png?1638433806000"
                                                layout="responsive"
                                                alt={anime.title}
                                            />
                                            <div className={`${styles.imageMaskX}`}></div>
                                        </div>
                                        <p className={`${styles.title}`}>{anime.title}</p>
                                    </a>
                                </Link>
                            </div>
                            <div className={`${styles.reviewStar}`}>
                                <ReviewStar animeTitle={anime.title} reviewanime_set={anime.reviewanime_set} />
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
