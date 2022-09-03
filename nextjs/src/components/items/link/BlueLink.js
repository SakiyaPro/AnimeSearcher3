import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// CSS
import styles from 'Styles/components-css/items/link/BlueLink.module.css'

export default function BlueLink({ link, title, size }) {

    return (
        <p className={`${styles.blueLink} ${size == "normal" && styles.normal}`}>
            <Link href={link} passhref="true">
                <a>{title}</a>
            </Link>
        </p>
    )
}
