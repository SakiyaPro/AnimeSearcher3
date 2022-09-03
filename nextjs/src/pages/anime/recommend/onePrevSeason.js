// React
import React from 'react'
// CSS
import styles from 'Styles/anime_recommend.module.css'
// Components
import AnimeSectionItem from 'Comps/items/sectionItem/AnimeSectionItem';
import SelectionRecommendButton from 'Comps/items/_parts/parts/SelectionRecommendButton';
// ViewSets
import { getAnimeSimpleFindToSeason } from 'Libs/AnimeSimpleViewSet';
import { getAllGenreData } from 'Libs/GenreDataViewSet';
// Other
import { getSeasonAndYear } from 'Utils/functions/getSeasonAndYear';
import { conversionSeasonName } from 'Utils/functions/conversionSeasonName';


const [BEFORESEASON1, BEFOREYEAR1] = getSeasonAndYear(-3)           // 前期アニメの時季情報


/* 前期アニメの一覧 */
export default function OnePrevSeason({ onePrevSeasonData, allGenre }) {

    return (
        <>
            <section className={`${styles.wrapper}`}>
                    <div className={`${styles.SelectRecommendItemWrapper}`}>
                        <SelectionRecommendButton />
                    </div>
                    <div className={`${styles.AnimeSectionItemWrapper}`}>
                        {
                            onePrevSeasonData?.map((anime, i) => {
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
    const onePrevSeasonData = await getAnimeSimpleFindToSeason(BEFORESEASON1, BEFOREYEAR1, { offset: 0 });
    // ジャンルデータ取得
    const allGenre = await (getAllGenreData()).then(async res => await res.map(data => data.genre));

    return {
        props: { onePrevSeasonData, allGenre },
    };
};
