
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/anime_recommend.module.css'
import { getSeasonData } from "../../lib/getAnimeData";
import { getAllGenre } from '../../lib/getGenreData';
import { getSeasonAndYear } from "../../utils/functions";

import TagWrapper from '../../components/item/TagWrapper';
import AnimeSectionItem from '../../components/item/AnimeSectionItem';

/* import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from 'swiper' */
import axios from 'axios';


const [NOWSEASON, NOWYEAR] = getSeasonAndYear(0)

export default function NowSeason({ nowSeasonData, allGenre }) {
    const router = useRouter()

    // ページ移動時のスクロール位置を記録
    useEffect(() => {
        window.addEventListener('beforeunload', window.scrollTo({ top: sessionStorage.getItem(router.pathname), behavior: "smooth" }))
        return () => {
            window.removeEventListener('beforeunload', window.scrollTo({ top: sessionStorage.getItem(router.pathname), behavior: "smooth" }))
        };
    }, [router.pathname])

    /* SwiperCore.use([Pagination, Navigation])
    const images = [
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/17/2/25172_1_1.png?1638433806000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/20/2/25202_1_1.png?1639560672000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/24/8/25248_1_1.png?1639621807000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/18/2/25182_1_1.png?1638419407000",
    ] */

    return (
        <>
            <div className="sectionTop">
                <Link href="/recommend/nowSeason"><a className="sectionName" passhref="true" >今期アニメ</a></Link>
            </div>
            <section className="section">
                {
                    nowSeasonData?.map((anime, i) => {
                        return (
                            <div key={i} className="sectionItem">
                                <TagWrapper anime={anime} allgenre={allGenre} />
                                <AnimeSectionItem anime={anime} />
                            </div>
                        )
                    })
                }
            </section>{/* <div className="mainVisual">
                        <h2 className="mainVisualTitle">今 期 の オススメ ア ニ メ</h2>
                        <Swiper
                            pagination={{
                                clickable: true,
                            }} //　何枚目のスライドかを示すアイコン、スライドの下の方にある
                            navigation={true} //スライドを前後させるためのボタン、スライドの左右にある
                            slidesPerView={3} // 表示するスライドの枚数
                            centeredSlides={true} // スライドを中央揃えを有効化
                            effect={"coverflow"}
                            coverflowEffect={{
                                rotate: 0, // スライドの回転角度
                                stretch: 50, // スライドの間隔（px単位）
                                depth: 200, // 奥行きの設定（translateをZ方向にpx単位で移動）
                                modifier: 1,
                                slideShadows: true, // 先頭スライドの影を有効化
                            }}
                            modules={[EffectCoverflow, Pagination, Navigation]}
                            loop={true}
                        >
                            {images.map((src, index) => {
                                return (
                                    <SwiperSlide key={`${index}`}>
                                        <img
                                            src={src}
                                            layout="responsive"
                                            alt="test_image"
                                        />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div> */}
        </>
    );
}

export async function getStaticProps() {
    // アニメデータ取得
    const nowSeasonData = await getSeasonData(NOWSEASON, NOWYEAR, { offset: 0 })
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return {
        props: { nowSeasonData, allGenre }, revalidate: 1,
    };
};
