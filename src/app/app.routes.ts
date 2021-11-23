import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import {QuestionComponent} from '@src/app/survey/question/question.component';
import {InstancesComponent} from '@src/app/survey/instances/instances.component';
import {LoginComponent} from '@src/app/auth/login/login.component';
import {AuthGuard} from '@src/app/auth/guards/auth.guard';
import {QuestionContainerComponent} from '@src/app/survey/question-container/question-container.component';
import {TodayInstanceComponent} from '@src/app/survey/instances/today-instance/today-instance.component';
import {LoginGuard} from '@src/app/auth/login/login.guard';
import {DataVisualizationComponent} from '@src/app/admin/data-visualization/data-visualization.component';
import {AdminGuard} from '@src/app/auth/guards/admin.guard';
import {UserGuard} from '@src/app/auth/guards/user.guard';
import {RoleRedirect} from '@src/app/auth/role-redirect/role-redirect';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'role-redirect',
    component: RoleRedirect,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'data-visualization',
        component: DataVisualizationComponent
      },
      {
        path: '',
        redirectTo: '/admin/data-visualization',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard, UserGuard],
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
        component: TodayInstanceComponent,
        // component: InstancesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'instance/:instanceId',
        component: QuestionContainerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'instance/:instanceId/question/:questionId',
        component: QuestionComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
];
