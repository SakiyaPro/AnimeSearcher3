// React
import React from 'react';
// CSS
import styles from 'Styles/anime_recommend.module.css';
// Components
import AnimeSectionItem from 'Comps/items/sectionItem/AnimeSectionItem';
import SelectionRecommendButton from 'Comps/items/_parts/parts/SelectionRecommendButton';
// ViewSets
import { getAnimeSimpleFindToWatchers } from 'Libs/AnimeSimpleViewSet';
import { getAllGenreData } from 'Libs/GenreDataViewSet';


/* 人気アニメの一覧 */
export default function PopularAnime({ popularData, allGenre }) {

    return (
        <>
            <section className={`${styles.wrapper}`}>
                    <div className={`${styles.SelectRecommendItemWrapper}`}>
                        <SelectionRecommendButton />
                    </div>
                    <div className={`${styles.AnimeSectionItemWrapper}`}>
                        {
                            popularData?.map((anime, i) => {
                                return (
                                    <div key={i}>
                                        <AnimeSectionItem anime={anime} allGenre={allGenre} />
                                    </div>
                                )
                            })
                        }
                    </div>
            </section>
        </>
    )
}

export async function getStaticProps() {
    // アニメデータ取得
    const popularData = await getAnimeSimpleFindToWatchers("", 4000, { offset: 0 });
    const allGenre = await (getAllGenreData()).then(async res => await res.map(data => data.genre));

    return {
        props: { popularData, allGenre },
    }
}
