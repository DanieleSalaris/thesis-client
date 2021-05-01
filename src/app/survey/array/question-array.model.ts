export class QuestionArrayModel {
  label;
  minNumberOfChoices: number;
  maxNumberOfChoices: number;
  subQuestion: {label: string}[];
  options: {label: string}[];

  constructor({label, minNumberOfChoices, maxNumberOfChoices, subQuestions, options}) {
    this.label = label;
    this.minNumberOfChoices = minNumberOfChoices;
    this.maxNumberOfChoices = maxNumberOfChoices;
    this.subQuestion = subQuestions;
    this.options = options;
  }
}
