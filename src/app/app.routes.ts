import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import {QuestionComponent} from '@src/app/survey/question/question.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/question',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
    path: 'question',
    component: QuestionComponent,
  },
  {
    path: 'instance/:instanceId/question/:questionId',
    component: QuestionComponent,
  }
];
