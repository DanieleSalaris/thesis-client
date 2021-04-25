import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-question-choice',
  templateUrl: './question-choice.component.html',
  styleUrls: ['./question-choice.component.css', '../question/question.component.css']
})
export class QuestionChoiceComponent {
  @Input() label: string;
  @Input() minNumberOfChoices: number;
  @Input() maxNumberOfChoices: number;
  @Input() hasOtherOption: boolean;

  _options;
  @Input() set options(value: {label: string}[]) {
    console.log('setting options: ', value);
    this._options = value;
  }

  get options() {
    return this._options;
  }

  label2 = 'default label';

  get text1Control() {
    return this.formGroup.get('text1');
  }

  get text2Control() {
    return this.formGroup.get('text2');
  }

  get checkBoxesControl() {
    return this.formGroup.get('checkBoxesControl');
  }

  formGroup = this.fb.group({
    text1: [''],
    text2: [''],
    checkBoxesControl: this.fb.group({
      checked: [false]
    })
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    // console.log(this.text1Control.value, this.text2Control.value);
    console.log('on submit');
    this.label2 = 'changed label';
  }
}
