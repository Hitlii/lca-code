import React from 'react'
import styles from '../../styles/Button.module.css'

function Button({ color, text, onClick }) {
    return (
        <div>
            <button
                className={styles.btn}
                onClick={onClick}
                style={{backgroundColor:color}}
            >
                {text}
            </button>
        </div>
    )
}

export default Button