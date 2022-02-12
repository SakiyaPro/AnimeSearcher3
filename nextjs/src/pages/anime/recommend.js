import styles from '../../styles/anime_recommend.module.css'
import React, { useState } from 'reactn';
import axios from 'axios'
import { Link as Scroll } from 'react-scroll';

export default function Recommend(watchersData) {
    console.log(watchersData);
    // animeData 取得
    const [watchersStateData, setWatchersStateData] = useState(Object.values(watchersData)[0])
    const [watchersCount_gte, setwatchersCount_gte] = useState(6000)
    const [watchersCount_lte, setwatchersCount_lte] = useState(7000)

    const getWatchersData = async () => {
        const data = await (await axios.get(
            `http://host.docker.internal:8000/api/animedata/?format=json&limit=100&watchersCount_lte=${watchersCount_lte}&watchersCount_gte=${watchersCount_gte}`)
        ).data.results
        setWatchersStateData(Object.values(data))
        console.log(watchersStateData);
    }

    return (
        <div className={`${styles.recommendContents}`}>
            <div className={`${styles.reccomendContentWeapper}`}>
                <div id="watchers" className={`${styles.recommendContent}`}>
                    <div className={`${styles.recommendContentTitleWrapper}`} style={{ "border-left": "20px solid #DB6B97" }}>
                        <h2 className={`${styles.recommendContentTitle}`} style={{ color: "#DA7F8F" }}>ジャンル</h2>
                        <div className={`${styles.selectFlex}`}>
                            <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                                <select name="watchersCount_gte" onChange={(e) => setwatchersCount_gte(e.target.value)}>
                                    <option value="感動" hidden>感動</option>
                                    <option value="感動">感動</option>
                                    <option value="日常・ほのぼの">日常・ほのぼの</option>
                                    <option value="青春">青春</option>
                                    <option value="恋愛">恋愛</option>
                                    <option value="ラブコメディ">ラブコメディ</option>
                                    <option value="ハーレム">ハーレム</option>
                                    <option value="逆ハーレム">逆ハーレム</option>
                                    <option value="スポーツ">スポーツ</option>
                                    <option value="バトル">バトル</option>
                                    <option value="ギャグ">ギャグ</option>
                                    <option value="ファンタジー">ファンタジー</option>
                                    <option value="ダークファンタジー">ダークファンタジー</option>
                                    <option value="SF">SF</option>
                                    <option value="ホラー">ホラー</option>
                                    <option value="ミステリー">ミステリー</option>
                                    <option value="絵がきれい">絵がきれい</option>
                                    <option value="音楽もの">音楽もの</option>
                                    <option value="腐女子向け">腐女子向け</option>
                                </select>
                            </div>
                        </div>
                        <div className={`${styles.selectFlex}`}>
                            <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                                <select name="watchersCount_lte" onChange={(e) => setwatchersCount_lte(e.target.value)}>
                                    <option value="" hidden>恋愛</option>
                                    <option value="感動">感動</option>
                                    <option value="日常・ほのぼの">日常・ほのぼの</option>
                                    <option value="青春">青春</option>
                                    <option value="恋愛">恋愛</option>
                                    <option value="ラブコメディ">ラブコメディ</option>
                                    <option value="ハーレム">ハーレム</option>
                                    <option value="逆ハーレム">逆ハーレム</option>
                                    <option value="スポーツ">スポーツ</option>
                                    <option value="バトル">バトル</option>
                                    <option value="ギャグ">ギャグ</option>
                                    <option value="ファンタジー">ファンタジー</option>
                                    <option value="ダークファンタジー">ダークファンタジー</option>
                                    <option value="SF">SF</option>
                                    <option value="ホラー">ホラー</option>
                                    <option value="ミステリー">ミステリー</option>
                                    <option value="絵がきれい">絵がきれい</option>
                                    <option value="音楽もの">音楽もの</option>
                                    <option value="腐女子向け">腐女子向け</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.recommendContentTitleWrapper}`} style={{ "border-left": "20px solid #DD4A48" }}>
                        <h2 className={`${styles.recommendContentTitle}`} style={{ color: "#FF6D6D" }}>視聴者数</h2>
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
                    <div className={`${styles.recommendContentTitleWrapper}`} style={{ "border-left": "20px solid #FFDF91" }}>
                        <h2 className={`${styles.recommendContentTitle}`} style={{ color: "#FFDF91" }}>放送年度</h2>
                        <div className={`${styles.selectFlex}`}>
                            <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                                <select name="watchersCount_lte" onChange={(e) => setwatchersCount_lte(e.target.value)}>
                                    <option value="2019" hidden>2019</option>
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
                        </div>
                        <span>　～　</span>
                        <div className={`${styles.selectFlex}`}>
                            <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                                <select name="watchersCount_lte" onChange={(e) => setwatchersCount_lte(e.target.value)}>
                                    <option value="2021" hidden>2021</option>
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
                        </div>
                    </div>
                    <div className={`${styles.reload_icon}`} >
                        <button onClick={getWatchersData}><img src="/image/systemIcon/reload.png" width="27px" /></button>
                    </div>
                </div>
                <div className={`${styles.viewAnimeWrapper}`} >
                    {
                        watchersStateData.map((anime, i) => {
                            return (
                                <div key={i} className={`${styles.viewAnime}`} >
                                    <div className={`${styles.viewAnimeImage}`}>
                                        <img src={anime.image} width={300} />
                                    </div>
                                    <div className={`${styles.viewAnimeGround}`}>
                                        <h3>{anime.title}</h3>
                                        <div className={`${styles.goodBad}`}>
                                            <a href="#">
                                                <img src="/image/systemIcon/good.png" width="18px" />{anime.goodCount}
                                            </a>
                                            <a href="#">
                                                <img src="/image/systemIcon/bad.png" width="18px" />{anime.badCount}
                                            </a>
                                        </div>
                                        <div>
                                            <img src="/image/systemIcon/genre/感動タグ.png" width="60px" style={{ transform: "rotate(-45deg)" }} />
                                            <img src="/image/systemIcon/genre/恋愛タグ.png" width="60px" style={{ transform: "rotate(-45deg)" }} />
                                            <img src="/image/systemIcon/genre/日常タグ.png" width="60px" style={{ transform: "rotate(-45deg)" }} />
                                            <img src="/image/systemIcon/genre/バトルタグ.png" width="60px" style={{ transform: "rotate(-45deg)" }} />
                                        </div>
                                        <p>{anime.watchersCount} 人が視聴しました！</p>
                                    </div>
                                    <div className={`${styles.rightSideAnimeView}`}>
                                        <div className={`${styles.viewAnimeImage}`}>
                                            <img src={anime.image} width={500} />
                                        </div>
                                        <div className={`${styles.viewAnimeGround}`}>
                                            <h3>{anime.title}</h3>
                                            <div>
                                                <img src="/image/systemIcon/genre/感動タグ.png" width="70px" style={{ transform: "rotate(-45deg)" }} />
                                                <img src="/image/systemIcon/genre/恋愛タグ.png" width="70px" style={{ transform: "rotate(-45deg)" }} />
                                                <img src="/image/systemIcon/genre/日常タグ.png" width="70px" style={{ transform: "rotate(-45deg)" }} />
                                                <img src="/image/systemIcon/genre/バトルタグ.png" width="70px" style={{ transform: "rotate(-45deg)" }} />
                                            </div>
                                            <p>{anime.watchersCount} 人が視聴しました！</p>
                                            <div>
                                                {anime.casts.map((cast, i) => {
                                                    return (
                                                        <p key={i}>
                                                            {cast.character.map((character, i) => {
                                                                { character.name }
                                                            })} {cast.name}
                                                        </p>
                                                    )
                                                })}
                                            </div>
                                            <div className={`${styles.goodBad}`}>
                                                <a href="#">
                                                    <img src="/image/systemIcon/good.png" width="30px" />{anime.goodCount}
                                                </a>
                                                <a href="#">
                                                    <img src="/image/systemIcon/bad.png" width="30px" />{anime.badCount}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const SERVERURL = "http://host.docker.internal:8000/";
    const watchersData = await (await axios.get(`${SERVERURL}api/animedata/?format=json&limit=100&watchersCount_lte=7000&watchersCount_gte=6000`)).data.results;

    return {
        props: { watchersData },
    }
}
