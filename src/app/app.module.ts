import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import {HttpClientModule} from '@angular/common/http';
import {declarations} from '@src/app/global/module/declarations';
import {providers} from '@src/app/global/module/providers';


@NgModule({
  declarations: declarations,
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }