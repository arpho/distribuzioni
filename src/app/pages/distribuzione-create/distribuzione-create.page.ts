import { Component, OnInit } from "@angular/core";
import { QuestionBase } from "src/app/modules/item/models/question-base";
import { TextboxQuestion } from "src/app/modules/item/models/question-textbox";
import { SwitchQuestion } from "src/app/modules/item/models/question-switch";
import { DateQuestion } from "src/app/modules/dynamic-form/models/question-date";

@Component({
  selector: "app-distribuzione-create",
  templateUrl: "./distribuzione-create.page.html",
  styleUrls: ["./distribuzione-create.page.scss"]
})
export class DistribuzioneCreatePage implements OnInit {
  title: string;
  questions: any;

  constructor() {}
  filter(ev) {}
  submit(ev) {
    console.log(ev);
  }

  ngOnInit() {
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
    this.title = "nuovo volantinaggio";
    const questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: "title",
        label: "Denominazione volantinaggio",
        // value: 'Bombasto',
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
        order: 3
      }),
      new DateQuestion({
        key: "startDate",
        label: "Data di inizio",
        required: true,
        value: myFormat(today), // "2019-01-02",
        order: 4
      })
    ];
    this.questions = questions;
  }
}
