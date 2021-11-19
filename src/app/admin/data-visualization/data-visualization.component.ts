import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyService} from '@src/app/survey/survey.service';
import {map, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent implements OnInit, OnDestroy {
  averages: {questionId: string, rate: number, percentage: number, aspect: string}[];
  averagesSubscription: Subscription;
  loadingData = false;

  constructor(
    private surveyService: SurveyService
  ) {}

  ngOnInit() {
    this.loadingData = true;
    this.averagesSubscription = this.surveyService.getAnswerAverage().pipe(
      tap(averages => this.averages = averages),
      tap(() => this.loadingData = false)
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.averagesSubscription) {
      this.averagesSubscription.unsubscribe();
    }
  }
}
