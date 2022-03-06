import React, { useState, useEffect } from 'react'
import ReviewStar from './ReviewStar'
import BarGraph from './BarGraph'
import styles from '../../styles/components-css/Thumbnail.module.css'

export default function Thumbnail({ title, reviewanime_set, watchersCount, casts, src, width }) {
    const [detailAnimeState, setDetailAnimeState] = useState(false)
    const [detailAnimeContentState, setDetailAnimeContentState] = useState(1)

    return (
        <>
            <div className={`${styles.viewAnimeBackground}`}>
                <button className={`${styles.viewAnime}`} onClick={() => setDetailAnimeState(!detailAnimeState)}>
                    <div className={`${styles.viewAnimeImage}`}>
                        <img className={`${styles.thumbnail}`} src={src} width={width} alt={title} />
                    </div>
                    <div className={`${styles.viewAnimeGround}`}>
                        <h3>{title}</h3>
                        <p>{watchersCount} 人が視聴</p>
                        {/* <p><ReviewStar datarate={reviewanime_set} /></p> */}

                        {/* <p>あなたの評価: - </p> */}
                    </div>
                </button>
                <BarGraph reviewanime_set={reviewanime_set} />
            </div>
            {
                detailAnimeState &&
                <div>
                    <div onClick={() => setDetailAnimeState(!detailAnimeState)} className={`${styles.detailAnimeBackground}`}>
                    </div>
                    <div className={`${styles.detailAnime}`}>
                        <div className={`${styles.detailAnimeImage}`}>
                            <img src={src} width="592px" alt={title} />
                        </div>
                        <div className={`${styles.detailContentWrapper}`}>
                            <div className={`${styles.detailContent}`} style={detailAnimeContentState === 1 ? { opacity: 1, "borderBottom": "3px solid #fff" } : { opacity: 0.4 }}>
                                <button onClick={() => setDetailAnimeContentState(1)} >
                                    詳細情報
                                </button>
                            </div>
                            <div className={`${styles.detailContent}`} style={detailAnimeContentState === 2 ? { opacity: 1, "borderBottom": "3px solid #fff" } : { opacity: 0.4 }}>
                                <button onClick={() => setDetailAnimeContentState(2)}>
                                    あなたの評価
                                </button>
                            </div>
                            <div className={`${styles.detailContent}`} style={detailAnimeContentState === 3 ? { opacity: 1, "borderBottom": "3px solid #fff" } : { opacity: 0.4 }} >
                                <button onClick={() => setDetailAnimeContentState(3)}>
                                    みんなの評価
                                </button>
                            </div>
                        </div>

                        {
                            detailAnimeContentState === 1 &&
                            <div className={`${styles.detailInfo}`}>
                                <h3>{title}</h3>
                                <ReviewStar datarate={reviewanime_set} />
                                <p>視聴者数：{watchersCount} 人が視聴</p>
                                {casts &&
                                    casts.map((cast, i) => {
                                        return (
                                            <div key={i}>
                                                {cast.character.map(((character, i) => {
                                                    return (
                                                        <p key={i}>{character.name}： {cast.name}</p>
                                                    )
                                                }))}
                                            </div>
                                        )
                                    })}
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}
