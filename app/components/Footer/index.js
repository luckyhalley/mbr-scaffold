import React from 'react'
import styles from './index.scss'
class Footer extends React.Component {
    render() {
        return (
            <div className={styles.footer}>
                <i className={`icon-star ${styles.star}`}></i>
                <span>Footer</span>
                <i className={`icon-star ${styles.star}`}></i>
            </div>
        )
    }
}
export default Footer