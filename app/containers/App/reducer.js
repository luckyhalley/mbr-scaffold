import { fromJS } from 'immutable'
import { LOAD_USER } from './constants'
import { Cookie } from 'utils/common'

const initialState = fromJS({
  username: ''
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return state
        .set('username', Cookie.getItem('user'))
    default:
      return state
  }
}

export default appReducer
