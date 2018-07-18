/**
 * 全局 state selectors
 */
import { createSelector } from 'reselect'

/** 全局selectors **/
const selectGlobal = state => state.get('global')
/** 路由selectors **/
const selectRoute = state => state.get('route')
/** 保存在全局的state信息 **/
const makeSelectCurrentUser = () => createSelector(selectGlobal, globalState => globalState.get('username'))
/** 路由state信息 **/
const makeSelectLocation = () => createSelector(selectRoute, routeState => routeState.get('location').toJS())

export {
    selectGlobal,
    makeSelectCurrentUser,
    makeSelectLoading,
    makeSelectError,
    makeSelectLocation
}