import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import {QuestionComponent} from '@src/app/survey/question/question.component';
import {InstancesComponent} from '@src/app/survey/instances/instances.component';
import {LoginComponent} from '@src/app/auth/login/login.component';
import {AuthGuard} from '@src/app/auth/auth.guard';
import {QuestionContainerComponent} from '@src/app/survey/question-container/question-container.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
          path: '',
          redirectTo: '/instance',
          pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'instance',
        component: InstancesComponent,
      },
      {
        path: 'instance/:instanceId',
        component: QuestionContainerComponent,
      },
      {
        path: 'instance/:instanceId/question/:questionId',
        component: QuestionComponent,
      }
    ]
  }
];
