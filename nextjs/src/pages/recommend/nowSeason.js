
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/anime_recommend.module.css'
import { getSeasonData } from "../../lib/getAnimeData";
import { getSeasonAndYear, conversionSeasonName } from "../../utils/functions";

import ReviewStar from "../../components/item/ReviewStar";
import SearchBar from '../../components/item/SearchBar';

import axios from 'axios'
import InfiniteScroll from "react-infinite-scroller"
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from 'swiper'


const [NOWSEASON, NOWYEAR] = getSeasonAndYear(0)
const [BEFORESEASON1, BEFOREYEAR1] = getSeasonAndYear(-3)

export default function NowSeason({ nowSeasonData }) {
    // 無限スクロール
    const [pageOffset, setPageOffset] = useState(10)
    const [list, setList] = useState([]);          //表示するデータ
    const [hasMore, setHasMore] = useState(true);  //再読み込み判定

    const loadMore = async (page) => {
        const data = await (getSeasonData(NOWSEASON, NOWYEAR, {offset: page})).then(
            res => {
                console.log(res);
                if (res.length < 1) {
                    setHasMore(false);
                    return;
                }
                setList([...list, ...res])
                setPageOffset(pageOffset + 10)
            }
        )
    }

    SwiperCore.use([Pagination, Navigation])
    const images = [
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/17/2/25172_1_1.png?1638433806000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/20/2/25202_1_1.png?1639560672000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/24/8/25248_1_1.png?1639621807000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/18/2/25182_1_1.png?1638419407000",
    ]

    return (
        <div className="mainWrapper">
            <div className="centerWrapper">
                <div className="sectionTop">
                    <p className="sectionName">オススメ</p>
                    <div className="selectContents">
                        <Link href="/recommend/nowSeason">
                            <a className={"contentButton active"}>今期アニメ</a>
                        </Link>
                        <Link href="/recommend/onePrevSeason">
                            <a className={"contentButton"}>
                                {BEFOREYEAR1}年 {conversionSeasonName(BEFORESEASON1)}アニメ
                            </a>
                        </Link>
                        <Link href="/recommend/popularAnime">
                            <a className={"contentButton"}>
                                人気アニメ
                            </a>
                        </Link>
                    </div>
                </div>
                <section className="section">
                    {
                        nowSeasonData?.map((anime, i) => {
                            return (
                                <div key={i} className="sectionItem">
                                    <Link href={`/detail/${anime.id}`} as={`/detail/${anime.id}`} ><a>
                                        <div>
                                            <div className="userIcon">
                                                <img src="https://maidragon.jp/news/wordpress/wp-content/uploads/2020/08/200811_icon_present01-1.png" width="48px" height="48px" />
                                            </div>
                                            <p className="userName">放送年度で検索するbot</p>
                                        </div>
                                        <article className="centerArticle">
                                            <div className="content">
                                                <h1>{anime.title}</h1>
                                                <ReviewStar datarate={anime.reviewanime_set} />
                                                <div className="imageWrapper" >
                                                    <img src={anime.image} width={504} />
                                                </div>
                                            </div>
                                        </article>
                                    </a></Link>
                                </div>
                            )
                        })
                    }
                    <InfiniteScroll
                        loadMore={() => loadMore(pageOffset)}    //項目を読み込む際に処理するコールバック関数
                        hasMore={hasMore}         //読み込みを行うかどうかの判定
                    >
                        {
                            list?.map((anime, i) => {
                                return (
                                    <div key={i} className="sectionItem">
                                        <Link href={`/detail/${anime.id}`} as={`/detail/${anime.id}`} ><a>
                                            <div>
                                                <div className="userIcon">
                                                    <img src="https://maidragon.jp/news/wordpress/wp-content/uploads/2020/08/200811_icon_present01-1.png" width="48px" height="48px" />
                                                </div>
                                                <p className="userName">放送年度で検索するbot</p>
                                            </div>
                                            <article className="centerArticle">
                                                <div className="content">
                                                    <h1>{anime.title}</h1>
                                                    <ReviewStar datarate={anime.reviewanime_set} />
                                                    <div className="imageWrapper" >
                                                        <img src={anime.image} width={504} />
                                                    </div>
                                                </div>
                                            </article>
                                        </a></Link>
                                    </div>
                                )
                            })
                        }
                    </InfiniteScroll>
                </section>
            </div>{/* <div className="mainVisual">
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
            <div className="rightWrapper">
                <div>
                    <SearchBar />
                    <p style={{ color: '#000' }}>aaa</p>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    // アニメデータ取得
    const nowSeasonData = await getSeasonData(NOWSEASON, NOWYEAR, { offset: 0 })

    return {
        props: { nowSeasonData },
    }
}
