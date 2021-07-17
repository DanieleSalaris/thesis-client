import {Component, Input} from '@angular/core';
import {InstanceModel} from '@src/app/survey/instance.model';
import format from 'date-fns/format';

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.css']
})
export class InstanceComponent {
  day = '';
  month = '';
  year = '';

  link;

  private _instance;
  @Input() set instance(value: InstanceModel) {
    this._instance = value;

    if (value) {
      const [day, month, year] = format(value.date, 'd MMMM yyyy')
        .split(' ');

      this.day = day;
      this.month = month;
      this.year = year;

      this.link = ['/instance', value._id, 'question',  '1'];
    }
  }

  get instance() {
    return this._instance;
  }

  constructor() {}
}
