import axios from "axios";
import Cookies from "js-cookie";


export async function hasStaffParmission() {
    const user_id = Cookies.get("user_id")
    const URL = `${process.env.NEXT_PUBLIC_DJANGO_URL}users/CustomUser/${user_id}/has_staff/`
    const res = await axios.post(URL).then(result => result.data).catch(error => false)
    switch (true) {
        case res === "True":
            return true
        default:
            return false;
    }
}
