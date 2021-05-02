export class QuestionInputModel {
  type: string;
  label: string;
  minLength: number;
  maxLength: number;

  constructor(value: {type, label, minLength, maxLength}) {
    const {type, label, minLength, maxLength} = value;
    this.type = type;
    this.label = label;
    this.minLength = minLength;
    this.maxLength = maxLength;
  }
}
