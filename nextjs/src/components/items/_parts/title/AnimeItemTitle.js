import React from 'react'
import Link from 'next/link'
// CSS
import styles from 'Styles/components-css/items/_parts/title/AnimeItemTitle.module.css'


export default function AnimeItemTitle({animeTitle, animeId}) {
    return (
        <h2>
            <Link href='/anime/detail/[animeId]' as={`/anime/detail/${animeId}`} passhref="true">
                <a className={`${styles.animeTitle}`}>
                    {animeTitle}
                </a>
            </Link>
        </h2>
    )
}
