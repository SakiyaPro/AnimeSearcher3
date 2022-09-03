import React, { useState } from 'react'
import { useGlobal } from 'reactn'
// CSS
import styles from 'Styles/components-css/items/_parts/parts/FavoriteCount.module.css'
// Comps
import LoginRequest from 'Comps/portal/LoginRequest';
// Utils
import { plusFavoriteCount, minusFavoriteCount } from 'Utils/functions/updateFavoriteCount'

export default function FavoriteButton({
    favoriteCount, setFavoriteCount,
    favoriteCountPostState, setFavoriteCountPostState,
    animeId,
}) {
    // グルーバルステート取得
    const LoginState = useGlobal("LoginState")[0];

    // LoginRequest.js の画面監視
    const [display, setDisplay] = useState(false)

    return (
        <div>
            {
                favoriteCountPostState ?
                    <button
                        className={`${styles.favoriteButton}`}
                        onClick={() => {
                            LoginState && minusFavoriteCount(animeId),
                                LoginState && setFavoriteCountPostState(!favoriteCountPostState),
                                LoginState && setFavoriteCount(favoriteCount - 1), !LoginState && setDisplay(true)
                        }}
                    >
                        <img src="/image/systemIcon/system/favo_icon(pink).png" alt="" width="18px" height="18px" />
                        <span style={{ color: "#D83A56" }}>{favoriteCount}</span>
                    </button>
                    :
                    <button
                        className={`${styles.favoriteButton}`}
                        onClick={() => {
                            LoginState && plusFavoriteCount(animeId),
                                LoginState && setFavoriteCountPostState(!favoriteCountPostState),
                                LoginState && setFavoriteCount(favoriteCount + 1), !LoginState && setDisplay(true)
                        }}
                    >
                        <img src="/image/systemIcon/system/favo_icon.png" alt="" width="18px" height="18px" />
                        <span style={{color: "#222"}}>{favoriteCount}</span>
                    </button>
            }

            {
                !LoginState && display &&
                <LoginRequest setDisplay={setDisplay} />
            }
        </div>
    )
}
