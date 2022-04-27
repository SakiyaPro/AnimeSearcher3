import React, { useState, useEffect } from 'react'
import styles from '../../styles/components-css/BarGraph.module.css'
import { login_request, post_or_update_review } from '../../utils/functions'
import LoginRequest from '../view/LoginRequest'

import Cookies from 'js-cookie'
import axios from 'axios'


export default function BarGraph({ animeId, reviewanime_set }) {
    const [display, setDisplay] = useState(false)
    const [postStar, setPostStar] = useState()
    const [userReview, setUserReview] = useState(false)
    const [LoginState, setLoginState] = useState()

    useEffect(() => {
        setLoginState(login_request())
    }, [])

    useEffect(() => {
        if (postStar) {
            post_or_update_review(userReview, animeId, postStar)
        }
    }, [userReview, animeId, postStar])

    // cssに指定している.bar_nameのwidthを指定する。
    const bar_name_width = "0px"
    const [graphParam, setGraphParam] = useState({ "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 })
    const [fontColor, setFontColor] = useState({ "1": false, "2": false, "3": false, "4": false, "5": false })
    const [backgroundColor, setBackgroundColor] = useState({ "1": false, "2": false, "3": false, "4": false, "5": false })

    useEffect(() => {
        if (reviewanime_set) {
            reviewanime_set.map((review) => {
                graphParam[review.star] += 1
                if (review.user.toString(10) === Cookies.get("user_id")) {
                    setUserReview(review.id)

                    const resultFontColor = { ...fontColor }
                    resultFontColor[`${review.star}`] = "#000";
                    setFontColor(resultFontColor)

                    const resultBackgroundColor = { ...backgroundColor }
                    resultBackgroundColor[`${review.star}`] = "#FFD523";
                    setBackgroundColor(resultBackgroundColor)
                }
            })
            const total = Object.values(graphParam).reduce((sum, element) => { return sum + element })
            const resultGraphParam = { ...graphParam }
            if (resultGraphParam["1"]) {
                resultGraphParam["1"] = resultGraphParam["1"] / total
            }
            if (resultGraphParam["2"]) {
                resultGraphParam["2"] = resultGraphParam["2"] / total
            } if (resultGraphParam["3"]) {
                resultGraphParam["3"] = resultGraphParam["3"] / total
            } if (resultGraphParam["4"]) {
                resultGraphParam["4"] = resultGraphParam["4"] / total
            } if (resultGraphParam["5"]) {
                resultGraphParam["5"] = resultGraphParam["5"] / total
            }
            setGraphParam(resultGraphParam)
        }
    }, [])

    const bar1width = graphParam["5"]
    const bar2width = graphParam["4"]
    const bar3width = graphParam["3"]
    const bar4width = graphParam["2"]
    const bar5width = graphParam["1"]
    const defaultWidth = "10px"

    // 横棒グラフのキーフレームアニメーション５つ
    const keyframes_show_bar1 = (
        <style>
            {`@keyframes show-bar-one-${animeId} {
                    0% { width: ${defaultWidth}; }
                    100% { width: calc((100% - ${bar_name_width}) * ${bar1width} + ${defaultWidth}); }
                }
            `}
        </style>
    );
    const keyframes_show_bar2 = (
        <style>
            {`@keyframes show-bar-two-${animeId} {
                    0% { width: ${defaultWidth}; }
                    100% { width: calc((100% - ${bar_name_width}) * ${bar2width} + ${defaultWidth}); }
                }
            `}
        </style>
    );
    const keyframes_show_bar3 = (
        <style>
            {`@keyframes show-bar-three-${animeId} {
                    0% { width: ${defaultWidth}; }
                    100% { width: calc((100% - ${bar_name_width}) * ${bar3width} + ${defaultWidth}); }
                }
            `}
        </style>
    );
    const keyframes_show_bar4 = (
        <style>
            {`@keyframes show-bar-four-${animeId} {
                    0% { width: ${defaultWidth}; }
                    100% { width: calc((100% - ${bar_name_width}) * ${bar4width} + ${defaultWidth}); }
                }
            `}
        </style>
    );
    const keyframes_show_bar5 = (
        <style>
            {`@keyframes show-bar-five-${animeId} {
                    0% { width: ${defaultWidth}; }
                    100% { width: calc((100% - ${bar_name_width}) * ${bar5width} + ${defaultWidth}) ; }
                }
            `}
        </style>
    );

    return (
        <>
            <div className={`${styles.bar_graph} ${styles.bar_graph_horizontal} ${styles.bar_graph_one}`}>
                {keyframes_show_bar1}
                {keyframes_show_bar2}
                {keyframes_show_bar3}
                {keyframes_show_bar4}
                {keyframes_show_bar5}
                <div onClick={() => { !LoginState && setDisplay(true), LoginState && setPostStar(5)}} className={`${styles.bar_one} ${styles.bar_box}`}>
                    <div className={`${styles.bar_name}`}>神アニメ！</div>
                    {
                        fontColor["5"] ?
                            <div className={`${styles.bar}`} style={{
                                color: fontColor["5"],
                                backgroundColor: backgroundColor["5"],
                                animation: `show-bar-one-${animeId} 1.2s forwards`
                            }} ></div>
                            :
                            <div className={`${styles.bar}`} style={{
                                color: "#000",
                                backgroundColor: "rgb(54, 165, 255)",
                                animation: `show-bar-one-${animeId} 1.2s forwards`
                            }} ></div>
                    }
                    <div className={`${styles.voteText}`} text={`${bar1width * 100}%`}></div>
                </div>
                <div onClick={() => { !LoginState && setDisplay(true), LoginState && setPostStar(4)}} className={`${styles.bar_two} ${styles.bar_box}`}>
                    <div className={`${styles.bar_name}`}>かなり面白い</div>
                    {
                        fontColor["4"] ?
                            <div className={`${styles.bar}`} style={{
                                color: fontColor["4"],
                                backgroundColor: backgroundColor["4"],
                                animation: `show-bar-two-${animeId} 1.2s forwards`
                            }} ></div>
                            :
                            <div className={`${styles.bar}`} style={{
                                color: "#000",
                                backgroundColor: "rgb(54, 165, 255)",
                                animation: `show-bar-two-${animeId} 1.2s forwards`
                            }} ></div>
                    }
                    <div className={`${styles.voteText}`} text={`${bar2width * 100}%`}></div>
                </div>
                <div onClick={() => { !LoginState && setDisplay(true), LoginState && setPostStar(3)}} className={`${styles.bar_three} ${styles.bar_box}`}>
                    <div className={`${styles.bar_name}`}>普通に面白い</div>
                    {
                        fontColor["3"] ?
                            <div className={`${styles.bar}`} style={{
                                color: fontColor["3"],
                                backgroundColor: backgroundColor["3"],
                                animation: `show-bar-three-${animeId} 1.2s forwards`
                            }} ></div>
                            :
                            <div className={`${styles.bar}`} style={{
                                color: "#000",
                                backgroundColor: "rgb(54, 165, 255)",
                                animation: `show-bar-three-${animeId} 1.2s forwards`
                            }} ></div>
                    }
                    <div className={`${styles.voteText}`} text={`${bar3width * 100}%`}></div>
                </div>
                <div onClick={() => { !LoginState && setDisplay(true), LoginState && setPostStar(2)}} className={`${styles.bar_four} ${styles.bar_box}`}>
                    <div className={`${styles.bar_name}`}>ギリギリ観れた</div>
                    {
                        fontColor["2"] ?
                            <div className={`${styles.bar}`} style={{
                                color: fontColor["2"],
                                backgroundColor: backgroundColor["2"],
                                animation: `show-bar-four-${animeId} 1.2s forwards`
                            }} ></div>
                            :
                            <div className={`${styles.bar}`} style={{
                                color: "#000",
                                backgroundColor: "rgb(54, 165, 255)",
                                animation: `show-bar-four-${animeId} 1.2s forwards`
                            }} ></div>
                    }
                    <div className={`${styles.voteText}`} text={`${bar4width * 100}%`}></div>
                </div>
                <div onClick={() => { !LoginState && setDisplay(true), LoginState && setPostStar(1)  }} className={`${styles.bar_five} ${styles.bar_box}`}>
                    <div className={`${styles.bar_name}`}>視聴断念・・・</div>
                    {
                        fontColor["1"] ?
                            <div className={`${styles.bar}`} style={{
                                color: fontColor["1"],
                                backgroundColor: backgroundColor["1"],
                                animation: `show-bar-five-${animeId} 1.2s forwards`
                            }} ></div>
                            :
                            <div className={`${styles.bar}`} style={{
                                color: "#000",
                                backgroundColor: "rgb(54, 165, 255)",
                                animation: `show-bar-five-${animeId} 1.2s forwards`
                            }} ></div>
                    }
                    <div className={`${styles.voteText}`} text={`${bar5width * 100}%`}></div>
                </div>
                {!LoginState && display &&
                    <>
                        <div onClick={() => setDisplay(false)} className="displayBackground" >
                        </div>
                        <LoginRequest setDisplay={setDisplay} />
                    </>
                }
            </div>
        </>
    )
}
