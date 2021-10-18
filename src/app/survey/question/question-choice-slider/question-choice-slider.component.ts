import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {findNativeScriptPlatformPathInSource} from '@nativescript/webpack/utils/ast-utils';

@Component({
  selector: 'app-question-choice-slider',
  templateUrl: './question-choice-slider.component.html',
  styleUrls: ['question-choice-slider.component.css']
})
export class QuestionChoiceSliderComponent {
  @Output() nextQuestion = new EventEmitter();
  @Output() prevQuestion = new EventEmitter();

  @Input() label: string;

  private _options;
  @Input() set options(value: {label: string}[]) {
    this._options = value;
    // side effect, reset slider value
    this.sliderControl.setValue(1);
  }

  get options() {
    return this._options;
  }

  private _startValue = [];
  @Input() set startValue(value: number[]) {
    this._startValue = value;

    if (!value) {
      return;
    }

    this.precompilateForm();
  }

  fg = this.fb.group({
    slider: this.fb.control(1)
  });

  get sliderControl() {
    return this.fg.get('slider') as FormControl;
  }

  get selectedOption() {
    return this.options[this.sliderControl.value - 1]?.label;
  }

  minNumber = 1;
  get maxNumber() {
    return this.options?.length ?? this.minNumber;
  }

  constructor(private fb: FormBuilder) {}

  onValueChange(value) {
    this.sliderControl.setValue(value);
  }

  onNextQuestion () {
    const output = this.formatOutput();
    this.nextQuestion.emit(output);
  }

  onPrevQuestion () {
    this.prevQuestion.emit();
  }

  formatOutput() {
    const value = this.sliderControl.value;
    return [value - 1];
  }

  precompilateForm() {
    const [value] = this._startValue;
    this.sliderControl.setValue(value + 1);
  }
}
