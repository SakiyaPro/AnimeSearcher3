// React
import React from 'react';
// CSS
import styles from 'Styles/anime_recommend.module.css'
// Components
import AnimeSectionItem from 'Comps/items/sectionItem/AnimeSectionItem';
import SelectionRecommendButton from 'Comps/items/_parts/parts/SelectionRecommendButton';
// Libs
import { getAnimeSimpleFindToSeason } from 'Libs/AnimeSimpleViewSet';
import { getAllGenreData } from 'Libs/GenreDataViewSet';
// Utils
import { NOWSEASON, NOWYEAR } from 'Utils/valiables/basicInfo';


/* 今期アニメの一覧 */
export default function NowSeason({ nowSeasonData, allGenre }) {

    return (
        <>
            <section className={`${styles.wrapper}`}>
                <div className={`${styles.SelectRecommendItemWrapper}`}>
                    <SelectionRecommendButton />
                </div>
                <div className={`${styles.AnimeSectionItemWrapper}`}>
                    {
                        nowSeasonData?.map((anime, i) => {
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
    );
}

export async function getStaticProps() {
    // アニメデータ取得
    const nowSeasonData = await getAnimeSimpleFindToSeason(NOWSEASON, NOWYEAR, { offset: 0 });
    // ジャンルデータ取得
    const allGenre = await (getAllGenreData()).then(async res => await res.map(data => data.genre));

    return {
        props: { nowSeasonData, allGenre },
    };
};
