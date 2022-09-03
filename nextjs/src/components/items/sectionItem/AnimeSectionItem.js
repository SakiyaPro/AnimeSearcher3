// React
import React, { useState, useEffect } from 'react'
// Comps
import GenreTagWrapper from 'Comps/items/_parts/parts/GenreUpdateTagWrapper';
import ReviewButton from 'Comps/items/_parts/parts/ReviewButton';
import FavoriteButton from 'Comps/items/_parts/parts/FavoriteButton';
import AnimeItemTitle from 'Comps/items/_parts/title/AnimeItemTitle';
import RoundCornerThumbnail from 'Comps/items/_parts/thumbnail/RoundCornerThumbnail';
import ReviewStar from 'Comps/items/ReviewStar';
// Styles
import styles from 'Styles/components-css/items/sectionItem/AnimeSectionItem.module.css'
// Utils
import { getLoginState } from 'Utils/functions/getLoginState';
import { hasStaffParmission } from 'Utils/functions/hasStaffParmission'
// Other
import Cookies from 'js-cookie';

export default function AnimeSectionItem({ anime, allGenre }) {

    // お気に入りユーザー数をレンダリング無しで更新する
    const [favoriteCountPostState, setFavoriteCountPostState] = useState()
    const [favoriteCount, setFavoriteCount] = useState()
    useEffect(() => {
        const userId = parseInt(Cookies.get("user_id"), 10)
        setFavoriteCountPostState(anime.favorite_count.map(user => user.id).includes(userId))
        setFavoriteCount(anime.favorite_count.length + anime.watchersCount)
    }, [anime.favorite_count, anime.watchersCount])

    return (
        <div className={`${styles.sectionItemBox}`}>
            <div className={`${styles.animeImage}`}>
                <img src={anime.image} alt={anime.title} />
            </div>
            <div className={`${styles.animeTitle}`}>
                <AnimeItemTitle animeTitle={anime.title} animeId={anime.id} />
            </div>
            <div className={`${styles.bottom}`}>
                <div className={`${styles.infomation}`}>
                    <GenreTagWrapper animeId={anime.id} myGenre={anime.genres.map(data => data.genre)} allGenre={allGenre} animeSeasonYear={anime.seasonYear} animeSeasonName={anime.seasonName} />
                </div>
                <div className={`${styles.buttonWrapper}`}>
                    <ReviewStar animeTitle={anime.title} reviewanime_set={anime.reviewanime_set} />
                    <ReviewButton commentCount={anime.reviewanime_set.length} />
                    <FavoriteButton
                        favoriteCount={favoriteCount}
                        favoriteCountPostState={favoriteCountPostState}
                        setFavoriteCount={setFavoriteCount}
                        setFavoriteCountPostState={setFavoriteCountPostState}
                        animeId={anime.id}
                    />
                </div>
            </div>
        </div>
    )
}
