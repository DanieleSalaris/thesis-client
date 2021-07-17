import {Component, Input} from '@angular/core';
import {InstanceModel} from '@src/app/survey/instance.model';

@Component({
  selector: 'app-instances-dummy',
  templateUrl: './instances-dummy.component.html',
  styleUrls: ['./instances-dummy.component.css']
})
export class InstancesDummyComponent {
  @Input() instances: InstanceModel[];

  constructor() {}
}
