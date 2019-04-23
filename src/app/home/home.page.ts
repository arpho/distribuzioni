import { Component, OnInit } from "@angular/core";
import { LeafletingModel } from "../models/volantinaggi";
import { DistribuzioniService } from "../services/distribuzioni-service";
import { ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { ItemModule } from "../modules/item/item.module";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  public distributionsList = Array<LeafletingModel>();
  public filterFunction: (item: ItemModelInterface) => Boolean;
  constructor(public distributions: DistribuzioniService) {}
  ngOnInit() {
    if (this.distributions.getEntitiesList()) {
      this.distributions.getEntitiesList().on("value", snapshot => {
        // console.log("distribuzioni", snapshot);
        this.distributionsList = [];
        snapshot.forEach(snap => {
          const distribuition = new LeafletingModel();
          distribuition.load(snap.key, this.distributions);
          this.distributionsList.push(distribuition);
        });
      });
    }
  }
}
