import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';

const MaterialComponents = [
  BrowserModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatInputModule,
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {}
