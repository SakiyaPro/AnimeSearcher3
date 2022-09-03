// React
import React from 'react';
// CSS
import styles from 'Styles/Home.module.css'
// Comps
import AnimeSwiperItem from 'Comps/items/AnimeSwiperItem';
// Libs
import { getAnimeSimpleFindToSeason, getAnimeSimpleFindToWatchers } from 'Libs/AnimeSimpleViewSet';
import { getAllGenreData } from 'Libs/GenreDataViewSet';
// Utils
import { NOWSEASON, NOWYEAR, BEFORESEASON1, BEFOREYEAR1 } from 'Utils/valiables/basicInfo';
import SectionTitle1 from 'Comps/items/sectionTitle/SectionTitle1';


/* ホーム画面 */
export default function Home({ nowSeasonData, onePrevSeasonData, popularData, allGenre }) {

    return (
        <section className="section">
            <>
            </>
            <div className={`${styles.sectionTitleWrapper}`}>
                <SectionTitle1 title="今期アニメ" link="anime/recommend/nowSeason" />
            </div>
            <AnimeSwiperItem animesData={nowSeasonData?.slice(0, 10)} />

            <div className={`${styles.sectionTitleWrapper}`}>
                <SectionTitle1 title="前期アニメ" link="anime/recommend/onePrevSeason" />
            </div>
            <AnimeSwiperItem animesData={onePrevSeasonData?.slice(0, 10)} />

            <div className={`${styles.sectionTitleWrapper}`}>
                <SectionTitle1 title="人気アニメ" link="anime/recommend/popularAnime" />
            </div>
            <AnimeSwiperItem animesData={popularData?.slice(0, 10)} />
        </section>
    );
};


export async function getServerSideProps() {
    // アニメデータ取得
    const nowSeasonData = await getAnimeSimpleFindToSeason(NOWSEASON, NOWYEAR, { offset: 0 });
    const onePrevSeasonData = await getAnimeSimpleFindToSeason(BEFORESEASON1, BEFOREYEAR1, { offset: 0 });
    const popularData = await getAnimeSimpleFindToWatchers("", 4000, { offset: 0 });
    // ジャンルデータ取得
    const allGenre = await (getAllGenreData()).then(async res => await res.map(data => data.genre));

    return {
        props: { nowSeasonData, onePrevSeasonData, popularData, allGenre },
    };
}
