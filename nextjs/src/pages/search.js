import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {useGlobal} from 'reactn'
import styles from '../styles/search.module.css'
import SearchBar from '../components/item/SearchBar'
import TagWrapper from '../components/item/TagWrapper'
import AnimeSectionItem from '../components/item/AnimeSectionItem'
import { getAllGenre } from '../lib/getGenreData'
import { conversionSeasonName, getSeasonAndYear } from '../utils/functions'

export default function Search({ allGenre }) {
    const [searchResult, setSearchResult] = useState()
    const [BEFORESEASON1, setBEFORESEASON1] = useState()
    const [BEFOREYEAR1, setBEFOREYEAR1] = useState()


    useEffect(() => {
        setBEFORESEASON1(getSeasonAndYear(-3)[0])
        setBEFOREYEAR1(getSeasonAndYear(-3)[1])
    }, [])

    /* useEffect(() => {
        console.log(`検索結果: ${searchResult}`);
    }, [searchResult]) */

    return (
        <>
            <div className={`${styles.sectionTop}`}>
                <SearchBar size={49} setSearchResult={setSearchResult} />
                <div className={`${styles.contentButtonWrapper}`}>
                    <Link href="/recommend/nowSeason" passhref="true" >
                        <a>今期アニメ</a>
                    </Link>
                    <Link href="/recommend/onePrevSeason" passhref="true" >
                        <a>{BEFOREYEAR1} {conversionSeasonName(BEFORESEASON1)}アニメ</a>
                    </Link>
                    <Link href="/recommend/popularAnime" passhref="true" >
                        <a>人気アニメ</a>
                    </Link>
                </div>
            </div>
            <section className={`${styles.section}`}>
                {
                    searchResult &&
                        searchResult === "no result" ?
                        <div className={`${styles.noResult}`}>
                            <p>申し訳ございません。</p>
                            <p>該当するアニメが見つかりませんでした。</p>
                        </div>
                        :
                        searchResult?.map((anime, i) => {
                            return (
                                <div key={i} className="sectionItem">
                                    <TagWrapper anime={anime} allgenre={allGenre} />
                                    <AnimeSectionItem anime={anime} />
                                </div>
                            )
                        })
                }
            </section>
        </>
    )
}

export async function getServerSideProps() {
    // アニメデータ取得
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return {
        props: { allGenre },
    };
};
