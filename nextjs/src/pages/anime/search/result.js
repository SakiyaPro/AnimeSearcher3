import React, { useEffect, useState } from 'react'
import styles from '../../../styles/anime_search.module.css'
import TagWrapper from '../../../components/item/TagWrapper';
import AnimeSectionItem from '../../../components/item/AnimeSectionItem';
import { getAllGenreData } from '../../../lib/GenreDataViewSet';
import axios from 'axios';
import SearchBar from '../../../components/item/SearchBar';

export default function AnimeResult({ searchTitle, allGenre }) {
    const [searchResult, setSearchResult] = useState()

    useEffect(() => {
        const getSearchResult = async () => {
            // searchTitle クエリが null なら検索しない
            if (!searchTitle) {
                return
            }

            const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeSimple/?title_contains=${searchTitle}&watchersCount_max=true`)).data.results
            // 検索結果があるなら searchResult へ代入
            if (res.length) {
                setSearchResult(res)
            }
        }
        getSearchResult()
    }, [])


    return (
        <section className="section">
            <SearchBar />
            <div className={`${styles.resultWrapper}`}>
                {
                    searchResult ?
                        searchResult?.map((anime, i) => {
                            return (
                                <div key={i} className={`${styles.resultItem}`}>
                                    <div className={`${styles.tags}`}>
                                        <TagWrapper anime={anime} allgenre={allGenre} />
                                    </div>
                                    <AnimeSectionItem anime={anime} />
                                </div>
                            )
                        })
                        :
                        <p>no result</p>
                }
            </div>
        </section>
    )
}

export async function getServerSideProps({ query }) {
    // クエリ文字列取得
    const searchTitle = query?.searchTitle ? query?.searchTitle : ""
    // ジャンルデータ取得
    const allGenre = await (getAllGenreData()).then(async res => await res.map(data => data.genre));

    return {
        props: { searchTitle, allGenre },
    };
};
