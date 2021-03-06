import {AppComponent} from '@src/app/app.component';
import {HomeComponent} from '@src/app/home/home.component';
import {QuestionComponent} from '@src/app/survey/question/question.component';
import {QuestionChoiceComponent} from '@src/app/survey/question/question-choice/question-choice.component';
import {QuestionArrayComponent} from '@src/app/survey/question/question-array/question-array.component';
import {QuestionInputComponent} from '@src/app/survey/question/question-input/question-input.component';
import {ConfirmButtonsComponent} from '@src/app/survey/question/confirm-buttons/confirm-buttons.component';
import {QuestionDummyComponent} from '@src/app/survey/question/question-dummy/question-dummy.component';
import {InstancesComponent} from '@src/app/survey/instances/instances.component';
import {InstancesDummyComponent} from '@src/app/survey/instances/instances-dummy/instances-dummy.component';
import {InstanceComponent} from '@src/app/survey/instances/instance/instance.component';
import {LoginComponent} from '@src/app/auth/login/login.component';
import {QuestionRedirectionComponent} from '@src/app/survey/question-redirection/question-redirection.component';
import {QuestionChoiceSliderComponent} from '@src/app/survey/question/question-choice-slider/question-choice-slider.component';
import {TodayInstanceComponent} from '@src/app/survey/instances/today-instance/today-instance.component';
import {DataVisualizationComponent} from '@src/app/admin/data-visualization/data-visualization.component';
import {DataVisualizationRowComponent} from '@src/app/admin/data-visualization/data-visualization-row/data-visualization-row.component';
import {RoleRedirect} from '@src/app/auth/role-redirect/role-redirect';

export const declarations = [
  AppComponent,
  HomeComponent,
  LoginComponent,
  RoleRedirect,
  InstancesComponent,
  InstancesDummyComponent,
  InstanceComponent,
  TodayInstanceComponent,
  QuestionRedirectionComponent,
  QuestionComponent,
  QuestionDummyComponent,
  QuestionChoiceComponent,
  QuestionChoiceSliderComponent,
  QuestionArrayComponent,
  QuestionInputComponent,
  ConfirmButtonsComponent,
  DataVisualizationComponent,
  DataVisualizationRowComponent,
];
