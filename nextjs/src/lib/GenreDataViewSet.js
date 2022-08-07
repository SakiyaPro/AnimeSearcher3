import axios from "axios";


export async function getAllGenreData() {
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/GenreData/?format=json`)).data.results
    return res
}
