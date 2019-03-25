import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SerService } from './ser.service';
import { ClientservService} from './facade/client/clientserv.service'
import { CompanyservService} from './facade/company/companyserv.service'
import { AdminservService} from './facade/admin/adminserv.service'
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ClientComponent } from './facade/client/client.component'
import { importType } from '@angular/compiler/src/output/output_ast';
import { CompanyComponent } from './facade/company/company.component';
import { AdminComponent } from './facade/admin/admin.component';
import { PaypalclientComponent } from './home/option/paypalclient/paypalclient.component';
import { Page404Component } from './page404/page404.component';
import { OptionComponent } from './home/option/option.component';
import { SystemComponent } from './home/system/system.component';
import { HomenavComponent } from './home/homenav/homenav.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    ClientComponent,
    CompanyComponent,
    AdminComponent,
    PaypalclientComponent,
    Page404Component,
    OptionComponent,
    SystemComponent,
    HomenavComponent,
    LayoutComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SerService,ClientservService,CompanyservService,AdminservService],
  bootstrap: [AppComponent]
})
export class AppModule { }
