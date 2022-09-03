import Cookies from "js-cookie";

export function getLoginState() {
    const access_token = Cookies.get("access_token")
    switch (access_token) {
        case access_token:
            // ログイン状態なら true
            return true
        default:
            // 未ログインなら false
            return false
    }
}
