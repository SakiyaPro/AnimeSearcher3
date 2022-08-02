import axios from 'axios';

// id で取得
export async function getAnimeData(animeId, { offset = 0 }) {
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/${animeId}/?format=json`)).data;
    return res;
}
