import React from 'react'
import Link from 'next/link'

export default function Logo (props) {
    return (
        <>
            <Link href="/">
                <a><img src="/image/favicon/arFavicon.png" alt="AnimeSearcher" width={props.width} height={props.height}/></a>
            </Link>
        </>
    )
}
