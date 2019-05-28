import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { MyItemComponent } from "../item/item.component";
import { AlertController } from "@ionic/angular";
import { ItemModelInterface } from "../../models/itemModelInterface";
import { ItemServiceInterface } from "../../models/ItemServiceInterface";
import { QuickAction } from "../../models/QuickAction";

@Component({
  selector: "app-page-item",
  templateUrl: "./page-item.page.html",
  styleUrls: ["./page-item.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageItemComponent extends MyItemComponent implements OnInit {
  @Input() Item: ItemModelInterface;
  @Input() Service: ItemServiceInterface;

  constructor(public alertCtrl: AlertController) {
    super(alertCtrl);
  }

  ngOnInit() {}
  doAction(action: QuickAction) {
    action.getAction()({
      alertCtrl: this.alertCtrl,
      router: 2,
      Service: this.Service
    });
  }
}
