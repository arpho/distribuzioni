import { Component, OnInit } from "@angular/core";
import { QuestionBase } from "src/app/modules/item/models/question-base";
import { TextboxQuestion } from "src/app/modules/item/models/question-textbox";
import { SwitchQuestion } from "src/app/modules/item/models/question-switch";
import { DateQuestion } from "src/app/modules/dynamic-form/models/question-date";
import { LeafletingModel } from "src/app/models/volantinaggi";
import { DistribuzioniService } from "src/app/services/distribuzioni-service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { ImagePicker } from "@ionic-native/image-picker/ngx";

@Component({
  selector: "app-distribuzione-detail",
  templateUrl: "../distribuzione-create/distribuzione-create.page.html",
  styleUrls: ["./distribuzione-detail.page.scss"]
})
export class DistribuzioneDetailPage implements OnInit {
  title: string;
  questions: any;
  text: string;
  submitText: String;
  currentLeafleting: LeafletingModel;
  options: any;

  constructor(
    public route: ActivatedRoute,
    private imagePicker: ImagePicker,
    public service: DistribuzioniService,
    public router: Router,
    private toastCtrl: ToastController
  ) {}
  filter(ev) {}
  submit(ev) {
    this.currentLeafleting.updateItem(ev);

    this.service
      .updateItem(this.currentLeafleting)
      .then(v => {
        this.presentToast(" volantinaggio modificato");
        this.router.navigate(["/home"]);
      })
      .catch(e => {
        console.log("error", e);
        this.presentToast("si è verificato un errore riprova");
        this.router.navigate(["/home"]);
      });
  }

  presentToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top"
    });
  }

  pick() {
    this.imagePicker.getPictures(this.options).then(
      results => {
        for (var i = 0; i < results.length; i++) {
          console.log("Image URI: " + results[i]);
          this.text = "Image URI: " + results[i];
        }
      },
      err => {
        this.text = err;
      }
    );
  }

  ngOnInit() {
    const leafleting_key = this.route.snapshot.paramMap.get("key");
    this.currentLeafleting = new LeafletingModel();
    this.currentLeafleting.load(leafleting_key, this.service);

    this.title = this.currentLeafleting.title;
    const today = new Date();
    const myFormat = (d: Date) => {
      const mm = d.getMonth() + 1;
      const dd = d.getDate();
      return [
        d.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd
      ].join("-");
    };
    const questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: "title",
        label: "Denominazione volantinaggio",
        value: this.currentLeafleting.title,
        required: true,
        order: 1
      }),
      new SwitchQuestion({
        key: "archived",
        label: "archiviare volantinaggio ",
        labelTrue: "volantinaggio  archiviato",
        labelFalse: " volantinaggio attivo",
        iconTrue: "filing",
        iconFalse: "paper-plane",
        required: false,
        value: this.currentLeafleting.archived,
        order: 3
      }),
      new DateQuestion({
        key: "startDate",
        label: "Data di inizio",
        required: true,
        value: myFormat(this.currentLeafleting.periodo.inizio), // "2019-01-02",
        order: 4
      }),
      new DateQuestion({
        key: "endDate",
        label: "Data di fine",
        required: true,
        value: myFormat(this.currentLeafleting.periodo.fine), // "2019-01-02",
        order: 5
      }),
      new TextboxQuestion({
        key: "note",
        label: "Note",
        value: this.currentLeafleting.note,
        order: 6
      })
    ];
    this.questions = questions;
  }
}
