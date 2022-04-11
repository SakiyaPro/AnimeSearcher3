import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/login.module.css"
import { refresh_access_token } from "../utils/functions";
import Cookies from "js-cookie";
import axios from 'axios'


export default function Login(props) {

    const router = useRouter();
    const [buttonState, setButtonState] = useState(1)
    const [errorState, setErrorState] = useState({})
    const loginRetention = useRef()

    useEffect(() => {
        console.log(loginRetention.current.checked);
    }, [loginRetention.current?.checked])

    // アカウント作成関数
    const accountRegist = async formEvent => {
        formEvent.preventDefault()
        try {
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
            Cookies.set("user_id", res_token.user.pk)
            Cookies.set("access_token", res_token.access_token);
            Cookies.set("refresh_token", res_token.refresh_token);

            // デフォルトプロフィール作成
            const post_profile = await fetch(
                `${process.env.NEXT_PUBLIC_DJANGO_URL}users/profile/`, {
                method: 'POST',
                headers: {
                    'Authorization': `JWT ${Cookies.get("access_token")}`,
                }
            })
            router.replace("/account/private");
        } catch (error) {
            const errorMassage = error.response.data
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
            console.log(loginRetention.current.checked);
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

                {buttonState === 1 &&
                    <form className={`${styles.loginform}`} onSubmit={login}>
                        <input id="email" type="email" className={`${styles.text}`} />
                        <span>メールアドレス</span>
                        {
                            errorState.email &&
                            <p className="errorMassage">{errorState.email[0]}</p>
                        }
                        <br />
                        <br />

                        <input id="password1" type="password" className={`${styles.text}`} ></input>
                        <span>パスワード</span>
                        {
                            errorState.password &&
                            <p className="errorMassage">{errorState.password[0]}</p>
                        }
                        <br />

                        <input type="checkbox" defaultChecked={true} ref={loginRetention} id="checkbox-1-1" className={`${styles.customCheckbox}`} />
                        <label htmlFor="checkbox-1-1">ログイン状態を保持</label>

                        <button className={`${styles.signin}`} >
                            Sign In
                        </button>
                        {
                            errorState.non_field_errors &&
                            <p className="errorMassage">{errorState.non_field_errors[0]}</p>
                        }
                    </form>
                }

                {
                    buttonState === 2 &&
                    <form className={`${styles.loginform} ${styles.registForm}`} onSubmit={accountRegist}>

                        <input id="username" type="text" className={`${styles.text}`} />
                        <span>ユーザーネーム</span>
                        {
                            errorState.username &&
                                errorState.username[0] === "この項目は空にできません。" ?
                                <p className="errorMassage" >{errorState.username[0]} </p> :
                                errorState.username &&
                                <p className="errorMassage">このユーザーネームは既に使用されています。</p>
                        }
                        <br />

                        <input id="email" type="email" className={`${styles.text}`} />
                        <span>メールアドレス</span>
                        {
                            errorState.email &&
                            <p className="errorMassage">{errorState.email[0]}</p>
                        }
                        <br />

                        <input id="password1" type="password" className={`${styles.text}`} ></input>
                        <span>パスワード</span>
                        {
                            errorState.password1 &&
                            <p className="errorMassage">{errorState.password1[0]}</p>
                        }
                        <br />

                        <input id="password2" type="password" className={`${styles.text}`} ></input>
                        <span>確認用パスワード</span>
                        {
                            errorState.password2 &&
                            <p className="errorMassage">{errorState.password2[0]}</p>
                        }
                        <br />

                        <button className={`${styles.signin}`} >
                            Sign Up
                        </button>
                    </form>
                }
            </div>
        </div>
    );
}
