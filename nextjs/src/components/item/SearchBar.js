import React, { useState, useEffect, useRef } from 'react'
import styles from '../../styles/components-css/SearchBar.module.css'
import { getAnimeData } from '../../lib/getAnimeData'
import axios from 'axios'

export default function SearchBar({ size, setSearchResult,  }) {
    const [keyword, setKeyword] = useState("")  //検索キーワード
    const [composition, setComposition] = useState(false) //キーワード変換中はkeyword変更が認識されないため、onCompositionUpdateを監視する
    const [searchSuggest, setSearchSuggest] = useState()  //検索サジェスト
    const search_title = useRef()

    // 検索サジェスト機能
    useEffect(() => {
        const asyncEffect = async () => {
            if (keyword === '') return setSearchSuggest()
            setKeyword(keyword)
            const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/titlesuggest/?title=${keyword}`)).data.results
            setSearchSuggest(res)
        }
        asyncEffect()
    }, [keyword, composition])

    const getSearchResult = async () => {
        const res = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}api/animedata/?title_contains=${search_title.current.value
            }&watchersCount_max=true`)).data.results
        if (res[0]) {
            setSearchResult(res)
        } else {
            setSearchResult("no result")
        }
    }

    const handleChange = async (e) => {
        setKeyword(() => e.target.value);
    }

    const compositionChange = async () => {
        setComposition(!composition)
    }
    return (
        <>
            <form onSubmit={getSearchResult} method="get" action="#" className={`${styles.searchForm}`}>
                <input className={`${styles.searchBar}`} onChange={handleChange} onCompositionUpdate={compositionChange}
                    ref={search_title} type="text" size={size ? size : 26} placeholder="アニメを検索" />
                <img className={`${styles.searchIcon}`} src="/image/systemIcon/system/search_icon.png" width="21px" alt="" />
            </form>
            {
                searchSuggest &&
                <div className="searchSuggest">
                    検索候補:
                    {searchSuggest.map((suggest, i) => {
                        return (
                            <div key={i}>
                                <button onClick={() => { search_title.current.value = suggest.title; setSearchSuggest(""); getSearchResult() }}>{suggest.title}</button>
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}
