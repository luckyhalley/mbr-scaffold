import { fromJS } from 'immutable'
import { LOAD_USER } from './constants'

const initialState = fromJS({
  username: ''
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return state
        .set('username', 'halley')
    default:
      return state
  }
}

export default appReducer
