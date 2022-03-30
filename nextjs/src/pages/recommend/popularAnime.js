import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getWatchersData } from "../../lib/getAnimeData";
import { getAllGenre } from '../../lib/getGenreData';
import { getSeasonAndYear, conversionSeasonName } from "../../utils/functions";
import TagWrapper from '../../components/item/TagWrapper';
import AnimeSectionItem from '../../components/item/AnimeSectionItem';


const [BEFORESEASON1, BEFOREYEAR1] = getSeasonAndYear(-3)

export default function PopularAnime({ popularData, allGenre }) {
    const router = useRouter()

    // ページ移動時のスクロール位置を記録
    useEffect(() => {
        window.addEventListener('beforeunload', window.scrollTo({ top: sessionStorage.getItem(router.pathname), behavior: "smooth" }))
        return () => {
            window.removeEventListener('beforeunload', window.scrollTo({ top: sessionStorage.getItem(router.pathname), behavior: "smooth" }))
        };
    }, [])

    return (
        <>
            <div className="sectionTop">
                <Link href="/recommend/popularAnime" passhref="true"><a className="sectionName">人気アニメ</a></Link>
            </div>
            <section className="section">
                {
                    popularData?.map((anime, i) => {
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

export async function getStaticProps() {
    // アニメデータ取得
    const popularData = await getWatchersData("", 4000, { offset: 0 });
    const allGenre = await (getAllGenre()).then(async res => await res.map(data => data.genre));

    return {
        props: { popularData, allGenre },
        revalidate: 50000,
    }
}
