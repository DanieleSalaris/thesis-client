import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionChoiceModel} from '@src/app/survey/question-choice/question-choice.model';
import {QuestionArrayModel} from '@src/app/survey/question-array/question-array.model';
import {QuestionInputModel} from '@src/app/survey/question-input/question-input.model';

@Component({
  selector: 'app-question-dummy',
  templateUrl: './question-dummy.component.html',
  styleUrls: ['./question-dummy.component.css']
}) export class QuestionDummyComponent {
  @Output() nextQuestion = new EventEmitter();
  @Output() prevQuestion = new EventEmitter();

  @Input() hasNextQuestion: boolean;
  @Input() hasPrevQuestion: boolean;

  private _startValue;
  @Input() set startValue(value) {
    this._startValue = value;
    console.log('start value', value);
  }

  get startValue() {
    return this._startValue;
  }

  @Input() set question (value: any) {
    if (!value) {
      return;
    }

    // extract data from question

    this.questionType = value.type;
    this.questionLabel = value.data.label;
    this.questionData = value.data || {};

    this.isTypeChoice = this.questionType === 'choice';
    this.isTypeArray = this.questionType === 'array';
    this.isTypeInput = this.questionType === 'input';

    this.questionData = this.isTypeChoice ? new QuestionChoiceModel(value.data)
        : this.isTypeArray ? new QuestionArrayModel(value.data)
        : this.isTypeInput ? new QuestionInputModel(value.data) : {};
  }

  questionType: string;
  questionLabel: string;
  questionData: QuestionChoiceModel | QuestionArrayModel | QuestionInputModel | {} = {};
  isTypeChoice = false;
  isTypeArray = false;
  isTypeInput = false;

  constructor() {}

  onNextQuestion(event) {
    this.nextQuestion.emit(event);
  }

  onPrevQuestion() {
    this.prevQuestion.emit();
  }
}
