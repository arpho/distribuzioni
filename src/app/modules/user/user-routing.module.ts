import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./services/authguard.service";

const routes: Routes = [
  {
    path: "user/profile",
    loadChildren: "./pages/profile/profile.module#ProfilePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "signup",
    loadChildren: "./pages/signup/signup.module#SignupPageModule"
  },
  {
    path: "user/login",
    loadChildren: "./pages/login/login.module#LoginPageModule"
  },
  {
    path: "reset-password",
    loadChildren:
      "./pages/reset-password/reset-password.module#ResetPasswordPageModule"
  },
  { path: "users", loadChildren: "./pages/users/users.module#UsersPageModule" },
  {
    path: "user/edit-user/:key",
    loadChildren: "./pages/edit-user/edit-user.module#EditUserPageModule"
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
