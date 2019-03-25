import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ClientComponent } from './facade/client/client.component';
import { CompanyComponent } from './facade/company/company.component';
import { AdminComponent } from './facade/admin/admin.component';
import { Page404Component } from './page404/page404.component';
import { OptionComponent } from './home/option/option.component';
import { SystemComponent } from './home/system/system.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginGuardService } from './guardService/login-guard.service';
import { LoginCompanyGuardService } from './guardService/login-company-guard.service';
import { LoginAdminGuardService } from './guardService/login-admin-guard.service';

const routes: Routes = [
 {path: 'home', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'Shopping-cart', component:OptionComponent},
  {path: 'system/:id', component:SystemComponent},
  {path: 'login', component:LoginComponent},
  {path: 'client', component:ClientComponent, canActivate : [LoginGuardService]},
  {path: 'company', component:CompanyComponent , canActivate : [LoginCompanyGuardService]},
  {path: 'admin', component:AdminComponent ,  canActivate : [LoginAdminGuardService]},
 {path :"",redirectTo : "home", pathMatch : "full"},
 {path : "**",component : Page404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
