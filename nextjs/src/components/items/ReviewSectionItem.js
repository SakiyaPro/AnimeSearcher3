import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import styles from '../../styles/components-css/ReviewSectionItem.module.css'
import ReviewStarSimple from './ReviewStarSimple';
import { conversionStrDate } from '../../utils/functions';
import Cookies from 'js-cookie';


export default function ReviewSectionItem({ review }) {
    const [redirectURL, setRedirectURL] = useState('/account/private')
    useEffect(() => {
        if (`${review.user.id}` !== Cookies.get('user_id')) {
            setRedirectURL(`/account/otherUser/${review.user.id}`)
        }
    }, [review.user.id])

    return (
            <div className={`${styles.reviewCenterArticle}`}>
                <div className={`${styles.userBox}`}>
                    <div className={`${styles.user_icon}`}>
                        <Link href={redirectURL}
                            as={redirectURL}
                            passhref="true">
                            <a>
                                <img src={review.user.profile.user_icon} alt="" />
                            </a>
                        </Link>
                    </div>
                    <div className={`${styles.userSideInfo}`}>
                        <div className={`${styles.user_name}`}>
                            <Link href={redirectURL} as={redirectURL} passhref="true">
                                <a>
                                    <span>{review.user.username}</span>
                                </a>
                            </Link>
                            <div className={`${styles.reviewModified}`}>{conversionStrDate(review.modified)}</div>
                        </div>
                        <ReviewStarSimple star={review.star} />
                    </div>
                </div>
                <div className={`${styles.reviewContent}`}>
                    <p>ああああああああああああああああああああああああああああ</p>
                </div>
            </div>
    )
}
