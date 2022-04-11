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
      <Head>
        <title> AnimeSearcher </title>
      </Head>
      <Layout2>
        <Component {...pageProps} />
      </Layout2>
    </>
  )
}
