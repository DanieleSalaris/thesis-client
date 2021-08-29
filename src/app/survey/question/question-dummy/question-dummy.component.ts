import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionChoiceModel} from '@src/app/survey/question/question-choice/question-choice.model';
import {QuestionArrayModel} from '@src/app/survey/question/question-array/question-array.model';
import {QuestionInputModel} from '@src/app/survey/question/question-input/question-input.model';
import {QuestionService} from '@src/app/survey/question/question.service';

@Component({
  selector: 'app-question-dummy',
  templateUrl: './question-dummy.component.html',
  styleUrls: ['./question-dummy.component.css']
}) export class QuestionDummyComponent {
  @Output() nextQuestion = new EventEmitter();
  @Output() prevQuestion = new EventEmitter();

  @Input() set hasNextQuestion(value: boolean) {
    this.questionService.hasNextQuestion = value;
  }

  get hasNextQuestion() {
    return this.questionService.hasNextQuestion;
  }

  @Input() set hasPrevQuestion(value: boolean) {
    this.questionService.hasPrevQuestion = value;
  }

  get hasPrevQuestion() {
    return this.questionService.hasPrevQuestion;
  }

  private _answer;
  @Input() set answer(value) {
    this._answer = value;
    this.changeStartValue();
  }

  get answer() {
    return this._answer;
  }

  @Input() set question (value: any) {
    if (!value) {
      return;
    }

    // extract data from question

    this.questionType = value.type;
    this.questionLabel = value.data.label;

    this.isTypeChoice = this.questionType === 'choice';
    this.isTypeArray = this.questionType === 'array';
    this.isTypeInput = this.questionType === 'input';

    this.questionData = this.isTypeChoice ? new QuestionChoiceModel(value.data)
        : this.isTypeArray ? new QuestionArrayModel(value.data)
        : this.isTypeInput ? new QuestionInputModel(value.data) : {};


    this.changeStartValue();
  }

  questionType: string;
  questionLabel: string;
  questionData: QuestionChoiceModel | QuestionArrayModel | QuestionInputModel | any = {};
  isTypeChoice = false;
  isTypeArray = false;
  isTypeInput = false;
  startValue;

  constructor(
    private questionService: QuestionService
  ) {}

  onNextQuestion(event) {
    this.nextQuestion.emit(event);
  }

  onPrevQuestion() {
    this.prevQuestion.emit();
  }

  changeStartValue() {
    if (!this.answer || this.answer.questionType !== this.questionType) {
      this.startValue = null;
      return;
    }

    this.startValue = this.answer.data;
  }
}
