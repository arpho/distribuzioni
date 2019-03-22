import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface";
import { ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { VolantinaggiModel } from "../models/volantinaggi";

@Injectable({
  providedIn: "root"
})
export class DistribuzioniService implements ItemServiceInterface {
  public distributionsListRef: firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.distributionsListRef = firebase.database().ref("/distributions");
      }
    });
  }
  getItem(key: string) {
    return this.distributionsListRef.child(key);
  }

  updateItem(item: ItemModelInterface) {
    return this.distributionsListRef.child(item.key).update(item.serialize());
  }
  deleteItem(key: string) {
    return this.distributionsListRef.child(key).remove();
  }
  getDummyItem() {
    return new VolantinaggiModel();
  }

  createItem(item: ItemModelInterface) {
    console.log("creeatring item", item);

    return this.distributionsListRef.push(item.serialize());
  }

  getEntitiesList(): firebase.database.Reference {
    return this.distributionsListRef;
  }
}
