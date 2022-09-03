import React from 'react'
import styles from 'Styles/components-css/items/_parts/parts/ReviewButton.module.css'

export default function ReviewButton({ commentCount }) {
    return (
        <div>
            <button className={`${styles.reviewButton}`}>
                <img src="/image/systemIcon/system/balloon_icon.png" width="18px" height="18px" alt="reviewButton" />
                <span>
                    {
                        // レビューがある場合のみカウントする
                        commentCount
                    }
                </span>
            </button>
        </div>
    )
}
