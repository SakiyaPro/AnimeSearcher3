import React, {useState} from 'react'
import Link from 'next/link';
import { getSeasonData } from "../../lib/getAnimeData";
import { getSeasonAndYear, conversionSeasonName } from "../../utils/functions";

import ReviewStar from "../../components/item/ReviewStar";
import SearchBar from '../../components/item/SearchBar';

import InfiniteScroll from "react-infinite-scroller"


const [BEFORESEASON1, BEFOREYEAR1] = getSeasonAndYear(-3)

export default function OnePrevSeason({ onePrevSeasonData }) {
    // 無限スクロール
    const [pageOffset, setPageOffset] = useState(10)
    const [list, setList] = useState([]);          //表示するデータ
    const [hasMore, setHasMore] = useState(true);  //再読み込み判定

    const loadMore = async (page) => {
        const data = await (getSeasonData(BEFORESEASON1, BEFOREYEAR1, { offset: page })).then(
            res => {
                console.log(res);
                if (res.length < 1) {
                    setHasMore(false);
                    return;
                }
                setList([...list, ...res])
                setPageOffset(pageOffset + 10)
            }
        )
    }

    return (
        <div className="mainWrapper">
            <div className="centerWrapper">
                <div className="sectionTop">
                    <p className="sectionName">オススメ</p>
                    <div className="selectContents">
                        <Link href="/recommend/nowSeason">
                            <a className={"contentButton"}>今期アニメ</a>
                        </Link>
                        <Link href="/recommend/onePrevSeason">
                            <a className={"contentButton active"}>
                                {BEFOREYEAR1}年 {conversionSeasonName(BEFORESEASON1)}アニメ
                            </a>
                        </Link>
                        <Link href="/recommend/popularAnime">
                            <a className={"contentButton"}>
                                人気アニメ
                            </a>
                        </Link>
                    </div>
                </div>
                <section className="section">
                    {
                        onePrevSeasonData?.map((anime, i) => {
                            return (
                                <div key={i} className="sectionItem">
                                    <div>
                                        <div className="userIcon">
                                            <img src="https://maidragon.jp/news/wordpress/wp-content/uploads/2020/08/200811_icon_present01-1.png" width="48px" height="48px" />
                                        </div>
                                        <p className="userName">放送年度で検索するbot</p>
                                    </div>
                                    <Link href={`/detail/${anime.id}`} as={`/detail/${anime.id}`}><a>
                                        <article className="centerArticle">
                                            <div className="content">
                                                <h1>{anime.title}</h1>
                                                <ReviewStar datarate={anime.reviewanime_set} />
                                                <div className="imageWrapper" >
                                                    <img src={anime.image} width={504} />
                                                </div>
                                            </div>
                                        </article>
                                    </a></Link>
                                </div>
                            )
                        })
                    }
                    <InfiniteScroll
                        loadMore={() => loadMore(pageOffset)}    //項目を読み込む際に処理するコールバック関数
                        hasMore={hasMore}         //読み込みを行うかどうかの判定
                    >
                        {
                            list?.map((anime, i) => {
                                return (
                                    <div key={i} className="sectionItem">
                                        <Link href={`/detail/${anime.id}`} as={`/detail/${anime.id}`} ><a>
                                            <div>
                                                <div className="userIcon">
                                                    <img src="https://maidragon.jp/news/wordpress/wp-content/uploads/2020/08/200811_icon_present01-1.png" width="48px" height="48px" />
                                                </div>
                                                <p className="userName">放送年度で検索するbot</p>
                                            </div>
                                            <article className="centerArticle">
                                                <div className="content">
                                                    <h1>{anime.title}</h1>
                                                    <ReviewStar datarate={anime.reviewanime_set} />
                                                    <div className="imageWrapper" >
                                                        <img src={anime.image} width={504} />
                                                    </div>
                                                </div>
                                            </article>
                                        </a></Link>
                                    </div>
                                )
                            })
                        }
                    </InfiniteScroll>
                </section>
            </div>
            <div className="rightWrapper">
                <div>
                    <SearchBar />
                    <p style={{ color: '#000' }}>aaa</p>
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    // アニメデータ取得
    const onePrevSeasonData = await getSeasonData(BEFORESEASON1, BEFOREYEAR1, {offset: 0})

    return {
        props: { onePrevSeasonData },
    }
}
