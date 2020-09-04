import {getQuizQuestions, scoreQuiz, isCorrect, displayQuestion} from '../services/QuizService';
import mockJson from './mockJsonResponse.json'
describe('Quiz Service', () => {
    it('can call the API', async () => {
       const questions = await getQuizQuestions();
       expect(questions.length).toEqual(10);
    })
    it('can add a user answer field', async () => {
        const questions = await getQuizQuestions();
        expect(questions[0].user_answer).toBeDefined();
    })
    it('can score a quiz', async () => {
        const score = scoreQuiz(mockJson);
        expect(score).toEqual('9 / 10')
    })
    it('can tell the DOM what color to display', async () => {
        const answer = isCorrect(mockJson[0]);
        expect(answer.color).toEqual('green')
    })
    it('can tell the DOM what answer symbol to display', async () => {
        const answer = displayQuestion(mockJson[9]);
        expect(answer).toEqual(`- ${mockJson[9].question}`)
    })
  })