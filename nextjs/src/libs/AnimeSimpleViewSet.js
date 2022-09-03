import axios from 'axios';

/* =======================================================
//  GET 通信
========================================================*/

// id で取得
export async function getAnimeSimpleFindToId(animeId, { offset = 0 }) {
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeSimple/${animeId}/?format=json`)).data;
    return res;
}

// 放送時期で取得
export async function getAnimeSimpleFindToSeason(seasonName, seasonYear, { offset = 0 }) {
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeSimple/?format=json&limit=1000&offset=${offset}&watchersCount_max=true&seasonName=${seasonName}&seasonYear=${seasonYear}`)).data.results;
    return res;
}

// 視聴者数で取得
export async function getAnimeSimpleFindToWatchers(watchersCount_lte, watchersCount_gte, { offset = 0 }) {
    const res = await (await axios.get(
        `${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeSimple/?format=json&limit=30&offset=${offset}&watchersCount_lte=${watchersCount_lte}&watchersCount_gte=${watchersCount_gte}&watchersCount_max=true`)
    ).data.results
    return res.id, res
}

// 声優名で取得
export async function getAnimeSimpleFindToCast(castName, { offset = 0 }) {
    const res = await (await axios.get(
        encodeURI(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeSimple/?format=json&limit=30&offset=${offset}&casts=${castName}&watchersCount_max=true`))
    ).data.results
    return res
}

// スタッフ名で取得
export async function getAnimeSimpleFindToStaff(castName, { offset = 0 }) {
    const res = await (await axios.get(
        encodeURI(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeSimple/?format=json&limit=30&offset=${offset}&staffs=${castName}&watchersCount_max=true`))
    ).data.results
    return res
}

// ジャンルで取得
// 最大３ジャンルまで同時取得
// offset は 何ページ目を取るかを指定
export async function getAnimeSimpleFindToGenres(genre1, genre2, genre3, { offset = 0 }) {
    let URL = `${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeSimple/?format=json&limit=30&offset=${offset}&genres=`
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


/* =======================================================
//  POST 通信
========================================================*/


