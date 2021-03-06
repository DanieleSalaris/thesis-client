export class QuestionChoiceModel {
  label: string;
  minNumberOfChoices: number;
  maxNumberOfChoices: number;
  hasOtherOption: boolean;
  options: {label: string}[];
  slider: boolean;

  constructor(data: {
    label: string,
    minNumberOfChoices: number;
    maxNumberOfChoices: number;
    hasOtherOption: boolean;
    slider: boolean;
    options: {label: string}[];
  }) {
    this.label = data.label;
    this.minNumberOfChoices = data.minNumberOfChoices;
    this.maxNumberOfChoices = data.maxNumberOfChoices;
    this.hasOtherOption = data.hasOtherOption;
    this.options = data.options;
    this.slider = !!data.slider;
  }
}
