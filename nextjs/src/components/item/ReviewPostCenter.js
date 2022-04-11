import React, { useState, useEffect, useRef } from 'react'
import styles from '../../styles/components-css/ReviewPostCenter.module.css'
import { login_request, post_or_update_review } from '../../utils/functions'
import axios from 'axios'

export default function ReviewPostCenter({ animeTitle }) {
    // user
    const [userIcon, setUserIcon] = useState()
    // 検索
    const [revalidate, setRevalidate] = useState()
    const [keyword, setKeyword] = useState("")  //検索キーワード
    const [composition, setComposition] = useState(false) //キーワード変換中は認識されないため、onCompositionUpdateを監視する
    const [searchSuggest, setSearchSuggest] = useState()  //検索サジェスト
    const review_title = useRef()
    const review_textarea = useRef()
    // POST
    const [postStar, setPostStar] = useState()

    // ユーザーアイコンを取得
    useEffect(() => {
        if (login_request()) {
            setUserIcon(localStorage.getItem("user_icon"))
        }
        if (animeTitle) {
            setKeyword(animeTitle)
            review_title.current.value = animeTitle
        }
    }, [animeTitle])

    useEffect(() => {
        console.log(review_title.current?.value);
    }, [review_title])

    // 検索サジェスト機能
    useEffect(() => {
        const asyncEffect = async () => {
            if (keyword === '') return setSearchSuggest()
            const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/titlesuggest/?title=${keyword}`)).data.results
            setSearchSuggest(res)
        }
        asyncEffect()
    }, [keyword, composition])

    const revalidate_keyword = async () => {
        if (!review_title.current.value) {
            return false
        }
        const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?title=${review_title.current.value
            }`)).data.results[0]
        if (res) {
            if (postStar) {
                return true
            }
        }
        return false
    }

    useEffect(() => {
        const asyncEffect = async() => {
            setRevalidate(await revalidate_keyword().then(res => res))
        }
        asyncEffect()
    }, [review_title.current?.value, () => revalidate_keyword, postStar])

    const handleChange = async (e) => {
        setKeyword(() => e.target.value);
    }

    const compositionChange = async (e) => {
        setComposition(!composition)
    }
    return (
        <div className="sectionReviewItem">
            <div className="user_icon">
                <img src={userIcon} alt="" />
            </div>
            <article className="centerArticle">
                <div className="textArea">
                    <form>
                        <input onChange={handleChange}
                            onCompositionUpdate={compositionChange}
                            type="text" ref={review_title} size="42" defaultValue={animeTitle && animeTitle} placeholder="タイトルを選択" required />
                    </form>
                    {
                        searchSuggest &&
                        <div className="searchSuggest">
                            検索候補:
                            {searchSuggest.map((suggest, i) => {
                                return (
                                    <div key={i}>
                                        <button onClick={() => { review_title.current.value = suggest.title; setSearchSuggest(""); }}>{suggest.title}</button>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <div className="starButton">
                        <button onClick={() => setPostStar(5)} className={postStar === 5 ? "active" : ""}>神アニメ！</button>
                        <button onClick={() => setPostStar(4)} className={postStar === 4 ? "active" : ""}>かなり面白い</button>
                        <button onClick={() => setPostStar(3)} className={postStar === 3 ? "active" : ""}>普通に面白い</button>
                        <button onClick={() => setPostStar(2)} className={postStar === 2 ? "active" : ""}>ギリギリ観れた</button>
                        <button onClick={() => setPostStar(1)} className={postStar === 1 ? "active" : ""}>視聴断念・・・</button>
                    </div>
                    <form>
                        <textarea type="text" ref={review_textarea} wrap="hard" cols="53" placeholder="アニメレビューを投稿" required >
                        </textarea>
                    </form>
                </div>
                <div className={`${styles.bottomItemWrapper}`}>
                    <div></div>
                    <div>
                        {
                            revalidate ?
                                <button onClick={() => post_or_update_review(false, false, postStar, review_textarea.current.value, review_title.current.value)} className="tweetItem tweetItemSmall active">
                                    レビューする
                                </button> :
                                <button className="tweetItem tweetItemSmall">
                                    レビューする
                                </button>
                        }
                    </div>
                </div>
            </article>
        </div>
    )
}
