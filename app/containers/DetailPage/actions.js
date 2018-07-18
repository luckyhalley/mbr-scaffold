import { GET_DETAIL, GET_DETAIL_SUCCESS, GET_DETAIL_ERROR } from './constants'

export function getDetail() {
  return {
    type: GET_DETAIL
  }
}

export function getDetailSuccess(info) {
    return {
      type: GET_DETAIL_SUCCESS,
      info
    }
}

export function getDetailError(error) {
    return {
      type: GET_DETAIL_ERROR,
      error
    }
}


