import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshAccessToken } from 'Utils/functions/refreshAccessToken';

const URL = `${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeSimple/`

export async function plusFavoriteCount(animeId) {
    refreshAccessToken()
    const res = await axios.patch(URL + `${animeId}/`, {
        favorite_count_plus: "true"
    }, {
        "headers": {
            Authorization: `JWT ${Cookies.get("access_token")}`,
        },
    })
}

export async function minusFavoriteCount(animeId) {
    refreshAccessToken()
    const res = await axios.patch(URL + `${animeId}/`, {
        favorite_count_minus: "true"
    }, {
        "headers": {
            Authorization: `JWT ${Cookies.get("access_token")}`,
        },
    })
}
