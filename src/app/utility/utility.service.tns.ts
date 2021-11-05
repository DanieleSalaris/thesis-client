import {Injectable} from '@angular/core';
import {isAndroid, isIOS} from '@nativescript/core';
import {LocalNotifications} from '@nativescript/local-notifications';
import * as utils from '@nativescript/core/utils/utils';
declare const UIApplication;

import {getDate, getMonth, getYear, isBefore, parse, addDays, setHours, setMinutes} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() {}

  dismissSoftKeyBoard() {
    // only for mobile
    if (isAndroid) {
      utils.ad.dismissSoftInput();
    }

    if (isIOS) {
      UIApplication.sharedApplication.keyWindow.endEditing(true);
    }
  }

  initNotifications() {
    LocalNotifications.addOnMessageReceivedCallback(notificationData => {
      console.log('Notification received: ' + JSON.stringify(notificationData));
    });
  }

  scheduleSurveyNotifications() {
    const notifications = this.generateNotifications();

    LocalNotifications.schedule(notifications).catch();
  }

  private generateNotifications(numberOfDays = 10) {
    // message that appear on notification
    const message = {
      title: 'Hi!',
      body: 'Remember to compile the survey'
    };

    // time format that appear on notification id to avoid duplication
    const timeFormat = 'yyyy-MM-d HH:mm';

    // hours in which notifications appears
    const notificationHours = ['10:00', '18:00'];

    // array of notifications to return
    const notifications = [];
    const now = new Date();

    for (let i = 0; i < numberOfDays; i++) {
      // on each iteration take the next day
      const date = addDays(now, i);

      // extract year month and day
      const year = getYear(date);
      const month = getMonth(date) + 1;
      const day = getDate(date);

      // format times
      const notificationsTimes = notificationHours.map(hour => `${year}-${month}-${day} ${hour}`);

      notificationsTimes.forEach(nt => {
        const ntDate = parse(nt, timeFormat, new Date());

        // check that the time is not in the past
        if (i === 0 && isBefore(ntDate, now)) {
          return;
        }

        // push notification on return array
        notifications.push({
          id: nt,
          at: ntDate,
          ...message
        });
      });
    }

    return notifications;
  }
}
