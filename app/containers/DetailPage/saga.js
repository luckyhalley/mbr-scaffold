import { call, put, select, takeLatest } from 'redux-saga/effects'
import { GET_DETAIL, GET_DETAIL_SUCCESS, GET_DETAIL_ERROR } from './constants'
import { getDetailSuccess, getDetailError } from './actions'
import { API } from 'utils/constants'

export function* getDetail() {
    try {
        let response = yield fetch(API.GET_USER_INFO, { method: 'get' }).then(data => data.json())
        yield put(getDetailSuccess(response.data));
    } catch (err) {
      yield put(getDetailError(err));
    }
}

export default function* gitDetailSaga() {
    yield takeLatest(GET_DETAIL, getDetail);
}