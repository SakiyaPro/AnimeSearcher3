import React, { useState } from 'react'
import styles from '../../styles/components-css/ReviewStar.module.css'
import ReviewPostCenter from './ReviewPostCenter'

export default function ReviewStar({ reviewanime_set, animeTitle }) {
    const [display, setDisplay] = useState(false);

    let data = reviewanime_set.map((review) => review["star"]);
    data = data.reduce((sum, element) => sum + element, 0) / reviewanime_set.length;
    if (data < 0.1) {
        data = 0
    } else if (0.1 <= data && data <= 0.9) {
        data = 0.5
    } else if (0.9 < data && data <= 1.4) {
        data = 1
    } else if (1.4 < data && data <= 1.9) {
        data = 1.5
    } else if (1.9 < data && data <= 2.4) {
        data = 2
    } else if (2.4 < data && data <= 2.9) {
        data = 2.5
    } else if (2.9 < data && data <= 3.4) {
        data = 3
    } else if (3.4 < data && data <= 3.9) {
        data = 3.5
    } else if (3.9 < data && data <= 4.4) {
        data = 4
    } else if (4.4 < data && data <= 4.9) {
        data = 4.5
    } else if (4.9 < data && data <= 5) {
        data = 5
    }

    return (
        <div>
            <button onClick={() => setDisplay(true)}>
                {!data ?
                    <span className={`${styles.noReviewStarWrapper}`}>
                        <span>☆☆☆☆☆</span>
                    </span> :
                    <span className={`${styles.reviewStarWrapper}`}>
                        <span className={`${styles.star5_rating}`} datarate={data}></span><span>{data}</span>
                    </span>
                }
            </button>
            {
                display &&
                <>
                    <div onClick={() => setDisplay(false)} className="displayBackground" >
                    </div>
                    <div className="reviewPostBackground" >
                        <div className="reviewPostDisableButton">
                            <button onClick={() => setDisplay(false)} className="button-decoration1">
                                <img src="/image/systemIcon/system/disable_icon.png" width="13px" height="13px" />
                            </button>
                            <div>レビュー投稿</div>
                        </div>
                        <ReviewPostCenter animeTitle={animeTitle} />
                    </div>
                </>
            }
        </div>
    )
}
