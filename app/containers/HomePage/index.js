import React from 'react'
import styles from './index.scss'
import { loadUser } from '../App/actions'
import { getList } from './actions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { makeSelectCurrentUser } from 'containers/App/selectors'
import { makeSelectHomeState, makeSelectLoading, makeSelectError } from './selectors';
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from './saga'
import { Cookie } from 'utils/common'
import Mock from 'mockjs'
import LoadingIndicator from 'components/LoadingIndicator'

class HomePage extends React.PureComponent {
    componentWillMount() {
        let user = Mock.mock({"name": '@cname'})
        Cookie.setItem ('user', user.name)
    }
    render() {
        const { loading, error, list } = this.props
        let ListContainer = loading ? <LoadingIndicator/> : list.map((item, index) => {
            return (
                <li key={item.id}><span>用户ID: {item.id}</span><span>姓名: {item.name}</span><Link to="/detail">详细</Link></li>
            )
        })
        return (
            <div>
                <ul className={styles.items} >
                    <li className={styles.item}><input type="button" value="同步action" onClick={this.props.getName}/></li>
                    <li className={styles.item}><input type="text" placeholder="当前用户：" value={this.props.username} readOnly/></li>
                    <li className={styles.item}><input type="button" value="异步action" onClick={this.props.getList}/></li>
                </ul>
                <ul className={styles.list}>{ListContainer}</ul>
            </div>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getName: evt => dispatch(loadUser(evt.target.value)),
        getList: evt => {
            dispatch(getList())
        }
    }
}

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    username: makeSelectCurrentUser(),
    list: makeSelectHomeState()
})

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
)

const withReducer = injectReducer({ key: 'home', reducer })
const withSaga = injectSaga({ key: 'home', saga })

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HomePage)