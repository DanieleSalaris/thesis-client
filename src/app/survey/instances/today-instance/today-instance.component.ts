import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyService} from '@src/app/survey/survey.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-today-instance',
  template: ''
}) export class TodayInstanceComponent implements OnInit, OnDestroy {
  todayInstanceSubscription: Subscription;

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit() {
    this.todayInstanceSubscription = this.surveyService.getTodayInstance().pipe(
      switchMap(instance => this.router.navigate(['instance', instance._id]))
    ).subscribe();
  }

  ngOnDestroy() {
    this.todayInstanceSubscription?.unsubscribe();
  }
}
