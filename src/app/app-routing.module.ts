import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {path : 'home' , component : HomeComponent, canActivate: [AuthGuard]},
  {path :'register', component: RegisterComponent},
  {path : 'login', component : LoginComponent, canActivate: [LoginGuard]},
  {path : 'users', component : UserlistComponent, canActivate: [AuthGuard]},
  {path : '', pathMatch : 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
