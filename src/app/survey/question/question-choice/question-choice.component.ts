import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-question-choice',
  templateUrl: './question-choice.component.html',
  styleUrls: ['./question-choice.component.css', '../question.component.css']
})
export class QuestionChoiceComponent implements OnInit {
  @Output() nextQuestion = new EventEmitter();
  @Output() prevQuestion = new EventEmitter();

  @Input() label: string;
  @Input() minNumberOfChoices: number;
  @Input() hasOtherOption: boolean;

  private _maxNumberOfChoices;
  @Input() set maxNumberOfChoices(value: number) {

    this._maxNumberOfChoices = value;
    this.singleChoice = value === 1;
  }

  get maxNumberOfChoices() {
    return this._maxNumberOfChoices;
  }

  private _startValue = [];
  @Input() set startValue(value: number[]) {
    this._startValue = value;

    if (!value) {
      return;
    }
    this.precompilateForm();
  }

  private _options;
  @Input() set options(value: {label: string}[]) {
    this._options = value;

    // const initValues = [];
    // for (let i = 0; i < subQuestions.length; i++) {
    //   const initRow = [];
    //   for (let j = 0; j < options.length; j++) {
    //     initRow[j] = false;
    //   }
    //   initValues[i] = initRow;
    // }

    const initValue = [];
    for (let i = 0; i < this._options.length; i++) {
      initValue[i] = false;
    }

    this.initFormGroup(initValue);

    // while (this.checkBoxesControl.controls.length < value.length) {
    //   this.checkBoxesControl.push(
    //     this.fb.control(false)
    //   );
    // }
    // this.checkBoxesControl.
  }

  get options() {
    return this._options;
  }

  get checkBoxesControl() {
    return this.formGroup.get('checkBoxesControl') as FormArray;
  }

  formGroup = this.fb.group({
    checkBoxesControl: this.fb.array([])
  });

  disableCheckBoxes = false;

  private _numberOfTrueValues = 0;
  set numberOfTrueValues(value) {
    this._numberOfTrueValues = value;
    this.disableCheckBoxes = value >= this.maxNumberOfChoices;
  }

  get numberOfTrueValues() {
    return this._numberOfTrueValues;
  }

  errorMessage = '';
  singleChoice = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.numberOfTrueValues = this.countTrueValues();
    // this.initFormGroup();
  }

  validateForm(): boolean {
    const numberOfTrueValues = this.countTrueValues();
    this.errorMessage = '';

    if (numberOfTrueValues < this.minNumberOfChoices) {
      this.errorMessage =  `Insert at least ${this.minNumberOfChoices} options`;
      return false;
    }

    if (numberOfTrueValues > this.maxNumberOfChoices) {
      this.errorMessage = `Insert at most ${this.maxNumberOfChoices} options`;
      return false;
    }

    return true;
  }

  toggleCheckbox(value: boolean, control: AbstractControl) {
    if (!this.singleChoice) {
      control.setValue(value);
      this.numberOfTrueValues = this.countTrueValues();
    }

    if (!value) {
      return;
    }

    const controls = this.checkBoxesControl.controls;

    controls.map(c => {
      c.setValue(false);
    });

    control.setValue(value);
  }

  onNextQuestion () {
    const validForm = this.validateForm();

    if (!validForm) {
      return;
    }

    const output = this.formatOutput();
    this.nextQuestion.emit(output);
  }

  onPrevQuestion () {
    this.prevQuestion.emit();
  }

  getOptionLabelFromIndex(index: number): string {
    return this.options[index].label;
  }

  countTrueValues() {
    return this.checkBoxesControl.controls.reduce((acc:  number, control) => {
      if (control.value) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  formatOutput() {
    return this.checkBoxesControl.controls.reduce((acc: number[], control, index) => {
      if (control.value) {
        return [...acc, index];
      }
      return acc;
    }, []);
  }

  initFormGroup(value = []) {
    this.formGroup = this.fb.group({
      checkBoxesControl: this.fb.array(value)
    });
  }

  precompilateForm() {
    // from [2, 4, 5] to [false, true, false, true, true]
    const nextValue = this.checkBoxesControl.controls.map(() => false);
    this._startValue.forEach(pos => nextValue[pos] = true);

    this.initFormGroup(nextValue);
  }
}
