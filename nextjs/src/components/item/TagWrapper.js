import { useState, useEffect } from 'react'
import styles from '../../styles/components-css/TagWrapper.module.css'
import { conversionSeasonName, login_request, update_genre, remove_genre } from '../../utils/functions'
import LoginRequest from '../view/LoginRequest'

export default function TagWrapper({ anime, allgenre }) {
    const [display, setDisplay] = useState(false)

    let addTag = [...allgenre]
    anime.genres.map(data => {
        if (allgenre.includes(data.genre)) {
            addTag.splice(addTag.indexOf(data.genre), 1)
        }
    })

    return (
        <>
            <div className={`${styles.tagWrapper}`}>
                <button onClick={() => { setDisplay(true) }} className={`${styles.addButton}`}>
                    <img src="/image/systemIcon/system/plus_icon(blue) .png" width="17px" />
                </button>
                <p className={`${styles.tag}`}>{anime.seasonYear}年 {conversionSeasonName(anime.seasonName)}アニメ</p>
                {anime.genres.map((data, i) => {
                    return (
                        <p key={i} className={`${styles.tag}`}>{data.genre}</p>
                    )
                })}
                {login_request() === true ?
                    display &&
                    <>
                        <div onClick={() => setDisplay(!display)} className="displayBackground">
                        </div>
                        <div className={`${styles.activeAddButton}`}>
                            <div className={`${styles.contentTop}`}>
                                <button onClick={() => setDisplay(!display)} className="button-decoration1">
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
                    </>
                    :
                    display &&
                    <>
                        <div onClick={() => setDisplay(!display)} className="displayBackground" >
                        </div>
                        <LoginRequest setDisplay={setDisplay} />
                    </>
                }
            </div>
        </>
    )
}
