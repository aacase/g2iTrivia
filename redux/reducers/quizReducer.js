import { createReducer } from "@reduxjs/toolkit";
import { answerQuestion} from "../../services/QuizService";

const initialState = {
  index: 0,
  questions: [],
  quizOver: false,
  finalScore: "Incomplete",
};

/**
 * This is not standard syntax. We're using redux toolkit's createReducer which utilizes 
 * the produce method from Immer. We are not actually mutating the state directly, 
 * this is safe, a way to save a ton of boilerplate, and is much more readable in my opinion. 
 */
const quizReducer = createReducer(initialState, {
  QUESTIONS_FETCH_SUCCEEDED: (state, action) => {
    state.questions = action.payload;
  },
  ANSWER_QUESTION: (state, action) => {
    state.questions = answerQuestion(
      action.payload,
      state.index,
      state.questions
    );
  },
  INCREASE_INDEX: (state) => {
    state.index++;
  },
  END_QUIZ: (state) => {
    state.quizOver = true;
  },
  START_OVER: (state) => {
    state.index = 0;
    state.questions = [];
    state.quizOver = false;
    state.results = [];
  },
});

export default quizReducer;
