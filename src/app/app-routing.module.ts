import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./modules/user/services/authguard";
import { RoleGuardService } from "./modules/user/services/role-guards.service";
import { RoleModel } from "./modules/user/models/privilegesLevelModel";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule",
    canActivate: [RoleGuardService, AuthGuard],
    data: {
      expectedRole: [new RoleModel({ level: 3, key: "autorizzato" })]
    }
  },
  {
    path: "list",
    loadChildren: "./list/list.module#ListPageModule"
  },

  /* { path: 'profile', loadChildren: './modules/user/pages/profile/profile.module#ProfilePageModule' },
   { path: 'signup', loadChildren: './modules/user/pages/signup/signup.module#SignupPageModule' },
   { path: 'login', loadChildren: './modules/user/pages/login/login.module#LoginPageModule' },
   { path: 'reset-password', loadChildren: './modules/user/pages/reset-password/reset-password.module#ResetPasswordPageModule' },*/

  { path: "user", loadChildren: "./modules/user/user.module#UserModule" },
  { path: "info", loadChildren: "./modules/info/info.module#InfoModule" },
  {
    path: "distribuzione-detail/:key",
    loadChildren:
      "./pages/distribuzione-detail/distribuzione-detail.module#DistribuzioneDetailPageModule"
  },
  {
    path: "distribuzione-create",
    loadChildren:
      "./pages/distribuzione-create/distribuzione-create.module#DistribuzioneCreatePageModule",
    canActivate: [AuthGuard],
    data: {
      expectedRole: [new RoleModel({ level: 2, key: "responsabile" })]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes /* { enableTracing: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
