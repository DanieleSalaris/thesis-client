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
      this.formGroup = this.fb.group({
        value: this.fb.control([[''], [Validators.required, Validators.minLength(minLength), Validators.maxLength(maxLength)]])
      });
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

  private type: string;
  private minLength: number;
  private maxLength: number;

  formGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  onNextQuestion () {
    this.nextQuestion.emit();
  }

  onPrevQuestion () {
    this.prevQuestion.emit();
  }
}
