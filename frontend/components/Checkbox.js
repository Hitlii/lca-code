import React from 'react'
import styles from '../styles/Checkbox.module.css'

function Checkbox ({ label, value, onChange }) {
  return (
        <div>
            <label className={styles.chk_box_label}>
                <input
                    className={styles.chk_box}
                    type='checkbox'
                    value={value}
                    onChange={onChange}
                />
                {label}
            </label>
        </div>
  )
}

export default Checkbox
