import Cookies from 'js-cookie'
import React, { useEffect, useContext } from 'react'
import styles from '../../styles/components-css/BarGraph.module.css'

export default function BarGraph({ reviewanime_set }) {
    // cssに指定している.bar_nameのwidthを指定する。
    const bar_name_width = "160px"
    const graphParam = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
    const fontColor = { "1": "#fff", "2": "#fff", "3": "#fff", "4": "#fff", "5": "#fff" }
    const backgroundColor = { "1": "rgb(54, 165, 255)", "2": "#59b3fc", "3": "#6bb6ff", "4": "#a9d8ff", "5":"#c8e4ff" }
    if (reviewanime_set) {
        reviewanime_set.map((review) => {
            graphParam[review.star] += 1
            if (review.user.toFixed() === Cookies.get("user_id")) {
                fontColor[review.star.toFixed()] = "#000"
                backgroundColor[review.star.toFixed()] = "#FFD523"
            }
        })
        const total = Object.values(graphParam).reduce((sum, element) => { return sum + element })
        if (graphParam["1"]) {
            graphParam["1"] = graphParam["1"] / total
        }
        if (graphParam["2"]) {
            graphParam["2"] = graphParam["2"] / total
        } if (graphParam["3"]) {
            graphParam["3"] = graphParam["3"] / total
        } if (graphParam["4"]) {
            graphParam["4"] = graphParam["4"] / total
        } if (graphParam["5"]) {
            graphParam["5"] = graphParam["5"] / total
        }
    }

    const animeId = reviewanime_set[0]?.anime
    const bar1width = graphParam["5"]
    const bar2width = graphParam["4"]
    const bar3width = graphParam["3"]
    const bar4width = graphParam["2"]
    const bar5width = graphParam["1"]

    // 横棒グラフのキーフレームアニメーション５つ
    const keyframes_show_bar1 = (
        <style>
            {`@keyframes show-bar-one-${animeId} {
                    0% { width: 0; }
                    100% { width: calc((100% - 5% - ${bar_name_width}) * ${bar1width}); }
                }
            `}
        </style>
    );
    const keyframes_show_bar2 = (
        <style>
            {`@keyframes show-bar-two-${animeId} {
                    0% { width: 0; }
                    100% { width: calc((100% - 5% - ${bar_name_width}) * ${bar2width}); }
                }
            `}
        </style>
    );
    const keyframes_show_bar3 = (
        <style>
            {`@keyframes show-bar-three-${animeId} {
                    0% { width: 0; }
                    100% { width: calc((100% - 5% - ${bar_name_width}) * ${bar3width}); }
                }
            `}
        </style>
    );
    const keyframes_show_bar4 = (
        <style>
            {`@keyframes show-bar-four-${animeId} {
                    0% { width: 0; }
                    100% { width: calc((100% - 5% - ${bar_name_width}) * ${bar4width}); }
                }
            `}
        </style>
    );
    const keyframes_show_bar5 = (
        <style>
            {`@keyframes show-bar-five-${animeId} {
                    0% { width: 0; }
                    100% { width: calc((100% - 5% - ${bar_name_width}) * ${bar5width}); }
                }
            `}
        </style>
    );

    return (
        <div className={`${styles.bar_graph} ${styles.bar_graph_horizontal} ${styles.bar_graph_one}`}>
            {keyframes_show_bar1}
            {keyframes_show_bar2}
            {keyframes_show_bar3}
            {keyframes_show_bar4}
            {keyframes_show_bar5}
            <div className={`${styles.bar_one} ${styles.bar_box}`}>
                <div className={`${styles.bar_name}`}>神アニメ！</div>
                <div className={`${styles.bar}`} style={{
                    color: fontColor["5"],
                    backgroundColor: backgroundColor["5"],
                    animation: `show-bar-one-${animeId} 1.2s 0.4s forwards`
                }} ></div>
                <div className={`${styles.voteText}`} text={`${bar1width * 100}%`}></div>
            </div>
            <div className={`${styles.bar_two} ${styles.bar_box}`}>
                <div className={`${styles.bar_name}`}>かなり面白い</div>
                <div className={`${styles.bar}`}
                    style={{
                        color: fontColor["4"],
                        backgroundColor: backgroundColor["4"],
                        animation: `show-bar-two-${animeId} 1.2s 0.4s forwards`
                    }}></div>
                <div className={`${styles.voteText}`} text={`${bar2width * 100}%`}></div>
            </div>
            <div className={`${styles.bar_three} ${styles.bar_box}`}>
                <div className={`${styles.bar_name}`}>普通に面白い</div>
                <div className={`${styles.bar}`} style={{
                    color: fontColor["3"],
                    backgroundColor: backgroundColor["3"],
                    animation: `show-bar-three-${animeId} 1.2s 0.4s forwards`
                }} ></div>
                <div className={`${styles.voteText}`} text={`${bar3width * 100}%`}></div>
            </div>
            <div className={`${styles.bar_four} ${styles.bar_box}`}>
                <div className={`${styles.bar_name}`}>ギリギリ観れた</div>
                <div className={`${styles.bar}`} style={{
                    color: fontColor["2"],
                    backgroundColor: backgroundColor["2"],
                    animation: `show-bar-four-${animeId} 1.2s 0.4s forwards`
                }}></div>
                <div className={`${styles.voteText}`} text={`${bar4width * 100}%`}></div>
            </div>
            <div className={`${styles.bar_five} ${styles.bar_box}`}>
                <div className={`${styles.bar_name}`}>視聴断念・・・</div>
                <div className={`${styles.bar}`} style={{
                    color: fontColor["1"],
                    backgroundColor: backgroundColor["1"],
                    animation: `show-bar-five-${animeId} 1.2s 0.4s forwards`
                }} ></div>
                <div className={`${styles.voteText}`} text={`${bar5width * 100}%`}></div>
            </div>
        </div>
    )
}
