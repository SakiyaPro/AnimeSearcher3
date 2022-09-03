export function getSectionTitle(str) {
    switch (str) {
        case "/anime/recommend/nowSeason":
            return "今期アニメ";

        case "/anime/recommend/onePrevSeason":
            return "前期アニメ"

        case "/anime/recommend/popularSeason":
            return "人気アニメ"

        default:
            return false
    }
}
