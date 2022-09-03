import React from 'react'
// CSS
import styles from 'Styles/components-css/items/_parts/thumbnail/RoundCornerThumbnail.module.css'

export default function RoundCornerThumbnail({ src, alt, width }) {
    return (
        <div className={`${styles.thumbnailWrapper}`}>
            <img src={src} alt={alt} width={width} />
        </div>
    )
}
