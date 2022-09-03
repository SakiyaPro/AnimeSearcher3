import axios from "axios";
import Cookies from "js-cookie";

export async function refreshAccessToken() {
    const refreshAccessToken = await (await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_URL}dj-rest-auth/token/refresh/`, {
        refresh: `${Cookies.get("refresh_token")}`,
    })).data.access
    Cookies.set("access_token", refreshAccessToken);
}
