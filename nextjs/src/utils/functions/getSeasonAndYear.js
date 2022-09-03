// 現在日付から num ヶ月前の季節と西暦を返す。
export function getSeasonAndYear(num) {
    const date = new Date()
    date.setMonth(date.getMonth() + num)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    console.log(year);
    console.log(month);

    switch (1 <= month && month <= 12) {
        case 1 <= month && month <= 3:
            return ["WINTER", year];
        case 4 <= month && month <= 6:
            return ["SPRING", year]
        case 7 <= month && month <= 9:
            return ["SUMMER", year]
        default:
            return ["AUTUMN", year]
    }
}
