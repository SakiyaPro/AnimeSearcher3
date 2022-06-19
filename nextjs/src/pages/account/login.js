import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/login.module.css"
import { refresh_access_token } from "../../utils/functions";
import Cookies from "js-cookie";
import axios from 'axios'


export default function Login(props) {

    const router = useRouter();
    const [buttonState, setButtonState] = useState(1)
    const [verificationEmail, setVerificationEmail] = useState()
    const [verificationMessage, setVerificationMessage] = useState(false)
    const [accountRegistSubmit, setAccountRegistSubmit] = useState(false)
    const [errorState, setErrorState] = useState({})
    const loginRetention = useRef()

    // アカウント作成関数
    const accountRegist = async formEvent => {
        formEvent.preventDefault()
        try {
            setAccountRegistSubmit(true)
            // アカウント作成
            const res_token = await (await axios.post(
                `${process.env.NEXT_PUBLIC_DJANGO_URL}dj-rest-auth/registration/`,
                {
                    username: formEvent.target.username.value,
                    email: formEvent.target.email.value,
                    password1: formEvent.target.password1.value,
                    password2: formEvent.target.password2.value,
                }
            )).data

            setVerificationEmail(formEvent.target.email.value)
            setVerificationMessage(true)

            /* // デフォルトプロフィール作成
            const post_profile = await fetch(
                `${process.env.NEXT_PUBLIC_DJANGO_URL}users/profile/`, {
                method: 'POST',
                headers: {
                    'Authorization': `JWT ${Cookies.get("access_token")}`,
                }
            })
            router.replace("/account/private"); */
        } catch (error) {
            setAccountRegistSubmit(false)
            const errorMassage = error.response?.data
            if (errorMassage) {
                setErrorState({})
                setErrorState({ ...errorState, ...errorMassage })
            }
        }
    }

    // ログイン処理関数
    const login = async formEvent => {
        formEvent.preventDefault()
        try {
            const res_token = await (await axios.post(
                `${process.env.NEXT_PUBLIC_DJANGO_URL}dj-rest-auth/login/`,
                {
                    email: formEvent.target.email.value,
                    password: formEvent.target.password1.value
                }
            )).data
            Cookies.set("user_id", res_token.user.pk)
            Cookies.set("access_token", res_token.access_token);
            Cookies.set("refresh_token", res_token.refresh_token);
            if (loginRetention.current.checked) {
                Cookies.set("loginRetention", "true")
            }
            router.replace("/account/private");
        } catch (error) {
            const errorMassage = error.response.data
            if (errorMassage) {
                setErrorState({})
                setErrorState({ ...errorState, ...errorMassage })
            }
        }
    }

    return (
        <div className={`${styles.loginFormWrapper}`}>
            <div className={`${styles.login}`}>
                {
                    buttonState === 1 ?
                        <h2 className={`${styles.active}`}><button onClick={() => setButtonState(1)}>ログイン</button></h2> :
                        <h2 className={`${styles.nonactive}`}><button onClick={() => setButtonState(1)}>ログイン</button></h2>
                }

                {
                    buttonState === 2 ?
                        <h2 className={`${styles.active}`}><button onClick={() => setButtonState(2)}>アカウント作成</button></h2> :
                        <h2 className={`${styles.nonactive}`}><button onClick={() => setButtonState(2)}>アカウント作成 </button></h2>
                }

                {
                    buttonState === 1 &&
                    <form className={`${styles.loginform}`} onSubmit={login}>
                        <input id="email" autoComplete="email" type="email" className={`${styles.text}`} />
                        <span>メールアドレス</span>
                        {
                            errorState.email &&
                            <p className="errorMassage">{errorState.email[0]}</p>
                        }
                        <br />
                        <br />

                        <input id="password1" autoComplete="current-password" type="password" className={`${styles.text}`} ></input>
                        <span>パスワード</span>
                        {
                            errorState.password &&
                            <p className="errorMassage">{errorState.password[0]}</p>
                        }
                        <br />
                        <br />

                        <input type="checkbox" defaultChecked={true} ref={loginRetention} id="checkbox-1-1" className={`${styles.customCheckbox}`} />
                        <label htmlFor="checkbox-1-1">ログイン状態を保持</label>
                        <br />
                        <br />

                        <button className={`${styles.signin}`} >
                            ログインする
                        </button>
                        {
                            errorState.non_field_errors &&
                            <p className="errorMassage">{errorState.non_field_errors[0]}</p>
                        }
                    </form>
                }

                {
                    buttonState === 2 && !verificationMessage && !verificationEmail ?
                        <form className={`${styles.loginform} ${styles.registForm}`} onSubmit={accountRegist}>

                            <input id="username" autoComplete="username" type="text" className={`${styles.text}`} />
                            <span>ユーザーネーム</span>
                            {
                                errorState.username &&
                                    errorState.username[0] === "この項目は空にできません。" ?
                                    <p className="errorMassage" >{errorState.username[0]} </p> :
                                    errorState.username &&
                                    <p className="errorMassage">このユーザーネームは既に使用されています。</p>
                            }
                            <br />
                            <br />

                            <input id="email" autoComplete="email" type="email" className={`${styles.text}`} />
                            <span>メールアドレス</span>
                            {
                                errorState.email &&
                                <p className="errorMassage">{errorState.email[0]}</p>
                            }
                            <br />
                            <br />

                            <input id="password1" autoComplete="new-password" type="password" className={`${styles.text}`} ></input>
                            <span>パスワード</span>
                            {
                                errorState.password1 &&
                                <p className="errorMassage">{errorState.password1[0]}</p>
                            }
                            <br />
                            <br />

                            <input id="password2" autoComplete="new-password" type="password" className={`${styles.text}`} ></input>
                            <span>確認用パスワード</span>
                            {
                                errorState.password2 &&
                                <p className="errorMassage">{errorState.password2[0]}</p>
                            }
                            <br />
                            <br />

                            {
                                accountRegistSubmit ?
                                    <div className={`${styles.loader}`}></div> :
                                    <button className={`${styles.signin}`} >
                                        本人確認メールを受け取る
                                    </button>
                            }
                        </form> :
                        buttonState === 2 &&
                        <div className={`${styles.verificationMessage}`}>
                            <p>{verificationEmail}</p>
                            <br />
                            <br />
                            <p>上記Emailに本人確認メールを送信しました。</p>
                            <p>メールの内容に従い、本人確認作業を行ってください。</p>
                            <br />
                            <p>※本人確認を終えるまで、アカウント作成へのログインは行えません</p>
                            <br />
                            <br />
                            <p>数分待っても、メールが受信できない場合は</p>
                            <br />
                            <p>AnimeSearcher@gmail.com</p>
                            <br />
                            <p>までご連絡ください。</p>
                        </div>
                }
            </div>
        </div>
    );
}
