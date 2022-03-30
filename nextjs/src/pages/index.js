import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReviewPostCenter from '../components/item/ReviewPostCenter';
import ReviewSectionItem from '../components/item/ReviewSectionItem';
import { login_request } from '../utils/functions';
import axios from 'axios'


export default function Home({ reviewData }) {
    const [LoginState, setLoginState] = useState()

    useEffect(() => {
        setLoginState(login_request())
    }, [login_request])

    return (
        <>
            <div className="sectionTop">
                <Link href="/" passhref="true"><a className="sectionName">ホーム</a></Link>
            </div>
            <section className="section">
                {
                    LoginState &&
                    <ReviewPostCenter />
                }
                {
                    reviewData?.map((review, i) => {
                        return (
                            <div key={i} className="sectionItem">
                                <ReviewSectionItem review={review} />
                            </div>
                        )
                    })
                }
            </section>
        </>
    );
};

export async function getStaticProps() {
    const reviewData = await (await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_URL}users/review_anime/`)).data.results

    return {
        props: { reviewData },
    }
}
