import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DistribuzioneDetailPage } from "./distribuzione-detail.page";
import { DynamicFormModule } from "src/app/modules/dynamic-form/dynamic-form.module";

const routes: Routes = [
  {
    path: "",
    component: DistribuzioneDetailPage
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
  declarations: [DistribuzioneDetailPage]
})
export class DistribuzioneDetailPageModule {}
