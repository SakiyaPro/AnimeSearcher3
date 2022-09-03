import axios from "axios";
import Cookies from "js-cookie";

export async function refresh_access_token() {
    const refresh_access_token = await (await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_URL}dj-rest-auth/token/refresh/`, {
        refresh: `${Cookies.get("refresh_token")}`,
    })).data.access
    Cookies.set("access_token", refresh_access_token);
}

// 投票
export async function post_or_update_review(userReview_id, anime_id, star, comment, anime_title) {
    // アクセストークンを再取得(refresh)
    refresh_access_token()
    // anime_idがないなら、anime_titleでanime_idを取得する
    if (!anime_id) {
        anime_id = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?title=${anime_title}`)).data.results[0].id
    }
    // ユーザーレビューが既にあるならPATCHで更新。ないならPOSTで新規作成。
    if (userReview_id) {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_DJANGO_URL}users/review_anime/${userReview_id}/`, {
            "star": star,
            "comment": comment,
        }, {
            "headers": {
                Authorization: `JWT ${Cookies.get("access_token")}`,
            },
        }
        )
        location.reload();
        return "Update completed"
    }
    const res1 = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}users/review_anime/?user_id=${Cookies.get("user_id")}`)).data.results
    res1.map(review => {
        if (review.anime.id === anime_id) {
            userReview_id = review.id
        }
    })
    if (userReview_id) {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_DJANGO_URL}users/review_anime/${userReview_id}/`, {
            "star": star,
            "comment": comment,
        }, {
            "headers": {
                Authorization: `JWT ${Cookies.get("access_token")}`,
            },
        }
        )
        location.reload();
        return "Update completed"
    }

    // 上記処理で PATCH する要素が見つからないなら POST で新規作成
    const res2 = await axios.post(`${process.env.NEXT_PUBLIC_DJANGO_URL}users/review_anime/`, {
        "anime_id": anime_id,
        "star": star,
        "comment": comment,
    }, {
        "headers": {
            Authorization: `JWT ${Cookies.get("access_token")}`,
        },
    }
    )
    location.reload();
    return "Post completed"
}


export function login_request() {
    const access_token = Cookies.get("access_token")
    if (access_token) {
        // ログイン済みなら true
        return true
    } else {
        // 未ログインなら false (要ログイン)
        return false
    }
}

export function conversionStrDate(modified) {
    const nowDate = new Date()  // 現在の時刻
    modified = new Date(modified)  // 更新時の時刻

    const diffms = nowDate - modified  // 時刻の差(ミリ秒)
    if (parseInt(diffms / 1000) < 60) {
        return `${parseInt(diffms / 1000)}秒前`
    }
    else if (parseInt(diffms / 1000 / 60) < 60) {
        return `${parseInt(diffms / 1000 / 60)}分前`
    }
    else if (parseInt(diffms / 1000 / 60 / 60) < 24) {
        return `${parseInt(diffms / 1000 / 60 / 60)}時間前`
    }
    else if (parseInt(diffms / 1000 / 60 / 60 / 24) < 30) {
        return `${parseInt(diffms / 1000 / 60 / 60 / 24)}日前`
    }
    else if (parseInt(diffms / 1000 / 60 / 60 / 24 / 30) < 12) {
        return `${parseInt(diffms / 1000 / 60 / 60 / 24 / 30)}ヶ月前`
    }
    else {
        return `${parseInt(diffms / 1000 / 60 / 60 / 24 / 30 / 12)}年前`
    }
}
