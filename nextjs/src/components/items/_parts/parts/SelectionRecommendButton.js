import React, { useState } from 'react'
import Link from 'next/link'
// CSS
import styles from 'Styles/components-css/items/_parts/parts/SelectionRecommendButton.module.css'

/* anime/recommend/配下の選択ボタン */
export default function SelectionRecommendButton() {
    // 選択ボタン表示/非表示
    const [display, setDisplay] = useState(false)
    // 選択ボタンのリスト
    const selectList = {
        "nowSeason": "今期アニメ",
        "onePrevSeason": "前期アニメ",
        "popularAnime": "人気アニメ"
    }

    return (
        <div className={`${styles.wrapper}`}>
            <ul className={`${styles.recommendButton}`}>
                <li>
                    <Link href="/anime/recommend/nowSeason" passhref="true"><a>今期</a></Link>
                </li>
                <li>
                    <Link href="/anime/recommend/onePrevSeason" passhref="true"><a>前期</a></Link>
                </li>
                <li>
                    <Link href="/anime/recommend/popularAnime" passhref="true"><a>人気</a></Link>
                </li>
            </ul>
            <ul className={`${styles.recommendButton}`}>
                <li>
                    <Link href="/anime/recommend/nowSeason" passhref="true"><a>今期アニメ</a></Link>
                </li>
                <li>
                    <Link href="/anime/recommend/onePrevSeason" passhref="true"><a>前期アニメ</a></Link>
                </li>
                <li>
                    <Link href="/anime/recommend/popularAnime" passhref="true"><a>人気アニメ</a></Link>
                </li>
            </ul>
        </div>
    )
}
