import axios from 'axios';

export async function getAnimeDatail(animeId, { offset = 0 }) {
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeDetail/${animeId}/?format=json`)).data;
    return res;
}
