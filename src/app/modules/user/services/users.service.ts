import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { ItemServiceInterface } from "../../item/models/ItemServiceInterface";
import { UserModel } from "../models/userModel";
import { ItemModelInterface } from "../../item/models/itemModelInterface";

@Injectable({
  providedIn: "root"
})
export class UsersService implements ItemServiceInterface {
  public usersRef: firebase.database.Reference;

  constructor() {
    this.usersRef = firebase.database().ref("/userProfile");
  }

  getItem(key: string) {
    if (this.usersRef) {
      return this.usersRef.child(key);
    }
  }

  deleteItem(key: string) {
    return this.usersRef.child(key).remove();
  }

  getDummyItem() {
    return new UserModel();
  }

  createItem(item: ItemModelInterface) {
    return this.usersRef.push(item.serialize());
  }

  getEntitiesList(): firebase.database.Reference {
    return this.usersRef;
  }

  updateItem(item: ItemModelInterface) {
    return this.usersRef.child(item.key).update(item.serialize());
  }
}
