import React, { useState, useEffect } from 'react'
import styles from '../../styles/components-css/ReviewStar.module.css'
import ReviewPostCenter from './ReviewPostCenter'
import LoginRequest from '../view/LoginRequest';
import { login_request } from '../../utils/functions';

export default function ReviewStar({ reviewanime_set, animeTitle }) {
    const [display, setDisplay] = useState(false);
    const [LoginState, setLoginState] = useState()
    const [star, setStar] = useState()

    useEffect(() => {
        setLoginState(login_request())
    }, [])

    useEffect(() => {
        let data = reviewanime_set.map((review) => review["star"]);
        data = data.reduce((sum, element) => sum + element, 0) / reviewanime_set.length;
        if (data < 0.1) {
            setStar(0)
        } else if (0.1 <= data && data <= 0.9) {
            setStar(0.5)
        } else if (0.9 < data && data <= 1.4) {
            setStar(1)
        } else if (1.4 < data && data <= 1.9) {
            setStar(1.5)
        } else if (1.9 < data && data <= 2.4) {
            setStar(2)
        } else if (2.4 < data && data <= 2.9) {
            setStar(2.5)
        } else if (2.9 < data && data <= 3.4) {
            setStar(3)
        } else if (3.4 < data && data <= 3.9) {
            setStar(3.5)
        } else if (3.9 < data && data <= 4.4) {
            setStar(4)
        } else if (4.4 < data && data <= 4.9) {
            setStar(4.5)
        } else if (4.9 < data && data <= 5) {
            setStar(5)
        }
    }, [])

    return (
        <div>
            <button onClick={() => setDisplay(true)}>
                {!star ?
                    <span className={`${styles.noReviewStarWrapper}`}>
                        <span>☆☆☆☆☆</span>
                    </span> :
                    <span className={`${styles.reviewStarWrapper}`}>
                        <span className={`${styles.star5_rating}`} datarate={star}></span>
                    </span>
                }
            </button>
            {
                display && !LoginState &&
                <>
                    <div onClick={() => setDisplay(false)} className="displayBackground" >
                    </div>
                    <LoginRequest setDisplay={setDisplay} />
                </>
            }
            {
                display && LoginState &&
                <>
                    <div onClick={() => setDisplay(false)} className="displayBackground" >
                    </div>
                    <div className="reviewPostBackground" >
                        <div className="reviewPostDisableButton">
                            <button onClick={() => setDisplay(false)} className="button-decoration1">
                                <img src="/image/systemIcon/system/disable_icon.png" width="13px" height="13px" alt="" />
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
