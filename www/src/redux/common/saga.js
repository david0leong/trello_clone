import { call, put } from 'redux-saga/effects'

export default function* apiSaga(
  successAction,
  failureAction,
  apiFunc,
  ...apiParams
) {
  let response

  try {
    response = yield call(apiFunc, ...apiParams)
    const { status, data } = response

    if (status === 200) {
      if (successAction) {
        yield put(successAction(data))
      }
    } else {
      throw new Error(`The status code ${status} is not handled!`)
    }
  } catch (err) {
    if (failureAction) {
      yield put(failureAction(err))
    }
  }

  return response
}
