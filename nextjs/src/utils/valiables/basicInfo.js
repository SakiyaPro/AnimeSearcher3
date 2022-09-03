import { getSeasonAndYear } from "Utils/functions/getSeasonAndYear"

// 今期の季節と年度
export const [NOWSEASON, NOWYEAR] = getSeasonAndYear(0);
// 前期の季節と年度
export const [BEFORESEASON1, BEFOREYEAR1] = getSeasonAndYear(-3);
