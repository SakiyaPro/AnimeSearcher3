import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ReviewStar from './ReviewStar'
import styles from '../../styles/components-css/ThumbnailSimple.module.css'

export default function ThumbnailSimple({ width, anime }) {
    const defaultWidth = 370
    const id = anime.id
    const title = anime.title
    const media = anime.media
    const reviewanime_set = anime.reviewanime_set
    const review_amount = reviewanime_set.length
    const src = anime.image

    return (
        <>
            <div className={`${styles.viewAnimeBackground}`} style={{
                width: width ? `${width + 12}px` : `${defaultWidth + 12}px`, height: "auto",
            }}>
                <div className={`${styles.iconWrapper}`}>
                    <div className={`${styles.commentIcon}`}>
                        <img src="/image/systemIcon/吹き出しアイコン.png" width="18px" />
                        <span>{review_amount}</span>
                    </div>
                    <p className={`${styles.reviewIcon}`}><ReviewStar datarate={reviewanime_set} /></p>
                </div>
                <Link href={`/anime/detail/${id}`} as={`/anime/detail/${id}`}>
                    <a className={`${styles.viewAnime}`}>
                        <div className={`${styles.viewAnimeImage}`}>
                            <img className={`${styles.thumbnail}`} src={src} width={width ? width : defaultWidth} alt={title} />
                        </div>
                        <div className={`${styles.viewAnimeGround}`}>
                            <h3 >{title.length >= 36 ? `${title.slice(0, 30)} ...` : title}{media === 'MOVIE' ? ' （映画）' : (media === 'OVA' ? ' （OVA）' : '')}</h3>
                        </div>
                    </a>
                </Link>
            </div>
        </>
    )
}
