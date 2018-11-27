import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from 'app/login/login.component';
import { AuthGuard } from 'app/AuthServices/auth.guard';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';

// import { AuthService } from './auth.service'
// import { AuthGuard } from './auth.guard';


const appRoutes:Routes = [

  {
    path: '',
    component: LoginComponent
  }
]

// const appRoutes: Routes = [
//   // { path: '', component: DashboardComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
//   { path: '', component: LoginComponent},
//   // { path: '/user-profile', component: UserProfileComponent },
//   // { path: '/dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
// ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    FooterComponent,           
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }

