import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

    { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
    { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
    { path: 'user/login', loadChildren: './pages/login/login.module#LoginPageModule' },
    { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }