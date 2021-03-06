import { fromJS } from 'immutable'
import { GET_LIST, GET_LIST_SUCCESS } from './constants'

export const initialState = fromJS({
  list: [],
  loading: false,
  error: false
  
})

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LIST:
          return state.set('loading', true)
        case GET_LIST_SUCCESS:
          return state
            .set('loading', false)
            .set('list', action.list)
            .set('error', false)              
        default:
          return state
    }
}

export default homeReducer
