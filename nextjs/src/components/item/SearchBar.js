import React from 'react'
import styles from '../../styles/components-css/SearchBar.module.css'

export default function SearchBar() {
    return (
        <>
            <form method="get" action="#" className={`${styles.searchForm}`}>
                <input className={`${styles.searchBar}`} type="text" size="40" placeholder="アニメを検索" />
            </form>
        </>
    )
}
