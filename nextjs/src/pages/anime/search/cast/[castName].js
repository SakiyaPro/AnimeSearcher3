import React from 'react'
import { useRouter } from 'next/router';
import styles from '../../../../styles/anime_search.module.css'
import TagWrapper from '../../../../components/item/TagWrapper';
import AnimeSectionItem from '../../../../components/item/AnimeSectionItem';
import { getCastAnimeData } from '../../../../lib/getAnimeData';
import { getAllGenre } from '../../../../lib/getGenreData'
import axios from 'axios'

export default function CastSearch({ castAnimeData, allGenre }) {
    const router = useRouter()
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
    )
}

export async function getServerSideProps({ query }) {
    const castAnimeData = await getCastAnimeData(query.castName, { offset: 0 })
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return { props: { castAnimeData, allGenre } }
}
