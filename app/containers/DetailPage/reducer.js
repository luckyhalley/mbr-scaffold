import { fromJS } from 'immutable'
import { GET_DETAIL, GET_DETAIL_SUCCESS } from './constants'

export const initialState = fromJS({
  info: {},
  loading: false,
  error: false
})

function detailReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DETAIL:
          return state.set('loading', true)
        case GET_DETAIL_SUCCESS:
          return state
            .set('loading', false)
            .set('info', action.info)
            .set('error', false)              
        default:
          return state
    }
}

export default detailReducer
