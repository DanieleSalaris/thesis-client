import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyService} from '@src/app/survey/survey.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
})
export class QuestionContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.subscription = this.route.paramMap.pipe(
      // instance id
      map(params => params.get('instanceId')),
      // survey
      switchMap((instanceId: string) => this.surveyService.getSurvey(instanceId)),
      // first question id
      map(survey => survey?.[0]?._id ?? null),
      // navigate to first id
      switchMap((firstQuestionId: string | null) => {
        if (!firstQuestionId) {
          return of(null);
        }

        return this.router.navigate(
          ['question', firstQuestionId],
          {relativeTo: this.route}
        );
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
