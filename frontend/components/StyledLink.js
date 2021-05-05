import React from 'react'
import Link from 'next/link'
import styles from '../styles/Link.module.css'

function StyledLink({ href, text }) {
    return (
        <div className={styles.linkDiv}>
            <Link href={href}>
                {text}
            </Link>
        </div>
    )
}

export default StyledLink
