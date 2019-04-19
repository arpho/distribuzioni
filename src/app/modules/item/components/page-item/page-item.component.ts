import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { MyItemComponent } from "../item/item.component";
import { AlertController } from "@ionic/angular";
import { ItemModelInterface } from "../../models/itemModelInterface";

@Component({
  selector: "app-page-item",
  templateUrl: "./page-item.page.html",
  styleUrls: ["./page-item.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageItemComponent extends MyItemComponent implements OnInit {
  @Input() Item: ItemModelInterface;

  constructor(alertCtrl: AlertController) {
    super(alertCtrl);
  }

  ngOnInit() {}
}
