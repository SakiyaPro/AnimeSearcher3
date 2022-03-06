import Link from "next/link";
import React, { useEffect, useLayoutEffect, useGlobal, useState, useRef } from "reactn";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from 'axios'
import styles from "../styles/login.module.css"

export default function Login(props) {

    const router = useRouter();
    const profile = useRef(useGlobal("profile")[0])
    console.log(profile.current);

    // ログイン処理関数
    const login = async formEvent => {
        formEvent.preventDefault()
        const res_token = await(await axios.post(
            'http://192.168.0.13:8000/dj-rest-auth/login/',
            {
                email: formEvent.target.email.value,
                password: formEvent.target.password.value
            }
        )).data
        console.log(res_token);
        Cookies.set("user_id", res_token.user.pk)
        Cookies.set("access_token", res_token.access_token);
        Cookies.set("refresh_token", res_token.refresh_token);
        console.log(`ユーザーID: ${Cookies.get("user_id")}`);
        console.log(`アクセストークン: ${Cookies.get("access_token")}`);
        console.log(`リフレッシュトークン: ${Cookies.get("refresh_token")}`);
        router.replace("/account/private");
    }

    return (
        <div className={`${styles.loginFormWrapper}`}>
            <h1>Login</h1>
            <div className={`${styles.login}`}>
                <h2 className={`${styles.active}`}>login</h2>
                <h2 className={`${styles.nonactive}`}>sign up</h2>

                <form className={`${styles.loginform}`} onSubmit={login}>
                    <input id="email" type="email" className={`${styles.text}`} />
                    <span>e-mail</span>
                    <br />
                    <br />

                    <input id="password" type="password" className={`${styles.text}`} ></input>
                    <span>password</span>
                    <br />

                    <input type="checkbox" id="checkbox-1-1" className={`${styles.customCheckbox}`} />
                    <label htmlFor="checkbox-1-1">Keep me Signed in</label>

                    <button className={`${styles.signin}`}>
                        Sign In
                    </button>

                    <hr />

                    <a href="#">Forgot Password?</a>

                </form>
            </div>
            <div>
                <Link href="/"><a>Homeへ</a></Link>
            </div>
        </div>
    );
}
