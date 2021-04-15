import React from 'react'
import styles from '../../styles/Input.module.css'

function Input({ type, placeholder, value, onChange, color}) {
    return (
        <div>
            <input 
                className={styles.input_comp}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{backgroundColor:color}}
            />
        </div>
    )
}

export default Input
