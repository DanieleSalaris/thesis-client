import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SurveyService} from '@src/app/survey/survey.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit{
  survey$: Observable<any>;

  constructor(
    private surveyService: SurveyService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.survey$ = this.surveyService.getSurvey();
    this.survey$.subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

  goBack() {
    this.router.navigate(['home'])
      .catch();
  }
}
