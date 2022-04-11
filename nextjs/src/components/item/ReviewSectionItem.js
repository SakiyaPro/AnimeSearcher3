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
        <div>
            <div className="userBox">
                <div className="user_icon">
                    <Link href={redirectURL}
                        as={redirectURL}
                        passhref="true">
                        <a>
                            <img src={review.user.profile.user_icon} alt="" />
                        </a>
                    </Link>
                </div>
                <div className="user_name">
                    <Link href={redirectURL} as={redirectURL} passhref="true">
                        <a>
                            <span>{review.user.username}</span>
                        </a>
                    </Link>
                    <div className={`${styles.reviewModified}`}>{conversionStrDate(review.modified)}</div>
                </div>
            </div>
            <article className={`centerArticle ${styles.reviewCenterArticle}`}>
                <div className="content">
                    <Link href='/detail/[animeId]' as={`/detail/${review.anime.id}`} passhref="true">
                        <a className="animeTitle">
                            <h1>{review.anime.title}</h1>
                        </a>
                    </Link>
                    <ReviewStarSimple star={review.star} />
                    {review.comment && <p>{review.comment}</p>}
                    {
                        review.anime.image &&
                        <div className="imageWrapper">
                            <img src={review.anime.image} width="200px" alt="" />
                        </div>
                    }
                </div>
            </article>
        </div>
    )
}
