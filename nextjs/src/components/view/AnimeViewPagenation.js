import React, { useState, useEffect } from 'react';
import styles from '../../styles/components-css/AnimeViewPagenation.module.css'
import ThumbnailSimple from '../item/ThumbnailSimple';

export default function AnimeViewPagenation({ animes, width }) {
    console.log(animes);
    const [page, setPage] = useState(1); //ページ番号
    const [pageCount, setPageCount] = useState(); //ページ数
    const [allItems, setAllItems] = useState([]); //全データ
    const [displayedItems, setDisplayedItems] = useState([]); //表示データ
    const displayNum = 6; //1ページあたりの項目数

    const items = animes


    useEffect(() => {
        setAllItems(items);
        //ページカウントの計算（今回は3項目/ページなので4ページ）
        setPageCount(Math.ceil(items.length / displayNum));
        //表示データを抽出
        setDisplayedItems(items.slice(((page - 1) * displayNum), page * displayNum))
    }, [page])

    const handleChange = (num) => {
        const new_page = page + num
        //ページ移動時にページ番号を更新
        setPage(new_page < 1 ? pageCount : (new_page > pageCount ? 1 : new_page));
        //ページ移動時に表示データを書き換える
        setDisplayedItems(allItems.slice(((page) - 1) * displayNum), page * displayNum)
    }
    const pageChange = (pageNumber) => {
        setPage(pageNumber)
        setDisplayedItems(allItems.slice(((pageNumber) - 1) * displayNum), pageNumber * displayNum)
    }

    return (
        <div className={`${styles.pagenationWrapper}`}>
            <div className={`${styles.pagenation}`}>
                {/* <button onClick={() => handleChange(-1)} className={`${styles.beforePageButton}`}></button> */}
                {Array.from(Array(pageCount), (v, k) => k + 1).map(pageNumber => {
                    return (
                        <button onClick={() => pageChange(pageNumber)} className={`${styles.pageNumber} ${page === pageNumber && ` ${styles.activePage}`}`} key={pageNumber}>{pageNumber}</button>
                    )
                })}
                {/* <button onClick={() => handleChange(+1)} className={`${styles.afterPageButton}`}></button> */}
            </div>
            <div className={`${styles.viewAnimeWrapper}`}>
                {displayedItems.map((anime, index) => {
                    return (
                        <div className={`${styles.thumbnail}`} key={index}>
                            <ThumbnailSimple width={width} title={anime.title} media={anime.media} casts={anime.casts} reviewanime_set={anime.reviewanime_set} src={anime.image} watchersCount={anime.watchersCount} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
