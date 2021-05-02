import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.css', '../question/question.component.css']
}) export class QuestionInputComponent {
  @Input() type: string;
  @Input() label: string;
  @Input() minLength: number;
  @Input() maxLength: number;

  constructor() {}
}
