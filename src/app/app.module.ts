import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {AgmCoreModule} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { LoaderComponent } from './loader/loader.component';
import { LoadercontentComponent } from './loadercontent/loadercontent.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './AuthServices/auth.service'
import { AuthGuard } from './AuthServices/auth.guard';



@NgModule({

  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoaderComponent,
    LoadercontentComponent,
    LoginComponent
  ],

  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4y9znGOIhqwC3d_do5PBiRsqB6iI0Xmg',
    }),
    ReactiveFormsModule,
    MaterialModule,
    AgmJsMarkerClustererModule,
  ],
  entryComponents:[
    LoadercontentComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
