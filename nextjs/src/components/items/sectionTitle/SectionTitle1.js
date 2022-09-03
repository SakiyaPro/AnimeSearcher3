// React
import React from 'react'
import Link from 'next/link'
//CSS
import styles from 'Styles/components-css/items/sectionTitle/SectionTitle1.module.css'

/* 汎用セクションタイトル */
export default function SectionTitle1({ title, link }) {
    return (
        <h2 className={`${styles.sectionTitle}`}>
            {title}
            <Link href={link} passhref="true">
                <a><img width="20px" src="/image/systemIcon/system/icons8-検索-64.png" alt="検索アイコン" /></a>
            </Link>
        </h2>
    )
}
