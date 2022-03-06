import React from 'react'
import styles from '../../styles/components-css/ReviewStar.module.css'

export default function ReviewStar(datarate) {
    let data = Object.values(datarate).map((review, i) => {
        if (review === null) {
            return
        }
    })
    if (data < 0.1) {
        data = 0
        console.log(data);
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
        <>
            {!data ?
                <span className={`${styles.noReviewStarWrapper}`}>
                    <span>☆☆☆☆☆</span><span className={`${styles.noReviewText}`}> 😭NoReview </span>
                </span> :
                <span className={`${styles.reviewStarWrapper}`}>
                    <span className={`${styles.star5_rating}`} datarate={data}></span><span>({Object.values(datarate)})</span>
                </span>
            }

        </>

    )
}
