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
import {QuestionContainerComponent} from '@src/app/survey/question-container/question-container.component';
import {QuestionChoiceSliderComponent} from '@src/app/survey/question/question-choice-slider/question-choice-slider.component';
import {TodayInstanceComponent} from '@src/app/survey/instances/today-instance/today-instance.component';

export const declarations = [
  AppComponent,
  HomeComponent,
  LoginComponent,
  InstancesComponent,
  InstancesDummyComponent,
  InstanceComponent,
  TodayInstanceComponent,
  QuestionContainerComponent,
  QuestionComponent,
  QuestionDummyComponent,
  QuestionChoiceComponent,
  QuestionChoiceSliderComponent,
  QuestionArrayComponent,
  QuestionInputComponent,
  ConfirmButtonsComponent,
];
