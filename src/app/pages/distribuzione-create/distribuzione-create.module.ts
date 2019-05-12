import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DistribuzioneCreatePage } from "./distribuzione-create.page";
import { DynamicFormModule } from "../../modules/dynamic-form/dynamic-form.module";

const routes: Routes = [
  {
    path: "",
    component: DistribuzioneCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DynamicFormModule
  ],
  declarations: [DistribuzioneCreatePage]
})
export class DistribuzioneCreatePageModule {}
