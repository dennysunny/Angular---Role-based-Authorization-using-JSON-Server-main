import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalutationPipe } from './salutation.pipe';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { JsonServerUrlInterceptor } from './json-server-url.interceptor';
import { CommonComponentsModule } from './common/common-components/common-components.module';

@NgModule({
  declarations: [
    AppComponent,
    SalutationPipe,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserlistComponent,
    UpdatepopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({
      // timeOut: 4000,
      // positionClass: 'toast-top-right'
    }), // ToastrModule added
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonComponentsModule,
    FormsModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : JsonServerUrlInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
