import { fromJS } from 'immutable'
import { LOAD_USER } from './constants'

const initialState = fromJS({
  loading: false,
  error: false,
  username: ''
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return state
        .set('username', 'halley')
        .set('loading', true)
        .set('error', false)
    default:
      return state
  }
}

export default appReducer
