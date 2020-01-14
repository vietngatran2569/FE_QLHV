import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PmComponent } from './pm/pm.component';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import {SyllabusComponent} from './qlhv/syllabus/syllabus/syllabus.component';
import {SyllabusListComponent} from './qlhv/syllabus/syllabus-list/syllabus-list.component';
import {SyllabusEditComponent} from './qlhv/syllabus/syllabus-edit/syllabus-edit.component';
import {SyllabusAddComponent} from './qlhv/syllabus/syllabus-add/syllabus-add.component';
import {ObjectiveListComponent} from './qlhv/objective/objective-list/objective-list.component';
import {ObjectiveEditComponent} from './qlhv/objective/objective-edit/objective-edit.component';
import {ObjectiveAddComponent} from './qlhv/objective/objective-add/objective-add.component';
import {SkillEditComponent} from './qlhv/skill/skill-edit/skill-edit.component';
import {SkillAddComponent} from './qlhv/skill/skill-add/skill-add.component';
import {SkillListComponent} from './qlhv/skill/skill-list/skill-list.component';
import {ActivityListComponent} from './qlhv/activity/activity-list/activity-list.component';
import {ActivityEditComponent} from './qlhv/activity/activity-edit/activity-edit.component';
import {RouterModule} from '@angular/router';
import {ActivityAddComponent} from './qlhv/activity/activity-add/activity-add.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    SyllabusComponent,
    SyllabusListComponent,
    SyllabusEditComponent,
    SyllabusAddComponent,
    ObjectiveListComponent,
    ObjectiveEditComponent,
    ObjectiveAddComponent,
    SkillEditComponent,
    SkillAddComponent,
    SkillListComponent,
    ActivityListComponent,
    ActivityEditComponent,
    ActivityAddComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
