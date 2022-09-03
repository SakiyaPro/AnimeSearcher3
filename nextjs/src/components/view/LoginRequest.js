import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from 'Styles/components-css/portal/LoginRequest.module.css'


export default function LoginRequest() {
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        setDisplay(!display)
    })

    return (
        <>
            <div onClick={() => setDisplay(false)} className="displayBackground" >
            </div>
            <div className={`${styles.activeAddButton}`}>
                <div className={`${styles.contentTop}`}>
                    <button className={`${styles.desableButton}`} onClick={() => setDisplay(false)}>
                        <img src="/image/systemIcon/system/disable_icon.png" width="13px" height="13px" alt="" />
                    </button>
                    <div>アカウント作成のお願い</div>
                </div>
                <div className={`${styles.contentWrapper}`}>
                    <div className={`${styles.apologizeImage}`}>
                        <img src="/image/systemIcon/image/工事中.png" alt="apologizeImage" />
                    </div>
                    <div className={`${styles.text}`}>
                        <p>申し訳ございません。</p>
                        <p>本機能は会員機能であるため、ご利用いただけません。</p>
                        <p>下記より無料会員登録（またはログイン）を行うことで、当サイトの会員機能を開放できます。</p>
                        <Link href="/account/login">
                            <a onClick={() => setDisplay(false)} className="a-decoration1">会員登録またはログインはこちら</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
