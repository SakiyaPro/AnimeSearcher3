import { useState, useEffect } from 'react'
import { useGlobal } from "reactn";
// CSS
import styles from 'Styles/components-css/items/_parts/parts/GenreUpdateTagWrapper.module.css'
// Comps
import GenreTag from 'Comps/items/_parts/parts/GenreUpdateTag'
// Utils
import { getLoginState } from 'Utils/functions/getLoginState'
import { conversionSeasonName } from 'Utils/functions/conversionSeasonName'
import { hasStaffParmission } from 'Utils/functions/hasStaffParmission'
import DisableButton from './DisableButton';

export default function GenreTagWrapper({ animeId, myGenre, allGenre, animeSeasonYear, animeSeasonName }) {
    // グローバルステート取得
    const StaffParmission = useGlobal("StaffParmission")[0];

    // ジャンル編集画面を監視
    const [display, setDisplay] = useState(false)

    // アニメに追加できるジャンルを作成
    const [addGenre, setAddGenre] = useState();
    useEffect(() => {
        console.log(myGenre);
        const result = []
        allGenre.map(genreName => {
            if (myGenre.includes(genreName) == false) {
               result.push(genreName)
            }
        })
        setAddGenre(result)
    }, [])


    return (
        <div className={`${styles.tagWrapper}`}>
            {
                // 放送年度タグ
                animeSeasonName &&
                <span className={`${styles.tag}`}>{animeSeasonYear}年 {conversionSeasonName(animeSeasonName)}アニメ</span>
            }
            {
                // ジャンルタグ
                myGenre.map((genreName, i) => {
                    return (
                        <span key={i} className={`${styles.tag}`}>{genreName}</span>
                    )
                })
            }
            {
                // スタッフ権限を持っているなら ジャンル編集機能を表示する
                StaffParmission &&
                <button onClick={() => { setDisplay(true) }} className={`${styles.addButton}`}>
                    <img src="/image/systemIcon/system/plus_icon(blue) .png" width="17px" alt="" />
                </button>
            }
            {
                display &&
                <>
                    <div onClick={() => setDisplay(!display)} className="displayBackground">
                    </div>
                    <div className={`${styles.activeAddButton}`}>
                        <div className={`${styles.contentTop}`}>
                            <DisableButton setDisplay={setDisplay} />
                            <div>ジャンルタグ編集</div>
                        </div>
                        <div className={`${styles.contentWrapper}`}>
                            <div className={`${styles.text}`}>
                                <div className={`${styles.currentTagWrapper}`}>
                                    <div className={`${styles.iconWrapper}`}>
                                        <img src="/image/systemIcon/system/label_icon.png" width="20px" alt="" />
                                        <p className={`${styles.smallBlueText}`}>ジャンル削除:</p>
                                    </div>
                                    {myGenre?.map((genreName, i) => {
                                        return (
                                            <GenreTag animeId={animeId} genreName={genreName} updateState={"remove"} />
                                        )
                                    })}
                                </div>
                                <div className={`${styles.addTagWrapper}`}>
                                    <div className={`${styles.iconWrapper}`}>
                                        <img src="/image/systemIcon/system/label_icon(black).png" width="20px" alt="" />
                                        <p className={`${styles.smallBlueText}`}>ジャンル追加:</p>
                                    </div>
                                    {addGenre.map((genreName, i) => {
                                        return (
                                            <GenreTag key={i} animeId={animeId} genreName={genreName} updateState={"add"} />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
