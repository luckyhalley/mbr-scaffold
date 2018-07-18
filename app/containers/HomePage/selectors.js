import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectHome = state => state.get('home', initialState)

const makeSelectHomeState = () => createSelector(selectHome, homeState => homeState.get('list'))
const makeSelectLoading = () => createSelector(selectHome, homeState => homeState.get('loading'))
const makeSelectError = () => createSelector(selectHome, homeState => homeState.get('error'))

export {selectHome, makeSelectHomeState, makeSelectLoading, makeSelectError}