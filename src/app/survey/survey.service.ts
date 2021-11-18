import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {QuestionChoiceModel} from '@src/app/survey/question/question-choice/question-choice.model';
import {QuestionArrayModel} from '@src/app/survey/question/question-array/question-array.model';
import {QuestionInputModel} from '@src/app/survey/question/question-input/question-input.model';
import {Observable, of} from 'rxjs';
import {InstanceModel} from '@src/app/survey/instance.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  prefix = 'api/survey';
  instancePrefix = 'api/instance';
  instanceId = null;
  survey = null;

  constructor(private http: HttpClient) {}

  getAnswerAverage() {
    return this.http.get<any>(
      `${this.prefix}/3/average`
    ).pipe(
      map(value => value.average.map(v => ({...v, percentage: v.rate * 100}))),
    );
  }

  getQuestionsFromInstanceId(instanceId= '2') {
    return this.http.get(
      `${this.instancePrefix}/${instanceId}/question`
    ).pipe(
      map((questions: any[]) => questions.map(q => this.formatQuestion(q))),
    );

  }

  answerQuestion(instanceId, questionId, value) {
    return this.http.post(`${this.instancePrefix}/${instanceId}/question/${questionId}/answer`, {value});
  }

  getAnswer(instanceId, questionId) {
    return this.http.get(`${this.instancePrefix}/${instanceId}/question/${questionId}/answer/`);
  }

  private refreshSurvey(instanceId) {
    return this.http.get(`${this.instancePrefix}/${instanceId}/question`).pipe(
      tap(survey => {
        this.instanceId = instanceId;
        this.survey = survey;
      }),
    );
  }

  getSurvey(instanceId: string): Observable<any> {
    if (instanceId !== this.instanceId || this.survey === null) {
      this.instanceId = null;
      return this.refreshSurvey(instanceId);
    }
    return of(this.survey);
  }

  getQuestion(instanceId, questionId) {
    return this.getSurvey(instanceId).pipe(
      map(questions => questions.find(question => question._id === questionId)),
    );
  }

  getNextQuestionId(instanceId, questionId): Observable<number | null> {
    return this.getSurvey(instanceId).pipe(
      map(questions => {
        const index = questions.findIndex(question => question._id === questionId);
        return questions[index + 1]?._id ?? null;
      })
    );
  }

  getPrevQuestionId(instanceId, questionId): Observable<number | null> {
    return this.getSurvey(instanceId).pipe(
      map(questions => {
        const index = questions.findIndex(question => question._id === questionId);
        return questions[index - 1]?._id ?? null;
      })
    );
  }

  getInstances() {
    return this.http.get<any>(this.instancePrefix).pipe(
      map(instances => instances.map(i => new InstanceModel(i)))
    );
  }

  getTodayInstance(): Observable<InstanceModel> {
    return this.http.post<any>(`${this.instancePrefix}/today-instance`, {}).pipe(
      map(instance => new InstanceModel(instance))
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
