import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import {AuditoriesComponent} from "./auditories/components/auditories.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularMaterialModule} from "./angular-material.module";
import {BaseFormComponent} from "./base.form.component";
import {AuditoryEditComponent} from "./auditories/components/auditory-edit.component";
import {LessonsComponent} from "./lessons/components/lessons.component";
import {LessonEditComponent} from "./lessons/components/lesson-edit.component";
import { TimetablesComponent } from "./timetables/components/timetables.component";
import { TimetableEditComponent } from './timetables/components/timetable-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    BaseFormComponent,
    HomeComponent,
    AuditoriesComponent,
    AuditoryEditComponent,
    LessonsComponent,
    LessonEditComponent,
    TimetablesComponent,
    TimetableEditComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'auditories', component: AuditoriesComponent },
      { path: 'auditory/:id', component: AuditoryEditComponent },
      { path: 'auditory', component: AuditoryEditComponent },
      { path: 'lessons', component: LessonsComponent },
      { path: 'lesson/:id', component: LessonEditComponent },
      { path: 'lesson', component: LessonEditComponent },
      { path: 'timetables', component: TimetablesComponent },
      { path: 'timetable/:id', component: TimetableEditComponent },
      { path: 'timetable', component: TimetableEditComponent },
    ]),
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
