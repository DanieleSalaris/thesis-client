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

  @Input() set maxNumberOfChoices(value: number) {
    this._maxNumberOfChoices = value;
    this.singleChoice = true; // value === 1;
  }

  @Input() hasOtherOption: boolean;

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

  get checkBoxesControl() {
    return this.formGroup.get('checkBoxesControl') as FormArray;
  }

  formGroup = this.fb.group({
    checkBoxesControl: this.fb.array([])
  });


  get maxNumberOfChoices(): number {
    return this._maxNumberOfChoices;
  }

  get optionsAndSubQuestions() {
    return this._optionsAndSubQuestions;
  }

  private _optionsAndSubQuestions;
  private _maxNumberOfChoices: number;
  singleChoice: boolean;

  constructor(private fb: FormBuilder) {}

  submit() {
    // console.log(this.checkBoxesControl.controls.map(c => c.value));

    //  console.log(this.checkBoxesControl.controls);
    const values = this.checkBoxesControl.controls.map(
      (subQuestion: FormArray) => subQuestion.controls.map(c => c.value)
    );

  }

  toggleCheckbox(value: boolean, control: AbstractControl, subQuestion: AbstractControl) {
    if (!this.singleChoice) { // multiple choice
      control.setValue(value);
      return;
    }

    if (!value) {
      return;
    }

    const controls = this.getControlsFromSubQuestion(subQuestion);

    controls.map(c => {
        c.setValue(false);
    });

    control.setValue(value);
  }

  getControlsFromSubQuestion(subQuestion: AbstractControl) {
    return (subQuestion as FormArray).controls;
  }
}
