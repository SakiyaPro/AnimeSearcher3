import React from 'react'
import styles from '../../styles/components-css/DetailAnimeDisplay.module.css'

export default function DetailAnimeDisplay({ anime }) {
    return (
        <div className={`${styles.displayWrapper}`} >
            <div>
                <h1 className={`${styles.animeTitle}`}>{anime.title}</h1>
                <div>
                    <img className={`${styles.animeImage}`} src={anime.image} alt={anime.title} />
                </div>
            </div>
        </div>
    )
}
