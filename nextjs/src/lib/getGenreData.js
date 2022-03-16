import axios from "axios";


export async function getAllGenre() {
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/genredata/?format=json`)).data.results
    return res
}
