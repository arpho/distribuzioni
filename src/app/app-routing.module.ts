import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'profile', loadChildren: './modules/user/pages/profile/profile.module#ProfilePageModule' },
  { path: 'signup', loadChildren: './modules/user/pages/signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './modules/user/pages/login/login.module#LoginPageModule' },
  { path: 'reset-password', loadChildren: './modules/user/pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'user', loadChildren: 'app/modules/user.module#UserMOdule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
