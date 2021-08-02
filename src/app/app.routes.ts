import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import {QuestionComponent} from '@src/app/survey/question/question.component';
import {InstancesComponent} from '@src/app/survey/instances/instances.component';
import {LoginComponent} from '@src/app/auth/login/login.component';
import {AuthGuard} from '@src/app/auth/auth.guard';

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
          redirectTo: '/home',
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
        path: 'instance',
        component: InstancesComponent,
      },
      {
        path: 'instance/:instanceId/question/:questionId',
        component: QuestionComponent,
      }
    ]
  }
];
