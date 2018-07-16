import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectHome = state => state.get('home', initialState)

const makeSelectHomeState = () => createSelector(selectHome, homeState => homeState.get('info'))

export {selectHome, makeSelectHomeState}