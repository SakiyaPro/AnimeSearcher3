import '../styles/reset.min.css'
import '../styles/globals.css'
import 'swiper/css/bundle'

import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { setGlobal } from "reactn"
import Layout from 'Comps/layout/Layout'
import CustomHead from 'Comps/layout/CustomHead';
// Utils
import { getLoginState } from 'Utils/functions/getLoginState';
import { hasStaffParmission } from 'Utils/functions/hasStaffParmission';
import Cookies from 'js-cookie';
import axios from 'axios';


export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // グルーバルステート
    setGlobal(async () => {
      const state = {
        LoginState: getLoginState(),
        StaffParmission: await hasStaffParmission()
      }
      return state
    })
  })

  return (
    <>
      {
        !(router.pathname.match(/\/anime\/detail.*/)) &&
        <CustomHead />
      }
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
