import {Component, OnInit} from '@angular/core';
import {Observable, of, zip} from 'rxjs';
import {SurveyService} from '@src/app/survey/survey.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, take} from 'rxjs/operators';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  answer$: Observable<any>;
  startValue$: Observable<any>;
  instanceId$: Observable<string>;
  questionId$: Observable<string>;
  question$: Observable<any>;
  nextQuestionId$;
  prevQuestionId$;
  hasNextQuestion$;
  hasPrevQuestion$;


  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.instanceId$ = this.route.paramMap.pipe(
      map(params => params.get('instanceId')),
    );

    this.questionId$ = this.route.paramMap.pipe(
      map(params => params.get('questionId')),
    );

    const instanceIdAndQuestionId$ = zip(this.instanceId$, this.questionId$);

    this.question$ = instanceIdAndQuestionId$.pipe(
      switchMap(([instanceId, questionId]) => this.surveyService.getQuestion(instanceId, questionId)),
    );

    this.answer$ = instanceIdAndQuestionId$.pipe(
      switchMap(([instanceId, questionId]) => this.surveyService.getAnswer(instanceId, questionId)),
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

  goBack() {
    this.router.navigate(['home'])
      .catch();
  }

  nextQuestion(value) {
    zip(this.instanceId$, this.questionId$).pipe(
      take(1),
      switchMap(([instanceId, questionId]) => this.surveyService.answerQuestion(instanceId, questionId, value)),
      switchMap(() => this.navigateToQuestion(this.nextQuestionId$))
    ).subscribe();
  }

  prevQuestion() {
    this.navigateToQuestion(this.prevQuestionId$).subscribe();
  }

  navigateToQuestion(questionId$: Observable<string>) {
    return zip(this.instanceId$, questionId$, this.hasNextQuestion$).pipe(
      take(1),
      switchMap(([instanceId, questionId, hasNextQuestion]) => {
        if (instanceId === null) {
          return of();
        }

        if (!hasNextQuestion) {
          return this.router.navigate(['/instance']);
        }

        if (questionId === null) {
          return of();
        }
        return this.router.navigate(['/instance', instanceId, 'question', questionId]);
      })
    );
  }
}
