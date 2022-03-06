import React from "react";
import Link from "next/link";
import { Logo } from "../item/Logo";
import styles from "../../styles/layout.module.css";
import { slide as Menu } from "react-burger-menu";

export default function Layout(props) {
    return (
        <div>
            <header>
                <button className={`${styles.openbtn1}`}><span></span><span></span><span></span></button>
                <Menu width="350px" className={`${styles.MenuBackground}`}>
                    <ul className={`${styles.headerContents}`}>
                        <li>
                            <h1 className={`${styles.siteLogo}`}>
                                <Logo width="200px" height="auto" />
                            </h1>
                        </li>
                        <li>
                            <form method="get" action="#" className={`${styles.searchForm}`}>
                                <input className={`${styles.searchBar}`} type="text" size="20" placeholder=" アニメを検索" />
                                <button className={`${styles.searchButton}`} type="submit"><img src="/image/systemIcon/search(white).png" width="20px" /></button>
                            </form>
                        </li>
                        <li>
                            <Link href="/">
                                <a className={`${styles.item}`}>
                                    <img src="/image/systemIcon/home.png" width="40px" />
                                    <span>ホーム</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/anime/recommend">
                                <a className={`${styles.item}`}>
                                    <img src="/image/systemIcon/recommend.png" width="40px" />
                                    <span>アニメを探す</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className={`${styles.item}`}>
                                    <img src="/image/systemIcon/review_icon.png" width="35px" />
                                    <span>レビュー</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/private">
                                <a className={`${styles.item}`}>
                                    <img src="/image/systemIcon/login_icon.png" width="35px" />
                                    <span>ログイン</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </Menu>
            </header>
            <main> {props.children} </main>
        </div>
    );
}
