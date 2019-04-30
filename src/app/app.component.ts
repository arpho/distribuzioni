import { Component } from "@angular/core";
import * as firebase from "firebase/app";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { configs } from "./configs/configs";
import { InfoService } from "./modules/info/services/info/info.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "List",
      url: "/list",
      icon: "list"
    },
    { title: "info", url: "/info/release", icon: "information-circle-outline" }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private info: InfoService,
    private router: Router
  ) {
    this.initializeApp();
    if (!firebase.apps.length) {
      firebase.initializeApp(configs.firebase);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    /* this.info.areThereNews().then(news => {
      if (news > 0) {
        this.router.navigateByUrl("info/release");
      } else {
        this.router.navigateByUrl("home");
      }
    });*/

    this.info.navigateTo().then(path => {
      console.log("path to ", path);
      this.router.navigateByUrl(path);
    });
  }
}
