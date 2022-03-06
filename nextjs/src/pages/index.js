import React, { } from "react";
import Head from "next/head";
import Link from "next/link";
import { getAllAnimeData, getWatchersCountData } from "../lib/anime_data";
import styles from "../styles/Home.module.css";
import { Logo } from "../components/item/Logo";
import { useState, useEffect, useGlobal, useRef, useMemo } from 'reactn';
import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from 'swiper'

export default function Home() {
    const [profile, setProfile] = useState()

    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem("profile")))
    }, [])

    const images = [
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/17/2/25172_1_1.png?1638433806000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/20/2/25202_1_1.png?1639560672000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/24/8/25248_1_1.png?1639621807000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/18/2/25182_1_1.png?1638419407000",
    ]

    return (
        <>
            <Head>
                <title> AnimeSearcher </title>
                <meta name="description" content="おすすめアニメを検索！" />
                <link rel="icon" href="/image/favicon/favicon.png" />
                <link
                    href="https://fonts.googleapis.com/earlyaccess/nicomoji.css"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=M+PLUS+1p"
                    rel="stylesheet"
                />
            </Head>
            <div className={`${styles.indexBackground}`}>
                <div className={`${styles.siteLogoWrapper}`}>
                    <Logo width="200px" />
                </div>
                <div className={`${styles.contentWrapper}`}>
                    <div className={`${styles.content}`}>
                        <div className={`${styles.contentTitle}`}>
                            <Link href="/anime/recommend">
                                <a>
                                    <img src="/image/systemIcon/recommend.png" width="50px" />
                                    <span>アニメを探す</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.content}`}>
                        <div className={`${styles.contentTitle}`}>
                            <Link href="/">
                                <a>
                                    <img src="/image/systemIcon/review_icon.png" width="50px" />
                                    <span>みんなのレビュー</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.content}`}>
                        <div className={`${styles.contentTitle}`}>
                            <Link href="/account/private">
                                <a>
                                    <img src="/image/systemIcon/login_icon.png" width="50px" />
                                    <span>ログイン</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <h2 className="sectionTitle">今 期 ア ニ メ は こ ち ら ！</h2>
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
                                <button>
                                    <img
                                        src={src}
                                        layout="responsive"
                                        alt="test_image"
                                    />
                                </button>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </section>

            <section className={`${styles.reviewAnimeWrapper}`}>
                <h2 className="sectionTitle">最 近 の レ ビ ュ ー は こ ち ら ！</h2>
                <div className={`${styles.reviewAnime}`}>
                    <div className={`${styles.user_icon}`}>
                        <button>
                            <img src="http://livedoor.blogimg.jp/saika18000/imgs/9/3/93b23319-s.jpg" />
                            <p>USER_1 さん</p>
                        </button>
                    </div>
                    <div className={`${styles.balloon1Left} ${styles.review}`}>
                        <div className={`${styles.anime}`}>
                            <img src="https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/17/2/25172_1_1.png?1638433806000" width="300px" />
                        </div>
                        <div className={`${styles.reviewComment}`}>
                            <p className={`${styles.animeTitle}`}>アニメタイトル</p>
                            <p>USER_1 さんの評価　<span style={{ color: "#ffcf32" }}>★★★☆☆(3.1)</span></p>
                            <p>
                                タイトルの響きに惹かれて前情報無く視聴を始めました。<br />
                                ゲーム世界版の日常系アニメという感じだと思うが、1話時点では面白いとは言えない。まあキャラが全然出揃って無いからそこは今後に期待します。<br />
                                キャラ自体はそこそこ良いし、OPもTRUEさんのアップテンポな曲で個人的に好きでした。が、リットのキャラデザがなんか観ててキツいです(目の辺りがなんか怖い)。多分視聴を続ければいつか慣れるとは思うけど現時点ではキャラデザ(作画)の評価は低めにしときます。
                            </p>
                            <p>◯日前</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.reviewAnime}`}>
                    <div className={`${styles.user_icon}`}>
                        <button>
                            <img src="https://i.pinimg.com/550x/b2/58/c0/b258c0d9a7ecb4be6209a0206c978e9f.jpg" />
                            <p>USER_2 さん</p>
                        </button>
                    </div>
                    <div className={`${styles.balloon1Left} ${styles.review}`}>
                        <div className={`${styles.anime}`}>
                            <img src="https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/18/2/25182_1_1.png?1638419407000" width="300px" />
                        </div>
                        <div className={`${styles.reviewComment}`}>
                            <p className={`${styles.animeTitle}`}>アニメタイトル</p>
                            <p>USER_2 さんの評価　<span style={{ color: "#ffcf32" }}>★★★☆☆(3.0)</span></p>
                            <p>
                                ストーリーはつまらない<br />
                                現実に即したハーレム物<br />
                                殴る男はモテる、頭の弱い女を囲う<br />
                                なんの魅力が主人公にあるのかさっぱり分からない<br />
                                復習系なのかと思ったけど突き落とした奴を殺したりもしないし<br />
                                そのうちイケメン勇者が寝取られで病んでーとかやりだしそうだし<br />
                                微妙だな
                            </p>
                            <p>◯日前</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="sectionTitle">各 社 配 信 サ イ ト 様 の 紹 介</h2>
                <div className={`${styles.recommendStreamingSiteWrapper}`}>
                    <div className={`${styles.streamingSite}`}>
                        <button className={`${styles.streamingIcon}`}>
                            <img src="/image/systemIcon/streaming_icon/dアニメストア_icon.png" width="170px" />
                        </button>
                        <div className={`${styles.streamingExplanation}`}>
                            <h3 className={`${styles.siteName}`}>dアニメストア</h3>
                            <p>月額 440 円</p>
                            <p>配信アニメコンテンツ： 4000作品 ～</p>
                            <p>豊富なアニメコンテンツが揃っているので、<br />メジャーからマイナーなコンテンツにも対応！</p>
                            <p>とにかくアニメを見まくりたい人や、安い料金プランなので学生にオススメ！</p>
                        </div>
                    </div>
                    <div className={`${styles.streamingSite}`}>
                        <button className={`${styles.streamingIcon}`}>
                            <img src="/image/systemIcon/streaming_icon/Netflix_icon.png" width="170px" />
                        </button>
                        <div className={`${styles.streamingExplanation}`}>
                            <h3 className={`${styles.siteName}`}>NETFLIX</h3>
                            <p>月額 1039円</p>
                            <p>配信アニメコンテンツ： 400作品 ～</p>
                            <p>アニメコンテンツは少ないが、NETFLIX限定配信コンテンツが数多く、<br />メジャーアニメはきちんとカバーしてくれているのが嬉しい！</p>
                            <p>「ドラマもアニメも楽しみたい！」という方にオススメ！</p>
                        </div>
                    </div>
                    <div className={`${styles.streamingSite}`}>
                        <button className={`${styles.streamingIcon}`}>
                            <img src="/image/systemIcon/streaming_icon/U-NEXT_icon.png" width="170px" />
                        </button>
                        <div className={`${styles.streamingExplanation}`}>
                            <h3 className={`${styles.siteName}`}>U-NEXT</h3>
                            <p>月額 2180円</p>
                            <p>配信アニメコンテンツ： 4000作品 ～</p>
                            <p>配信サイトで比較すると2180円と割高だが、毎月1200ポイント貰えるため<br />有料コンテンツ（アニメ・ドラマ・漫画）を存分に楽しめる！</p>
                            <p>ドラマやアニメだけでなく、アダルトコンテンツや限定コンテンツも豊富なため<br />コアなファン層が多い！</p>
                            <p>控えめに言って最高なので、価格が気にならない人は利用すべし！</p>
                        </div>
                    </div>
                    <div className={`${styles.streamingSite}`}>
                        <button className={`${styles.streamingIcon}`}>
                            <img src="/image/systemIcon/streaming_icon/PrimeVideo_icon.png" width="170px" />
                        </button>
                        <div className={`${styles.streamingExplanation}`}>
                            <h3 className={`${styles.siteName}`}>Amazon PrimeVideo</h3>
                            <p>月額 500円</p>
                            <p>配信アニメコンテンツ： 800作品 ～</p>
                            <p>アニメやドラマのコンテンツはそこまで多くないものの、<br />この金額でアマゾンプライムの他の恩恵を受けれるのが最高！！</p>
                            <p>とは言え、メジャーなアニメコンテンツはそれなりに揃っているので、<br />まずはプライムビデオから始めてみても良いかも！？</p>
                            <p>アニメ初心者の方や既にプライム会員の方にオススメ！</p>
                        </div>
                    </div>
                    <div className={`${styles.streamingSite}`}>
                        <button className={`${styles.streamingIcon}`}>
                            <img src="/image/systemIcon/streaming_icon/FOD_icon.png" width="170px" />
                        </button>
                        <div className={`${styles.streamingExplanation}`}>
                            <h3 className={`${styles.siteName}`}>FODプレミアム</h3>
                            <p>月額 976 円</p>
                            <p>配信アニメコンテンツ： 1000作品 ～</p>
                            <p>他社では配信されていない独占コンテンツが多い！</p>
                            <p>毎月400ポイント貰えるため、有料コンテンツが楽しめる</p>
                            <p>雑誌をよく読む方や、アニメマニアにオススメ！</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
