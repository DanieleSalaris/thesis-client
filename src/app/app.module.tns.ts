import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule} from '@nativescript/angular';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import {declarations} from '@src/app/global/module/declarations';
import {providers} from '@src/app/global/module/providers';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MobileInterceptorTns} from '@src/app/global/mobile.interceptor';
import {TNSCheckBoxModule} from '@nstudio/nativescript-checkbox/angular';
import {ReactiveFormsModule} from '@angular/forms';


// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: declarations,
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
    TNSCheckBoxModule,
  ],
  providers: [
    ...providers,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MobileInterceptorTns,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
