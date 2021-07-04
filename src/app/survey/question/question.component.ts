import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, zip} from 'rxjs';
import {SurveyService} from '@src/app/survey/survey.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {QuestionChoiceModel} from '@src/app/survey/question-choice/question-choice.model';
import {QuestionArrayModel} from '@src/app/survey/question-array/question-array.model';
import {QuestionInputModel} from '@src/app/survey/question-input/question-input.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {
  survey$: Observable<any>;
  answer$: Observable<any>;
  instanceId$: Observable<string>;
  questionId$: Observable<string>;
  question$: Observable<any>;
  nextQuestionId$;
  prevQuestionId$;
  hasNextQuestion$;
  hasPrevQuestion$;

  // @todo change in questions
  question;
  questionSubscription;

  questions; // : {type: string, data: QuestionChoiceModel | QuestionArrayModel | QuestionInputModel}[];
  // selectedQuestion: QuestionChoiceModel;
  arrayQuestion: QuestionArrayModel;
  inputQuestion: QuestionInputModel;
  // selectedQuestion: {type: string, data: QuestionChoiceModel | QuestionArrayModel | QuestionInputModel};
  selectedQuestion: QuestionChoiceModel | QuestionArrayModel | QuestionInputModel;
  selectedQuestionType: string;
  selectedQuestionId: string;
  instanceId = '2';

  private _selectedQuestionIndex;
  set selectedQuestionIndex(value) {
    this._selectedQuestionIndex = value;
    // const question = this.questions[value];
    // this.selectedQuestionType = question.type;
    //
    // this.selectedQuestion = this.selectedQuestionType === 'choice' ? new QuestionChoiceModel(question.data)
    //   : this.selectedQuestionType === 'array' ? new QuestionArrayModel(question.data)
    //   : this.selectedQuestionType === 'input' ? new QuestionInputModel(question.data) : null;

    // this.selectedQuestion = this.questions[value];

    const question = this.question[value];
    this.selectedQuestionType = question.type;
    this.selectedQuestion = question.data;
    this.selectedQuestionId = question._id;
    // this.answer$ = this.surveyService.getAnswer(this.instanceId, this.selectedQuestionId);
    this.answer$.subscribe(res => console.log('success', res), error => console.log('error', error));
  }

  get selectedQuestionIndex() {
    return this._selectedQuestionIndex;
  }

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.survey$ = this.surveyService.getSurvey();
    // this.survey$
    //   .pipe(
    //     // tap(res => console.log(res?.questions?.[3])),
    //     // tap(res => this.inputQuestion = new QuestionInputModel(res?.questions?.[3]?.data ?? {})),
    //     // tap(res => this.arrayQuestion = new QuestionArrayModel(res?.questions?.[2]?.data ?? {})),
    //     // tap(res => this.selectedQuestion = new QuestionChoiceModel(res?.questions?.[0]?.data ?? {})),
    //     tap(res => this.questions = res?.questions),
    //     tap(() => this.selectedQuestionIndex = 0), // init selected question
    //     tap(() => console.log(this.selectedQuestionIndex, this.selectedQuestion))
    //   )
    //   .subscribe(
    //   // res => console.log(this.selectedQuestion),
    //   // error => console.log(error)
    // );

    this.instanceId$ = this.route.paramMap.pipe(
      map(params => params.get('instanceId'))
    );

    this.questionId$ = this.route.paramMap.pipe(
      map(params => params.get('questionId'))
    );

    this.questionSubscription = this.surveyService.getQuestionsFromInstanceId(this.instanceId)
      .pipe(
        tap(questions => this.question = questions),
        tap(() => this.selectedQuestionIndex = 0)
      )
      .subscribe();

    const instanceIdAndQuestionId$ = zip(this.instanceId$, this.questionId$);

    this.question$ = instanceIdAndQuestionId$.pipe(
      switchMap(([instanceId, questionId]) => this.surveyService.getQuestion(instanceId, questionId))
    );

    this.answer$ = instanceIdAndQuestionId$.pipe(
      switchMap(([instanceId, questionId]) => this.surveyService.getAnswer(instanceId, questionId))
    );

    this.nextQuestionId$ = instanceIdAndQuestionId$.pipe(
      switchMap(([instanceId, questionId]) => this.surveyService.getNextQuestionId(instanceId, questionId))
    );

    this.prevQuestionId$ = instanceIdAndQuestionId$.pipe(
      switchMap(([instanceId, questionId]) => this.surveyService.getPrevQuestionId(instanceId, questionId))
    );

    this.hasNextQuestion$ = this.nextQuestionId$.pipe(
      map(id => id !== null)
    );

    this.hasPrevQuestion$ = this.prevQuestionId$.pipe(
      map(id => id !== null)
    );
  }

  ngOnDestroy() {
    this.questionSubscription?.unsubscribe();
  }

  goBack() {
    this.router.navigate(['home'])
      .catch();
  }

  nextQuestion(value) {
    // if (this.selectedQuestionIndex >= this.question.length - 1) {
    //   return;
    // }

    zip(this.instanceId$, this.questionId$).pipe(
      take(1),
      switchMap(([instanceId, questionId]) => this.surveyService.answerQuestion(instanceId, questionId, value)),
      switchMap(() => this.navigateToQuestion(this.nextQuestionId$))
    ).subscribe();
    // this.surveyService
    //   .answerQuestion(this.instanceId, this.selectedQuestionId, value).pipe(
    //   // tap(() => {
    //   //   if (this.selectedQuestionIndex >= this.question.length - 1) {
    //   //     return;
    //   //   }
    //   //   this.selectedQuestionIndex = this.selectedQuestionIndex + 1;
    //   // })
    //     switchMap(() => this.navigateToQuestion(this.nextQuestionId$)),
    //   )
    //   .subscribe(res => console.log('success', res), error => console.log('error', error));
    // // this.selectedQuestionIndex = this.selectedQuestionIndex + 1;
  }

  prevQuestion() {
    // if (this.selectedQuestionIndex <= 0) {
    //   return;
    // }
    //
    // this.selectedQuestionIndex = this.selectedQuestionIndex - 1;
    this.navigateToQuestion(this.prevQuestionId$).subscribe();
  }

  navigateToQuestion(questionId$: Observable<string>) {
    return zip(this.instanceId$, questionId$).pipe(
      take(1),
      switchMap(([instanceId, questionId]) => {
        if (instanceId === null || questionId === null) {
          return of();
        }
        return this.router.navigate(['/instance', instanceId, 'question', questionId]);
      })
    );
  }
}
