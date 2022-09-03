// React
import { React, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from 'next/link'
// Comps
import DisableButton from "Comps/items/_parts/parts/DisableButton";
// CSS
import styles from 'Styles/components-css/portal/LoginRequest.module.css'

export default function LoginRequest({ setDisplay }) {
    const [showPortal, setShowPortal] = useState(false);

    useEffect(() => {
        setShowPortal(true);
    }, []);

    if (!showPortal) {
        return null;
    }

    return createPortal(
        <>
            <div onClick={() => setDisplay(false)} className="displayBackground" >
            </div>
            <div className={`${styles.activeAddButton}`}>
                <div className={`${styles.contentTop}`}>
                    <DisableButton setDisplay={setDisplay} />
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
        </>,
        document.body
    )
}
