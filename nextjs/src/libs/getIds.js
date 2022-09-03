import axios from "axios";

export async function getAllUserIds() {
    const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}users/userIds/?format=json&limit=100000`)).data.results
    return res
}
