import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectDetail = state => state.get('detail', initialState)

const makeSelectDetailState = () => createSelector(selectDetail, detailState => detailState.get('info'))
const makeSelectLoading = () => createSelector(selectDetail, detailState => detailState.get('loading'))
const makeSelectError = () => createSelector(selectDetail, detailState => detailState.get('error'))

export {selectDetail, makeSelectDetailState, makeSelectLoading, makeSelectError}