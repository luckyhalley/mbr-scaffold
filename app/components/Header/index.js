import React from 'react'
import styles from './index.scss'
class Header extends React.Component {
    render() {
        return (
            <div className={styles.header}>
                <i className={`icon-star-solid ${styles.star}`}></i>
                <span>Header</span>
                <i className={`icon-star-solid ${styles.star}`}></i>
            </div>
        )
    }
}
export default Header