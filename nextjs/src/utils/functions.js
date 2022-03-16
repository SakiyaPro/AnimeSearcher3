import axios from "axios";
import Cookies from "js-cookie";


export async function remove_genre(animeId, genre) {
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/${animeId}/`,
        { "genre": genre, "remove": "true" }
    )
    location.reload();
}

export async function update_genre(animeId, genre) {
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/${animeId}/`,
        { "genre": genre }
    )
    location.reload();
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

// 現在日付から num ヶ月前の季節と西暦を返す。
export function getSeasonAndYear(num) {
    const date = new Date()
    date.setMonth(date.getMonth() + num)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    if (1 <= month & month <= 3) {
        return ["WINTER", year]
    }
    else if (4 <= month & month <= 6) {
        return ["SPRING", year]
    }
    else if (7 <= month & month <= 9) {
        return ["SUMMER", year]
    }
    else {
        return ["AUTUMN", year]
    }
}

export function conversionSeasonName (name) {
    if (name === "WINTER") {
        return "冬"
    }
    else if (name === "SPRING") {
        return "春"
    }
    else if (name === "SUMMER") {
        return "夏"
    }
    else {
        return "秋"
    }
}

export function conversionStrDate(modified) {
    let result = modified.replace('-', '年').replace('-', '月').replace('T', '日・').replace(':', '時').replace(':', '分')
    result = result.substring(0, result.indexOf("分") + 1)
    return result
}
