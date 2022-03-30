import React from 'react'
import Link from 'next/link'
import styles from '../../styles/components-css/LoginRequest.module.css'

export default function LoginRequest({ setDisplay }) {
    return (
        <div className={`${styles.activeAddButton}`}>
            <div className={`${styles.contentTop}`}>
                <button className="button-decoration1" onClick={() => setDisplay(false)}>
                    <img src="/image/systemIcon/system/disable_icon.png" width="13px" height="13px" />
                </button>
                <div>アカウント作成のお願い</div>
            </div>
            <div className={`${styles.contentWrapper}`}>
                <div>
                    <img src="https://iconbu.com/wp-content/uploads/2019/11/%E5%B7%A5%E4%BA%8B%E4%B8%AD.png" width="60px" />
                </div>
                <div className={`${styles.text}`}>
                    <p>申し訳ございません。</p>
                    <p>本機能は会員機能であるため、ご利用いただけません。</p>
                    <p>下記より無料会員登録（またはログイン）を行うことで、当サイトの会員機能を開放できます。</p>
                    <Link href="/login"><a onClick={() => setDisplay(false)} className="a-decoration1">会員登録またはログインはこちら</a></Link>
                </div>
            </div>
        </div>
    )
}
