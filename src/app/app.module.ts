import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { UserModule } from "./modules/user/user.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { ItemModule } from "./modules/item/item.module";
import { DynamicFormModule } from "./modules/dynamic-form/dynamic-form.module";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { InfoModule } from "./modules/info/info.module";
import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    DynamicFormModule,
    IonicStorageModule.forRoot(),
    BrowserModule,
    ItemModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    UserModule,
    InfoModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
