import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
// import { decode } from "jwt-decode";
import * as firebase from "firebase/app";
import "firebase/auth";
import { UsersService } from "./users.service";
import { UserModel } from "../models/userModel";

@Injectable({
  providedIn: "root"
})
export class RoleGuardService implements CanActivate {
  public loggedUser: UserModel;
  constructor(public router: Router, public Users: UsersService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole[0];
    console.log("roles", expectedRole);

    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        console.log(user);
        if (!this.Users.getLoggedUser()) {
          console.log("setting logged user");

          this.Users.setLoggedUser(user.uid);
        }
        return true;
      } else {
        console.log("User is not logged in");
        this.router.navigate(["/user/login"]);
      }
    });

    // const token = localStorage.getItem("token");
    // decode the token to get its payload
    // const tokenPayload = decode(token);
    /* 
    if (tokenPayload.role !== expectedRole) {
      this.router.navigate(["login"]);
      return false;
    }*/
    console.log("logged user", this.Users.getLoggedUser());
    return true; // this.Users.getLoggedUser().privileges.isAllowed(expectedRole);
  }
}
