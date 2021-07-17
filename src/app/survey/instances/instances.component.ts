import {Component, OnInit} from '@angular/core';
import {SurveyService} from '@src/app/survey/survey.service';
import {Observable} from 'rxjs';
import {InstanceModel} from '@src/app/survey/instance.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.css']
})
export class InstancesComponent implements OnInit {
  instances$: Observable<InstanceModel[]>;

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.instances$ = this.surveyService.getInstances().pipe(
      tap(i => console.log('instances', i))
    );
  }
}
