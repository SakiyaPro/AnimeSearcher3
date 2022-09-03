// React
import React, { useEffect, useState } from 'react'
// CSS
import styles from '../../../styles/anime_search.module.css'
// components
import TagWrapper from '../../../components/item/TagWrapper';
import AnimeSectionItem from '../../../components/item/AnimeSectionItem';
import SearchBar from '../../../components/item/SearchBar';
// ViewSets
import { getAllGenreData } from '../../../libs/GenreDataViewSet';
// Other
import axios from 'axios';


/* 検索結果表示画面 */
export default function AnimeResult({ searchTitle, allGenre }) {
    // useState
    const [searchResult, setSearchResult] = useState()

    // useEffect
    useEffect(() => {
        const getSearchResult = async () => {
            if (!searchTitle) {
                // URLパラメータが null なら検索しない
                return
            };

            const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeSimple/?title_contains=${searchTitle}&watchersCount_max=true`)).data.results;
            if (res.length) {
                // 検索結果があるなら searchResult へ代入
                setSearchResult(res)
            };
        };
        // 検索結果の取得とuseStateへの代入
        getSearchResult();
    }, []);


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
    // URLパラメータのクエリ文字列取得
    const p_searchTitle = query?.searchTitle;
    const searchTitle = p_searchTitle ? p_searchTitle : "";
    // ジャンルデータ取得
    const allGenre = await (getAllGenreData()).then(async res => await res.map(data => data.genre));

    return {
        props: { searchTitle, allGenre },
    };
};
