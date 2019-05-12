import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface";
import { ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { LeafletingModel } from "../models/volantinaggi";

@Injectable({
  providedIn: "root"
})
export class DistribuzioniService implements ItemServiceInterface {
  public leafletingListRef: firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.leafletingListRef = firebase.database().ref("/distributions");
      }
    });
  }
  getItem(key: string) {
    if (this.leafletingListRef) {
      return this.leafletingListRef.child(key);
    }
  }

  updateItem(item: ItemModelInterface) {
    return this.leafletingListRef.child(item.key).update(item.serialize());
  }

  deleteItem(key: string) {
    return this.leafletingListRef.child(key).remove();
  }

  getDummyItem() {
    return new LeafletingModel();
  }

  createItem(item: ItemModelInterface) {
    return this.leafletingListRef.push(item.serialize());
  }

  getEntitiesList(): firebase.database.Reference {
    return this.leafletingListRef;
  }
}
