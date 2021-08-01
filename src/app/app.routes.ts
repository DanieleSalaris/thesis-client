import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import {QuestionComponent} from '@src/app/survey/question/question.component';
import {InstancesComponent} from '@src/app/survey/instances/instances.component';
import {LoginComponent} from '@src/app/auth/login/login.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
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
];
