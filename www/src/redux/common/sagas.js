import { call, put } from 'redux-saga/effects'

export function* apiSaga(successAction, failureAction, apiFunc, ...apiParams) {
  let response

  try {
    response = yield call(apiFunc, ...apiParams)
    const { data } = response

    if (successAction) {
      yield put(successAction(data))
    }
  } catch (err) {
    if (failureAction) {
      yield put(failureAction(err))
    }
  }

  return response
}
