import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SurveyService} from '@src/app/survey/survey.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {QuestionChoiceModel} from '@src/app/survey/choice/question-choice.model';
import {QuestionArrayModel} from '@src/app/survey/array/question-array.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  survey$: Observable<any>;
  selectedQuestion: QuestionChoiceModel;
  arrayQuestion: QuestionArrayModel;

  constructor(
    private surveyService: SurveyService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.survey$ = this.surveyService.getSurvey();
    this.survey$
      .pipe(
        tap(res => this.arrayQuestion = new QuestionArrayModel(res?.questions?.[2]?.data ?? {})),
        tap(res => this.selectedQuestion = new QuestionChoiceModel(res?.questions?.[0]?.data ?? {})),
      )
      .subscribe(
      // res => console.log(this.selectedQuestion),
      // error => console.log(error)
    );
  }

  goBack() {
    this.router.navigate(['home'])
      .catch();
  }
}
