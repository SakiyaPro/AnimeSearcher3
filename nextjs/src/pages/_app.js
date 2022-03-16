import '../styles/reset.min.css'
import '../styles/globals.css'
import 'swiper/css/bundle'

import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout2 from '../components/layout/Layout2'
import { login_request } from '../utils/functions'


export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head><title> AnimeSearcher </title>
        <meta name="description" content="おすすめアニメを検索！" />
        <link rel="icon" href="/image/favicon/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&family=Outfit&display=swap" rel="stylesheet" />
      </Head>
      <Layout2>
        <Component {...pageProps} />
      </Layout2>
    </>
  )
}
