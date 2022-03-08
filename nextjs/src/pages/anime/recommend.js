import styles from '../../styles/anime_recommend.module.css'
import React, { useState, useEffect, createContext } from 'reactn';
import axios from 'axios'
import { Link as Scroll } from 'react-scroll';

import Thumbnail from '../../components/item/Thumbnail';

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from 'swiper'


const NOWYEAR = new Date().getFullYear()
const getSeason = () => {
    const nowMonth = new Date().getMonth()
    if (1 <= nowMonth <= 3) {
        return "WINTER"
    }
    else if (4 <= nowMonth <= 6) {
        return "SPRING"
    }
    else if (7 <= nowMonth <= 9) {
        return "SUMMER"
    }
    else {
        return "AUTUMN"
    }
}
const NOWSEASON = getSeason()

export default function Recommend({ watchersData, seasonData, genresData }) {
    console.log(watchersData);
    console.log(seasonData);
    // animeData 取得
    const [watchersStateData, setWatchersStateData] = useState(watchersData)
    const [watchersCount_gte, setwatchersCount_gte] = useState(6000)
    const [watchersCount_lte, setwatchersCount_lte] = useState(7000)
    const [seasonStateData, setSeasonStateData] = useState(seasonData)
    const [seasonYear, setSeasonYear] = useState(NOWYEAR)
    const [seasonName, setSeasonName] = useState(NOWSEASON)
    const [genresStateData, setGenresStateData] = useState(genresData)
    const [genre1, setGenre1] = useState()
    const [genre2, setGenre2] = useState()
    const [genre3, setGenre3] = useState()

    const getWatchersData = async () => {
        /* const data = await (await axios.get(
            `${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?format=json&limit=4&watchersCount_lte=${watchersCount_lte}&watchersCount_gte=${watchersCount_gte}`)
        ).data.results */
        try {
            const data = await (await axios.get(
                `${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/8643`)
            ).data
            console.log(data.reviewanime_set);
            setWatchersStateData([data])
        } catch(error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log(watchersStateData);
    }, [watchersStateData])
    const getSeasonData = async () => {
        console.log(seasonName);
        console.log(seasonYear);
        const data = await (await axios.get(
            encodeURI(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?format=json&limit=4&seasonName=${seasonName}&seasonYear=${seasonYear}`))
        ).data.results
        setSeasonStateData(Object.values(data))
    }
    const getGenresData = async () => {
        URL = `${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?format=json&limit=4&genres=`
        if (genre1) {
            URL += genre1
            if (genre2) {
                URL += ","
                URL += genre2
            }
            if (genre3) {
                URL += ","
                URL += genre3
            }
        }
        else if (genre2) {
            URL += genre2
            if (genre3) {
                URL += ","
                URL += genre3
            }
        }
        else if (genre3) {
            URL += genre3
        }
        console.log(URL);
        const data = await (await axios.get(
            encodeURI(URL)
        )).data.results
        setGenresStateData(Object.values(data))
    }

    SwiperCore.use([Pagination, Navigation])
    const images = [
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/17/2/25172_1_1.png?1638433806000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/20/2/25202_1_1.png?1639560672000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/24/8/25248_1_1.png?1639621807000",
        "https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/18/2/25182_1_1.png?1638419407000",
    ]

    return (
        <>
            <div className={`${styles.recommendContents}`}>
                <div className={`${styles.reccomendContentWeapper}`}>
                    {/*  */}
                    {/* <div className={`${styles.mainVisual}`}>
                        <div className={`${styles.mainVisualImage}`}>
                            <img src="https://cs1.anime.dmkt-sp.jp/anime_kv/img/25/17/2/25172_1_1.png?1638433806000" />
                            <div className={`${styles.animeSiteLogo}`}>
                                <img  src="https://pbs.twimg.com/profile_images/994111766387769344/4k1GwTh5_400x400.jpg" width="50px" height="auto" />
                                <span>独占配信！</span>
                            </div>
                        </div>
                    </div> */}

                    <div className="mainVisual">
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
                    </div>

                    <section>
                        <h2 className="sectionTitle">視 聴 者 数</h2>
                        <div className={`${styles.supportWrapper}`}>
                            <div className={`${styles.recommendContentTitleWrapper}`} >
                                <div className={`${styles.selectFlex}`}>
                                    <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                                        <select name="watchersCount_gte" onChange={(e) => setwatchersCount_gte(e.target.value)}>
                                            <option value="" hidden>6000</option>
                                            <option value="0">0</option>
                                            <option value="1000">1000</option>
                                            <option value="2000">2000</option>
                                            <option value="3000">3000</option>
                                            <option value="4000">4000</option>
                                            <option value="5000">5000</option>
                                            <option value="6000">6000</option>
                                            <option value="7000">7000</option>
                                            <option value="8000">8000</option>
                                            <option value="9000">9000</option>
                                        </select>
                                    </div>
                                    <span>人以上</span>
                                </div>
                                <div className={`${styles.selectFlex}`}>
                                    <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                                        <select name="watchersCount_lte" onChange={(e) => setwatchersCount_lte(e.target.value)}>
                                            <option value="" hidden>7000</option>
                                            <option value="1000">1000</option>
                                            <option value="2000">2000</option>
                                            <option value="3000">3000</option>
                                            <option value="4000">4000</option>
                                            <option value="5000">5000</option>
                                            <option value="6000">6000</option>
                                            <option value="7000">7000</option>
                                            <option value="8000">8000</option>
                                            <option value="9000">9000</option>
                                            <option value="10000">10000</option>
                                        </select>
                                    </div>
                                    <span>人以下</span>
                                </div>
                            </div>
                            <div className={`${styles.reload_icon}`} >
                                <button onClick={getWatchersData}><img src="/image/systemIcon/reload.png" width="20px" /></button>
                            </div>
                        </div>
                        <div className={`${styles.viewAnimeWrapper}`} >
                            {
                                watchersStateData.map((anime, i) => {
                                    return (
                                        <div key={i} className={`${styles.thumbnail}`} >
                                            <Thumbnail title={anime.title} casts={anime.casts} reviewanime_set={anime.reviewanime_set} src={anime.image} watchersCount={anime.watchersCount} width={300} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>
                    <section>
                        <h2 className="sectionTitle">放 送 年 度</h2>
                        <div className={`${styles.supportWrapper}`}>
                            <div className={`${styles.recommendContentTitleWrapper}`}>
                                <div className={`${styles.selectFlex}`}>
                                    <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                                        <select name="seasonYear" onChange={(e) => setSeasonYear(e.target.value)}>
                                            <option value={`${NOWYEAR}`} hidden>{NOWYEAR}</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                            <option value="2020">2020</option>
                                            <option value="2019">2019</option>
                                            <option value="2018">2018</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>
                                            <option value="2015">2015</option>
                                            <option value="2014">2014</option>
                                            <option value="2013">2013</option>
                                            <option value="2012">2012</option>
                                            <option value="2011">2011</option>
                                            <option value="2010">2010</option>
                                            <option value="2000~2009">2009 ～ 2000</option>
                                            <option value="1999以前">1999以前</option>
                                        </select>
                                    </div>
                                    <span>年</span>
                                </div>
                                <div className={`${styles.selectFlex}`}>
                                    <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                                        <select name="seasonName" onChange={(e) => setSeasonName(e.target.value)}>
                                            <option value={`${NOWSEASON}`} hidden>{NOWSEASON}</option>
                                            <option value="WINTER">WINTER</option>
                                            <option value="SPRING">SPRING</option>
                                            <option value="SUMMER">SUMMER</option>
                                            <option value="AUTUMN">AUTUMN</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.reload_icon}`} >
                                <button onClick={getSeasonData}><img src="/image/systemIcon/reload.png" width="20px" /></button>
                            </div>
                        </div>
                        <div className={`${styles.viewAnimeWrapper}`} >
                            {
                                seasonStateData.map((anime, i) => {
                                    return (
                                        <div key={i} className={`${styles.thumbnail}`} >
                                            <Thumbnail title={anime.title} casts={anime.casts} reviewanime_set={anime.reviewanime_set} src={anime.image} watchersCount={anime.watchersCount} width={300} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>
                    <section>
                        <h2 className="sectionTitle">ジャンル</h2>
                        <div className={`${styles.supportWrapper}`}>
                            <button className={`${styles.openbtn1}`}><span></span><span></span><span></span></button>
                            <div className={`${styles.recommendContentTitleWrapper}`}>
                                <div className={`${styles.selectFlex}`}>
                                    <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                                        <select name="genre1" onChange={(e) => setGenre1(e.target.value)}>
                                            <option value="感動" hidden>感動</option>
                                            <option value=""></option>
                                            <option value="感動">感動</option>
                                            <option value="青春">青春</option>
                                            <option value="恋愛・ラブコメ">恋愛・ラブコメ</option>
                                            <option value="ハーレム">ハーレム</option>
                                            <option value="逆ハーレム">逆ハーレム</option>
                                            <option value="スポーツ">スポーツ</option>
                                            <option value="バトル">バトル</option>
                                            <option value="ダークファンタジー">ダークファンタジー</option>
                                            <option value="絵がきれい">絵がきれい</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={`${styles.selectFlex}`}>
                                    <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                                        <select name="genre2" onChange={(e) => setGenre2(e.target.value)}>
                                            <option value="" hidden>-</option>
                                            <option value=""></option>
                                            <option value="感動">感動</option>
                                            <option value="青春">青春</option>
                                            <option value="恋愛・ラブコメ">恋愛・ラブコメ</option>
                                            <option value="ハーレム">ハーレム</option>
                                            <option value="逆ハーレム">逆ハーレム</option>
                                            <option value="スポーツ">スポーツ</option>
                                            <option value="バトル">バトル</option>
                                            <option value="ダークファンタジー">ダークファンタジー</option>
                                            <option value="絵がきれい">絵がきれい</option>
                                        </select>
                                    </div>
                                    <div className={`${styles.selectFlex}`}>
                                        <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                                            <select name="genre3" onChange={(e) => setGenre3(e.target.value)}>
                                                <option value="" hidden>-</option>
                                                <option value=""></option>
                                                <option value="感動">感動</option>
                                                <option value="青春">青春</option>
                                                <option value="恋愛・ラブコメ">恋愛・ラブコメ</option>
                                                <option value="ハーレム">ハーレム</option>
                                                <option value="逆ハーレム">逆ハーレム</option>
                                                <option value="スポーツ">スポーツ</option>
                                                <option value="バトル">バトル</option>
                                                <option value="ダークファンタジー">ダークファンタジー</option>
                                                <option value="絵がきれい">絵がきれい</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.reload_icon}`} >
                                <button onClick={getGenresData}><img src="/image/systemIcon/reload.png" width="20px" /></button>
                            </div>
                        </div>
                        <div className={`${styles.viewAnimeWrapper}`} >
                            {
                                genresStateData.map((anime, i) => {
                                    return (
                                        <div key={i} className={`${styles.thumbnail}`} >
                                            <Thumbnail title={anime.title} casts={anime.casts} reviewanime_set={anime.reviewanime_set} src={anime.image} watchersCount={anime.watchersCount} width={300} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>
                </div>
            </div >
        </>
    );
}

export async function getStaticProps() {

    // アニメデータ取得
    const watchersData = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?format=json&limit=4&watchersCount_lte=7000&watchersCount_gte=6000`)).data.results;
    const seasonData = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?format=json&limit=4&seasonName=${NOWSEASON}&seasonYear=${NOWYEAR}`)).data.results;
    const genresData = await (await axios.get(encodeURI(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?format=json&limit=4&genres=感動`))).data.results;

    return {
        props: { watchersData, seasonData, genresData },
    }
}
