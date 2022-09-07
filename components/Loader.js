import React from 'react'
import styles from '../styles/Loader.module.css'

export default function Loader() {
    return (
        <div style={{ 'textAlign': 'center' }}>
            <h2 >Loading ...</h2>
            <div className={styles.loader}></div>
        </div>

    )
}
