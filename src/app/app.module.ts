import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import {HttpClientModule} from '@angular/common/http';
import {declarations} from '@src/app/global/module/declarations';
import {providers} from '@src/app/global/module/providers';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@src/app/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: declarations,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSliderModule,
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
