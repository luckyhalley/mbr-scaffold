import { GET_LIST, GET_LIST_SUCCESS, GET_LIST_ERROR } from './constants'

export function getList() {
  return {
    type: GET_LIST
  }
}

export function getListSuccess(list) {
    return {
      type: GET_LIST_SUCCESS,
      list
    }
}

export function getListError(error) {
    return {
      type: GET_LIST_ERROR,
      error
    }
}


