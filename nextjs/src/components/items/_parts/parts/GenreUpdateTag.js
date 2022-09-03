import React, { } from 'react'
// CSS
import styles from 'Styles/components-css/items/_parts/parts/GenreUpdateTagWrapper.module.css'
// Utils
import { addAnimeGenreTag, removeAnimeGenreTag } from 'Utils/functions/updateGenre'

export default function GenreTag({ animeId, genreName, updateState }) {

    return (
        <>
            {
                // updateState に add を指定した場合、ジャンルタグ追加用の要素を返す
                (updateState == "add") &&
                <button
                    className={`${styles.tag}`
                    }
                    onClick={() => addAnimeGenreTag(animeId, genreName)}
                >
                    <img src="/image/systemIcon/system/plus_icon(333).png" width="13px" alt="" />
                    <span>{genreName}</span>
                </button>
            }
            {
                // updateState に remove を指定した場合、ジャンルタグ削除用の要素を返す
                (updateState == "remove") &&
                <button
                    className={`${styles.tag}`}
                    onClick={() => removeAnimeGenreTag(animeId, genreName)}
                >
                    <img src="/image/systemIcon/system/minus_icon(blue).png" width="13px" alt="" />
                    <span>{genreName}</span>
                </button>
            }
        </>
    )
}
