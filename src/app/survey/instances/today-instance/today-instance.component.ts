import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyService} from '@src/app/survey/survey.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { tap} from 'rxjs/operators';

@Component({
  selector: 'app-today-instance',
  templateUrl: './today-instance.component.html',
  styleUrls: ['./today-instance.component.css']
}) export class TodayInstanceComponent implements OnInit, OnDestroy {
  todayInstanceSubscription: Subscription;
  instanceId;

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit() {
    this.todayInstanceSubscription = this.surveyService.getTodayInstance().pipe(
      tap(instance => this.instanceId = instance._id),
      // switchMap(instance => this.router.navigate(['instance', instance._id]))
    ).subscribe();
  }

  ngOnDestroy() {
    this.todayInstanceSubscription?.unsubscribe();
  }

  navigateToQuestion() {
    if (!this.instanceId) {
      return;
    }
    this.router.navigate(['instance', this.instanceId]).catch();
  }
}
