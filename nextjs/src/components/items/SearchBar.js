import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/components-css/SearchBar.module.css'
import { getAnimeData } from '../../libs/getAnimeData'
import axios from 'axios'

export default function SearchBar() {
    const router = useRouter()

    const [keyword, setKeyword] = useState("")  //検索キーワード
    const [composition, setComposition] = useState(false) //キーワード変換中はkeyword変更が認識されないため、onCompositionUpdateを監視する
    const [searchSuggestDisplay, setSearchSuggestDisplay] = useState()  //検索サジェストディスプレイ
    const [searchSuggest, setSearchSuggest] = useState()  //検索サジェスト
    const [selectSuggest, setSelectSuggest] = useState() // 選択されたサジェスト
    const search_title = useRef()

    // 検索サジェスト機能
    useEffect(() => {
        const asyncEffect = async () => {
            if (keyword === '') return setSearchSuggest()
            setKeyword(keyword)
            const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/AnimeTitleSuggest/?title=${keyword}`)).data.results
            setSearchSuggest(res)
        }
        asyncEffect()
    }, [keyword, composition])

    // ページ遷移
    useEffect(() => {
        const pagePush = async () => {
            if (selectSuggest) {
                await router.push(`/anime/search/result?searchTitle=${selectSuggest}`)
                search_title.current?.value = selectSuggest
                if (router.pathname == "/anime/search/result") {
                    router.reload()
                }
            }
        }
        pagePush()
    }, [selectSuggest])

    useEffect(() => {
        if (router?.query.searchTitle) {
            search_title.current?.value = router.query.searchTitle
        }
    }, [])

    const handleChange = async (e) => {
        setKeyword(() => e.target.value);
    }

    const compositionChange = async () => {
        setComposition(!composition)
    }
    return (
        <>
            {/* form[action] と input[name] で /anime/search/result にクエリ文字列を送信する */}
            <form method="get" action={`/anime/search/result`} className={`${styles.searchForm}`}>
                <input className={`${styles.searchBar}`} name="searchTitle" onChange={handleChange} onCompositionUpdate={compositionChange}
                    ref={search_title} type="text" placeholder="アニメを検索" onFocus={() => setSearchSuggestDisplay(true)} onBlur={() => setSearchSuggestDisplay(false)} autoComplete="off" />
                {
                    searchSuggestDisplay && searchSuggest &&
                    <div className="searchSuggest" >
                        <p>検索候補:</p>
                        {
                            searchSuggest.map((suggest, i) => {
                                return (
                                    <div key={i} onMouseDown={() => { setSelectSuggest(suggest.title) }}>
                                        <button>{suggest.title}</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <img className={`${styles.searchIcon}`} src="/image/systemIcon/system/search_icon.png" width="21px" alt="" />
            </form>
        </>
    )
}
