import React from 'react'
import styles from 'Styles/components-css/items/_parts/parts/DisableButton.module.css'

export default function DisableButton({setDisplay}) {
    return (
        <button className={`${styles.disableButton}`} onClick={() => setDisplay(false)}>
            <img src="/image/systemIcon/system/disable_icon.png" width="13px" height="13px" alt="" />
        </button>
    )
}
