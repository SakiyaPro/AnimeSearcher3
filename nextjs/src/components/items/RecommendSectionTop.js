import React from 'react'
import Link from 'next/link';

export default function RecommendSectionTop() {
    return (
        <div className="sectionTop">
            <Link href="/recommend/nowSeason"><a className="sectionName" passhref="true" >今期アニメ</a></Link>
            <div>
                <button className="threeDots">
                    <img src="/image/systemIcon/system/three-dots.png" width="23x" alt="メニュー" />
                </button>
            </div>
        </div>
    )
}
