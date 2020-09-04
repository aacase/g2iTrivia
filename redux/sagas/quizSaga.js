import { call, put, takeEvery} from 'redux-saga/effects'
import {getQuizQuestions} from '../../services/QuizService'

// worker Saga: will be fired on START_QUIZ actions
function* fetchQuestions() {
   try {
      const questions = yield call(getQuizQuestions);
      yield put({type: "QUESTIONS_FETCH_SUCCEEDED", payload: questions});
   } catch (e) {
      yield put({type: "QUESTIONS_FETCH_FAILED", message: e.message});
   }
}


function* quizSaga() {
  yield takeEvery("START_QUIZ", fetchQuestions);
}

export default quizSaga;