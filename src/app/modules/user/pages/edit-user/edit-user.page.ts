import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserModel } from "../../models/userModel";
import { UsersService } from "../../services/users.service";
import { QuestionBase } from "src/app/modules/item/models/question-base";
import { TextboxQuestion } from "src/app/modules/item/models/question-textbox";
import { SwitchQuestion } from "src/app/modules/item/models/question-switch";
import { DateQuestion } from "src/app/modules/dynamic-form/models/question-date";
import { BirthDateModel } from "../../models/birthDateModel";
import { DropdownQuestion } from "src/app/modules/dynamic-form/models/question-dropdown";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.page.html",
  styleUrls: ["./edit-user.page.scss"]
})
export class EditUserPage implements OnInit {
  currentUser: UserModel;
  questions: any;
  submitText: String;
  options: any;
  text: string;
  title: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public service: UsersService
  ) {}

  ngOnInit() {
    const userKey = this.route.snapshot.paramMap.get("key");
    this.currentUser = new UserModel();
    this.currentUser.key = userKey;
    this.currentUser.load(userKey, this.service);
    console.log("current user", this.currentUser);
    this.submitText = "modifica";
    this.title = this.currentUser.email;
    const questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: "firstName",
        label: "nome",
        value: this.currentUser.firstName,
        order: 1,
        required: true
      }),
      new TextboxQuestion({
        key: "lastName",
        label: "cognome",
        value: this.currentUser.lastName,
        order: 2
      }),
      new SwitchQuestion({
        key: "enabled",
        label: "abilitato",
        value: this.currentUser.enabled,
        labelTrue: "utente  abilitato",
        labelFalse: " utente non abilitato ",
        iconTrue: "happy",
        iconFalse: "remove-circle",
        order: 3
      }),
      new DateQuestion({
        key: "birthDate",
        label: "Data di nascita",
        required: true,
        value: new BirthDateModel(this.currentUser.birthDate).formatDate(), // "1977-03-16",
        order: 4
      }),
      new DropdownQuestion({
        key: "level",
        label: "livello autorizzazioni",
        options: [
          { key: "autorizzato", value: 3 },
          { key: "responsabile", value: 2 },
          { key: "sviluppatore", value: 1 }
        ],
        value: this.currentUser.level
      })
    ];
    this.questions = questions;
  }

  filter(ev) {}
  submit(ev) {
    console.log("submit", ev);
    ev.email = this.currentUser.email; // non modifico email
    const user = new UserModel(ev);
    user.key = this.currentUser.key;
    console.log("updating user", user);
    this.service
      .updateItem(user)
      .then(v => {
        console.log("updated", v);
        this.router.navigate(["/users"]);
      })
      .catch(e => {
        console.log("error", e);
      });
  }
}