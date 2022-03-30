import '../styles/reset.min.css'
import '../styles/globals.css'
import 'swiper/css/bundle'

import React, { useEffect } from "react";
import { setGlobal } from "reactn"
import { useRouter } from "next/router";
import Head from "next/head";
import Layout2 from '../components/layout/Layout2'
import { getSeasonAndYear, login_request } from '../utils/functions';
import { getAllGenre } from '../lib/getGenreData';


export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    // global state
    setGlobal(() => {
      const state = {
        LoginState: login_request(),
        BEFORESEASON1: getSeasonAndYear(-3)[0],
        BEFOREYEAR1: getSeasonAndYear(-3)[1]
      }
      return state
    })
  }, [])

  return (
    <>
      <Layout2>
        <Head><title> AnimeSearcher </title>
          <meta name="description" content="おすすめアニメを検索！" />
          <link rel="icon" href="/image/favicon/favicon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&family=Outfit&display=swap" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
      </Layout2>
    </>
  )
}
