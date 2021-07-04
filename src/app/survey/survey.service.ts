import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {QuestionChoiceModel} from '@src/app/survey/question-choice/question-choice.model';
import {QuestionArrayModel} from '@src/app/survey/question-array/question-array.model';
import {QuestionInputModel} from '@src/app/survey/question-input/question-input.model';
import {AsyncSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  prefix = 'API/survey';
  instancePrefix = 'API/instance';
  instanceId = null;
  survey = null;

  constructor(private http: HttpClient) {}

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
    console.log('saving', {instanceId, questionId, value});
    return this.http.post(`API/instance/${instanceId}/question/${questionId}/answer`, {value});
  }

  getAnswer(instanceId, questionId) {
    console.log('getting answer', {instanceId, questionId});
    return this.http.get(`API/instance/${instanceId}/question/${questionId}/answer/`);
  }

  private refreshSurvey(instanceId) {
    return this.http.get(`${this.instancePrefix}/${instanceId}/question`).pipe(
      tap(survey => {
        this.instanceId = instanceId;
        this.survey = survey;
      }),
      tap(() => console.log('refreshing survey'))
    );
  }

  getSurvey2(instanceId: string): Observable<any> {
    if (instanceId !== this.instanceId || this.survey === null) {
      this.instanceId = null;
      return this.refreshSurvey(instanceId);
    }
    return of(this.survey);
  }

  getQuestion(instanceId, questionId) {
    return this.getSurvey2(instanceId).pipe(
      map(questions => questions.find(question => question._id === questionId)),
    );
  }

  getNextQuestionId(instanceId, questionId): Observable<number | null> {
    return this.getSurvey2(instanceId).pipe(
      map(questions => {
        const index = questions.findIndex(question => question._id === questionId);
        return questions[index + 1]?._id ?? null;
      })
    );
  }

  getPrevQuestionId(instanceId, questionId): Observable<number | null> {
    return this.getSurvey2(instanceId).pipe(
      map(questions => {
        const index = questions.findIndex(question => question._id === questionId);
        return questions[index - 1]?._id ?? null;
      })
    );
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
