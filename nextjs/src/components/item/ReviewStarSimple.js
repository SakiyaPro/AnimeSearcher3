import React from 'react'
import styles from '../../styles/components-css/ReviewStar.module.css'

export default function ReviewStarSimple({ star }) {
    return (
        <div>
            <button>
                <span className={`${styles.reviewStarWrapper}`}>
                    <span className={`${styles.star5_rating}`} datarate={star}></span><span color={`${styles.starText}`}>{star}</span>
                </span>
            </button>
        </div>
    )
}
