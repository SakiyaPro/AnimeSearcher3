// React
import React from 'react'
import { useRouter } from 'next/router';
// CSS
import styles from '../../../../styles/anime_search.module.css';
// Components
import TagWrapper from '../../../../components/item/TagWrapper';
import AnimeSectionItem from '../../../../components/item/AnimeSectionItem';
// ViewSets
import { getStaffAnimeData } from '../../../../libs/getAnimeData';
import { getAllGenre } from '../../../../libs/getGenreData'


/* スタッフ検索結果 */
export default function StaffSearch({ staffAnimeData, allGenre }) {
    // useRouter
    const router = useRouter();

    return (
        <section className={"section"}>
            <div className={`${styles.resultTitle}`}>
                <h2>スタッフとして出演: {router.query.staffName}さん</h2>
            </div>
            <div className={`${styles.resultWrapper}`}>
                {
                    staffAnimeData ?
                        staffAnimeData.map((anime, i) => {
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
    const staffAnimeData = await getStaffAnimeData(query.staffName, { offset: 0 })
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return { props: { staffAnimeData, allGenre } }
}
