import 'whatwg-fetch'
import { put, takeLatest } from 'redux-saga/effects'
import { GET_LIST } from './constants'
import { getListSuccess, getListError } from './actions'
import { API } from 'utils/constants'

export function* getList() {
    try {
        let response = yield fetch(API.GET_LIST, { method: 'get' }).then(data => data.json())
        yield put(getListSuccess(response.data))
    } catch (err) {
      yield put(getListError(err))
    }
}

export default function* gitListSaga() {
    yield takeLatest(GET_LIST, getList)
}