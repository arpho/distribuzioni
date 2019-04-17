import { Component, OnInit } from "@angular/core";
import { VolantinaggiModel } from "../models/volantinaggi";
import { DistribuzioniService } from "../services/distribuzioni-service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  public distribuitionList = Array<VolantinaggiModel>();
  constructor(public distributions: DistribuzioniService) {}
  ngOnInit() {
    if (this.distributions.getEntitiesList()) {
      this.distributions.getEntitiesList().on("value", snapshot => {
        // console.log("distribuzioni", snapshot);
        this.distribuitionList = [];
        snapshot.forEach(snap => {
          const distribuition = new VolantinaggiModel();
          distribuition.load(snap.key, this.distributions);
          this.distribuitionList.push(distribuition);
          console.log(this.distribuitionList, "distribuzione");
        });
      });
    }
  }
}
