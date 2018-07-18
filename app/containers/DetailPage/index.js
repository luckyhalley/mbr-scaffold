import React from 'react'
import styles from './index.scss'
import { loadUser } from '../App/actions'
import { getDetail } from './actions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectCurrentUser } from 'containers/App/selectors'
import { makeSelectDetailState, makeSelectLoading, makeSelectError } from './selectors';
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from './saga'

class DetailPage extends React.PureComponent {
    componentWillMount() {
        this.props.getUserInfo()
    }
    render() {
        return (
            <div className={styles.container}>
                <p><label>姓名：</label><span>{this.props.info.name}</span></p>
                <p><label>性别：</label><span>{this.props.info.isMale ? "男" : "女" }</span></p>
                <p><label>城市：</label><span>{this.props.info.city}</span></p>
                <p><label>生日：</label><span>{this.props.info.birthday}</span></p>
            </div>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getUserInfo: evt => dispatch(getDetail())
    }
}

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    username: makeSelectCurrentUser(),
    info: makeSelectDetailState()
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'detail', reducer })
const withSaga = injectSaga({ key: 'detail', saga })
export default compose(
    withReducer,
    withSaga,
    withConnect,
)(DetailPage);