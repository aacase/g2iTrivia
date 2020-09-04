import axios from "axios";
import {decode} from "he";
/**
 * This is our data call to retreive questions. On a successful call, we'll take the data and transform it
 * into a usable format for the quiz.
 * 
 * Example response:
 * {
  "response_code": 0,
  "results": [
    {
      "category": "Entertainment: Video Games",
      "type": "boolean",
      "difficulty": "hard",
      "question": "Unturned originally started as a Roblox game.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },…]}
 */
export async function getQuizQuestions() {
  try {
    let response = await axios.get(
      "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
    );

    return transformQuestionObject(response.data.results);
  } catch (err) {
    return err;
  }
}

function transformQuestionObject(quizObject) {
  /**
   * We need to add a field to the question object in order to store the user's
   * answer. This will help us facilitate scorekeeping at the end of the quiz.
   * We also need to translate the special HTML characters since we're not appending HTML directly,
   * this is done using the "he" library.
   */
  try {
    quizObject.forEach((question) => {
      question.user_answer = null;
      question.question = decode(question.question)
    });
    return quizObject;
  } catch (err) {
    return err;
  }
}

/**
 * Take the user's answer and append to our question state, and increase the index
 * to move on to the next question in the quiz
 * @param {String} userAnswer 
 * @param {Number} quizIndex
 * @param {Array} quizQuestions
 */
export function answerQuestion(userAnswer, quizIndex, quizQuestions) {
  quizQuestions[quizIndex].user_answer = userAnswer;
  quizIndex++;
  return { index: quizIndex, questions: quizQuestions };
}

/**
 * Take the quiz object, and score it using user answers
 * @param {Array} quizQuestions
 */
export function scoreQuiz (quizQuestions){
    let score = 0;
    quizQuestions.forEach(question =>{
        question.correct_answer === question.user_answer ? score ++ : null
    })
    return `${score} / ${quizQuestions.length}`
}

/**
 * Display red or green based on the user's answer
 * @param {Object} question
 */
export function isCorrect (question){
    return question.correct_answer === question.user_answer ?  {color: "green"} : {color: "red"}
  }
/**
 * Display + or - based on the user's answer
 * @param {Object} question
 */
export function displayQuestion(question){
    return question.correct_answer === question.user_answer ? `+ ${question.question}` : `- ${question.question}`
  }