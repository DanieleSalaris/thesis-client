import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl} from '@angular/forms';

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
    this._options = value;

    console.log('formArray:', this.checkBoxesControl.controls);

    while (this.checkBoxesControl.controls.length < value.length) {
      this.checkBoxesControl.push(
        this.fb.control(false)
      );
    }
    // this.checkBoxesControl.
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

  get checkBox1Control() {
    return this.formGroup.get('checkbox1');
  }

  get checkBoxesControl() {
    return this.formGroup.get('checkBoxesControl') as FormArray;
  }

  formGroup = this.fb.group({
    text1: ['text1'],
    text2: ['text2'],
    checkbox1: [false],
    checkBoxesControl: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    // console.log(this.text1Control.value, this.text2Control.value);
    console.log('on submit');
    // this.label2 = 'changed label';

    console.log(this.text1Control.value);
    console.log(this.text2Control.value);
    console.log(this.checkBox1Control.value);
    console.log(this.checkBoxesControl.controls.map(c => c.value));
  }

  toggleCheckbox(value: boolean, control: AbstractControl, i) {
    control.setValue(value);
    console.log('***');
    console.log(i);
    console.log(this.options[i]);
    console.log('---');
  }
}
