// React
import React from 'react';
import { useRouter } from 'next/router';
// CSS
import styles from '../../../../styles/anime_search.module.css';
// Components
import TagWrapper from '../../../../components/item/TagWrapper';
import AnimeSectionItem from '../../../../components/item/AnimeSectionItem';
// ViewSets
import { getAnimeSimpleFindToCast } from '../../../../libs/AnimeSimpleViewSet';
import { getAllGenreData } from '../../../../libs/GenreDataViewSet';


/* 声優出演アニメ検索結果 */
export default function CastSearch({ castAnimeData, allGenre }) {
    // useRouter
    const router = useRouter();

    return (
        <section className={"section"}>
            <div className={`${styles.resultTitle}`}>
                <h2>{router.query.castName}さんの出演アニメ</h2>
            </div>
            <div className={`${styles.resultWrapper}`}>
                {
                    castAnimeData ?
                        castAnimeData.map((anime, i) => {
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
    );
};


export async function getServerSideProps({ query }) {
    // 声優出演アニメ取得
    const castAnimeData = await getAnimeSimpleFindToCast(query.castName, { offset: 0 });
    // ジャンルデータ取得
    const allGenre = await (getAllGenreData()).then(async res => await res.map(data => data.genre));

    return { props: { castAnimeData, allGenre } }
};
