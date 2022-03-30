import axios from 'axios';

// id で取得
export async function getAnimeData(animeId, {offset = 0}) {
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/${animeId}/?format=json`)).data;
    return res;
}

export async function getDetailAnimeData(animeId, { offset = 0 }) {
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedatadetail/${animeId}/?format=json`)).data;
    return res;
}

// 放送年度で取得
export async function getSeasonData(seasonName, seasonYear, {offset = 0}) {
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?format=json&limit=1000&offset=${offset}&watchersCount_max=true&seasonName=${seasonName}&seasonYear=${seasonYear}`)).data.results;
    return res;
}

// 視聴者数で取得
export async function getWatchersData(watchersCount_lte, watchersCount_gte, {offset = 0}) {
    const res = await (await axios.get(
        `${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?format=json&limit=30&offset=${offset}&watchersCount_lte=${watchersCount_lte}&watchersCount_gte=${watchersCount_gte}&watchersCount_max=true`)
    ).data.results
    return res
}

// ジャンルで取得
export async function getGenresData(genre1, genre2, genre3, {offset = 0}) {
    let URL = `${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?format=json&limit=30&offset=${offset}&genres=`
    if (genre1) {
        URL += genre1
        if (genre2) {
            URL += ","
            URL += genre2
        }
        if (genre3) {
            URL += ","
            URL += genre3
        }
    }
    else if (genre2) {
        URL += genre2
        if (genre3) {
            URL += ","
            URL += genre3
        }
    }
    else if (genre3) {
        URL += genre3
    }
    const res = await (await axios.get(
        encodeURI(URL)
    )).data.results
    return res
}
