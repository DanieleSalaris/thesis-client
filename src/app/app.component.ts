import {Component, OnInit} from '@angular/core';
import { LocalNotifications } from '@nativescript/local-notifications';
import {UtilityService} from '@src/app/utility/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
      private utilityService: UtilityService
  ) {
    this.utilityService.initNotifications();
  }

  ngOnInit() {
    this.utilityService.scheduleSurveyNotifications();
  }
}
