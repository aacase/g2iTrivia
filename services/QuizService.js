import axios from "axios";

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
   * We also need to translate the special unicode characters since we're not appending HTML directly.
   */
  try {
    quizObject.forEach((question) => {
      question.user_answer = null;
      question.question = question.question
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&epsilon;/g, "ε");
    });
    return quizObject;
  } catch (err) {
    return err;
  }
}

export function answerQuestion(userAnswer, quizIndex, quizQuestions) {
  quizQuestions[quizIndex].user_answer = userAnswer;
  quizIndex++;
  return { index: quizIndex, questions: quizQuestions };
}
