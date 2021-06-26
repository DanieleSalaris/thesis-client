import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {max} from 'rxjs/operators';

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.css', '../question/question.component.css']
}) export class QuestionInputComponent {
  @Output() nextQuestion = new EventEmitter();
  @Output() prevQuestion = new EventEmitter();

  @Input() label: string;
  @Input() set textConfigValues(value) {
    const {
      type,
      minLength,
      maxLength,
    } = value;

    if (this.type !== type || this.minLength !== minLength || this.maxLength !== maxLength) { // changed values
      this.initFormValue();
    }

    this.type = type;
    this.minLength = minLength;
    this.maxLength = maxLength;
  }

  get textConfigValues() {
    return {
      type: this.type,
      minLength: this.minLength,
      maxLength: this.maxLength
    };
  }

  private _startValue = '';
  @Input() set startValue(value: {data: string}) {
    this._startValue = value.data;
    this.initFormValue(this._startValue);
  }

  type: string;
  private minLength: number;
  private maxLength: number;

  formGroup = this.fb.group({
    value: this.fb.control([['']])
  });

  get valueControl() {
    return this.formGroup.get('value');
  }

  constructor(private fb: FormBuilder) {}

  onNextQuestion () {
    const formValid = this.validateForm();

    if (!formValid) {
      return;
    }

    this.nextQuestion.emit(this.valueControl.value);
  }

  onPrevQuestion () {
    this.prevQuestion.emit();
  }

  validateForm(): boolean {
    return this.formGroup.valid;
  }

  initFormValue(startValue= '') {
    this.formGroup = this.fb.group({
      value: [startValue, [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]]
    });
  }
}
