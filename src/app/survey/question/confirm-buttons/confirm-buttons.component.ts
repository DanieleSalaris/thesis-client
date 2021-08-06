import {Component, EventEmitter, Output} from '@angular/core';
import {QuestionService} from '@src/app/survey/question/question.service';

@Component({
  selector: 'app-confirm-buttons',
  templateUrl: './confirm-buttons.component.html',
  styleUrls: ['./confirm-buttons.component.css']
})
export class ConfirmButtonsComponent {
  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();

  get hasNextQuestion(): boolean {
    return this.questionService.hasNextQuestion;
  }

  get hasPrevQuestion(): boolean {
    return this.questionService.hasPrevQuestion;
  }

  constructor(
    private questionService: QuestionService,
  ) {}

  onNext() {
    this.next.emit();
  }

  onPrev() {
    this.prev.emit();
  }
}
