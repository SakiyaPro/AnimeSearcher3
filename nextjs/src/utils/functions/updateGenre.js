import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeSimple/`

/* アニメの保有ジャンルを追加 */
export async function addAnimeGenreTag(animeId, genre) {
    const res = await axios.patch(URL + `${animeId}/`,
        { "genre": genre }
    )
    location.reload();
}

/* アニメの保有ジャンルを削除 */
export async function removeAnimeGenreTag(animeId, genre) {
    const res = await axios.patch(URL + `${animeId}/`,
        { "genre": genre, "remove": "true" }
    )
    location.reload();
}
