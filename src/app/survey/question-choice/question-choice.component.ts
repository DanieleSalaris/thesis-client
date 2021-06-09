import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl} from '@angular/forms';
import {findAll} from '@angular/compiler-cli/ngcc/src/utils';

@Component({
  selector: 'app-question-choice',
  templateUrl: './question-choice.component.html',
  styleUrls: ['./question-choice.component.css', '../question/question.component.css']
})
export class QuestionChoiceComponent implements OnInit {
  @Output() nextQuestion = new EventEmitter();
  @Output() prevQuestion = new EventEmitter();

  @Input() label: string;
  @Input() minNumberOfChoices: number;
  @Input() maxNumberOfChoices = 2;
  @Input() hasOtherOption: boolean;

  private _options;
  @Input() set options(value: {label: string}[]) {
    this._options = value;

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.numberOfTrueValues = this.countTrueValues();
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
    control.setValue(value);
    this.numberOfTrueValues = this.countTrueValues();
  }

  onNextQuestion () {
    const validForm = this.validateForm();

    console.log('valid form', validForm);
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
}
