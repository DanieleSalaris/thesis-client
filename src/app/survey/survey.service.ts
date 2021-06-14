import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {QuestionChoiceModel} from '@src/app/survey/question-choice/question-choice.model';
import {QuestionArrayModel} from '@src/app/survey/question-array/question-array.model';
import {QuestionInputModel} from '@src/app/survey/question-input/question-input.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  prefix = 'API/survey';
  instancePrefix = 'API/instance';

  constructor(private http: HttpClient) {

  }

  getSurvey() {
    return this.http.get(
      `${this.prefix}/123`
    );
  }

  getQuestionsFromInstanceId(instanceId= '2') {
    return this.http.get(
      `API/instance/${instanceId}/question`
    ).pipe(
      // tap(res => console.log('questions', res)),
      map((questions: any[]) => questions.map(q => this.formatQuestion(q))),
    );

  }

  answerQuestion(instanceId, questionId, value) {
    return this.http.post(`API/instance/${instanceId}/question/${questionId}/answer`, {value});
  }

  getAnswer(instanceId, questionId) {
    return this.http.get(`API/instance/${instanceId}/question/${questionId}/answer/`);
  }

  private formatQuestion(question) {
    const questionData = question.type === 'choice' ? new QuestionChoiceModel(question.data) :
      question.type === 'array' ? new QuestionArrayModel(question.data) :
      question.type === 'input' ? new QuestionInputModel(question.data) : null;

    return {
      _id: question._id,
      type: question.type,
      data: questionData,
    };
  }
}
