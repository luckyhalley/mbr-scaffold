import React from 'react'
import styles from './index.scss'
import { loadUser } from '../App/actions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectCurrentUser, makeSelectLoading, makeSelectError } from 'containers/App/selectors'
import { makeSelectHomeState } from './selectors';

// import injectReducer from 'utils/injectReducer'
// import injectSaga from 'utils/injectSaga'
// import reducer from './reducer';
// import saga from './saga';


class HomePage extends React.PureComponent {
    render() {
        return (
            <div>
                <ul className={styles.items} >
                    <li className={styles.item}><input type="button" value="设置用户名" onClick={this.props.setuser}/></li>
                    <li className={styles.item}><input type="button" value="获取用户名" onClick={this.props.getusername}/></li>
                    <li className={styles.item}><input type="button" value="获取用户信息" onClick={this.props.getuser}/></li>
                    <li className={styles.item}><input type="text" placeholder="用户名" value={this.props.username} readOnly/></li>
                    <li className={styles.muitem}><textarea placeholder="用户信息"  className={styles.mutitem} readOnly/></li>
                </ul>
            </div>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getusername: evt => dispatch(loadUser(evt.target.value)),
        getuser: evt => {
            dispatch(loadUser(evt.target.value))
        }
    };
}

const mapStateToProps = createStructuredSelector({
    username: makeSelectCurrentUser(),
    info: makeSelectHomeState()
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

// const withReducer = injectReducer({ key: 'home', reducer });
// const withSaga = injectSaga({ key: 'home', saga });
export default compose(
    // withReducer,
    // withSaga,
    withConnect,
)(HomePage);