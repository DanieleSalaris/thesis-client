import {Component, Input} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-question-array',
  templateUrl: './question-array.component.html',
  styleUrls: ['./question-array.component.css', '../question/question.component.css']
})
export class QuestionArrayComponent {
  @Input() label: string;
  @Input() minNumberOfChoices: number;
  @Input() maxNumberOfChoices: number;
  @Input() hasOtherOption: boolean;

  private _optionsAndSubQuestions;
  @Input() set optionsAndSubQuestions(value: {options: {label: string}[], subQuestions: {label: string}[]}) {
    this._optionsAndSubQuestions = value;

    const {options, subQuestions} = value;

    if (!options || !subQuestions) {
      return;
    }

    while (this.checkBoxesControl.controls.length < subQuestions.length) {
      const subQuestionControl = this.fb.array([]);
      while (subQuestionControl.controls.length < options.length) {
        subQuestionControl.push(
          this.fb.control(false)
        );
      }
      this.checkBoxesControl.push(subQuestionControl);
    }

    // this._options = valud;
    //
    // while (this.checkBoxesControl.controls.length < value.length) {
    //   this.checkBoxesControl.push(
    //     this.fb.control(false)
    //   );
    // }
  }

  get optionsAndSubQuestions() {
    return this._optionsAndSubQuestions;
  }

  get checkBoxesControl() {
    return this.formGroup.get('checkBoxesControl') as FormArray;
  }

  formGroup = this.fb.group({
    checkBoxesControl: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    // console.log(this.checkBoxesControl.controls.map(c => c.value));

    //  console.log(this.checkBoxesControl.controls);
    const values = this.checkBoxesControl.controls.map(
      (subQuestion: FormArray) => subQuestion.controls.map(c => c.value)
    );

    console.log(values);
  }

  toggleCheckbox(value: boolean, control: AbstractControl) {
    control.setValue(value);
  }

  getControlsFromSubQuestion(subQuestion: AbstractControl) {
    return (subQuestion as FormArray).controls;
  }
}
