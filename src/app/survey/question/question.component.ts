import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SurveyService} from '@src/app/survey/survey.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {QuestionChoiceModel} from '@src/app/survey/question-choice/question-choice.model';
import {QuestionArrayModel} from '@src/app/survey/question-array/question-array.model';
import {QuestionInputModel} from '@src/app/survey/question-input/question-input.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  survey$: Observable<any>;
  // selectedQuestion: QuestionChoiceModel;
  arrayQuestion: QuestionArrayModel;
  inputQuestion: QuestionInputModel;
  questions; // : {type: string, data: QuestionChoiceModel | QuestionArrayModel | QuestionInputModel}[];
  // selectedQuestion: {type: string, data: QuestionChoiceModel | QuestionArrayModel | QuestionInputModel};
  selectedQuestion: QuestionChoiceModel | QuestionArrayModel | QuestionInputModel;
  selectedQuestionType: string;

  private _selectedQuestionIndex;
  set selectedQuestionIndex(value) {
    this._selectedQuestionIndex = value;
    const question = this.questions[value];
    this.selectedQuestionType = question.type;

    this.selectedQuestion = this.selectedQuestionType === 'choice' ? new QuestionChoiceModel(question.data)
      : this.selectedQuestionType === 'array' ? new QuestionArrayModel(question.data)
      : this.selectedQuestionType === 'input' ? new QuestionInputModel(question.data) : null;

    // this.selectedQuestion = this.questions[value];
  }

  get selectedQuestionIndex() {
    return this._selectedQuestionIndex;
  }

  constructor(
    private surveyService: SurveyService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.survey$ = this.surveyService.getSurvey();
    this.survey$
      .pipe(
        // tap(res => console.log(res?.questions?.[3])),
        // tap(res => this.inputQuestion = new QuestionInputModel(res?.questions?.[3]?.data ?? {})),
        // tap(res => this.arrayQuestion = new QuestionArrayModel(res?.questions?.[2]?.data ?? {})),
        // tap(res => this.selectedQuestion = new QuestionChoiceModel(res?.questions?.[0]?.data ?? {})),
        tap(res => this.questions = res?.questions),
        tap(() => this.selectedQuestionIndex = 0), // init selected question
        tap(() => console.log(this.selectedQuestionIndex, this.selectedQuestion))
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

  nextQuestion() {
    if (this.selectedQuestionIndex >= this.questions.length - 1) {
      return;
    }

    this.selectedQuestionIndex = this.selectedQuestionIndex + 1;
    console.log(this.selectedQuestion);
  }

  prevQuestion() {
    if (this.selectedQuestionIndex <= 0) {
      return;
    }

    this.selectedQuestionIndex = this.selectedQuestionIndex - 1;
  }
}
