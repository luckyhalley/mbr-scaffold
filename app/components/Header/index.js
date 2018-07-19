import React from 'react'
import styles from './index.scss'
import Avatar from './avatar.jpeg'

class Header extends React.Component {
    render() {
        return (
            <div className={styles.header}>
                <i className={`icon-star-solid ${styles.star}`}></i>
                <span>Header url-loader测试</span>
                <i className={`icon-star-solid ${styles.star}`}></i>
                <img className ={styles.avatar} src={Avatar} alt="Avatar"/>
            </div>
        )
    }
}
export default Header