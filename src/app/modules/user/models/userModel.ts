import {
  ItemModelInterface,
  Genere
} from "../../item/models/itemModelInterface";
import { ItemServiceInterface } from "../../item/models/ItemServiceInterface";
import { Value } from "../../item/models/value";
import { BirthDateModel } from "./birthDateModel";
import { RoleModel } from "./privilegesLevelModel";
import { configs } from "src/app/configs/configs";
import { QuickAction } from "../../item/models/QuickAction";
export class UserModel implements ItemModelInterface {
  birthDate: BirthDateModel; // { day: number; month: number; year: number };
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  key: string;
  level: Number;
  quickActions: Array<QuickAction>;
  enabled: Boolean;
  privileges: RoleModel;

  constructor(item?: Object) {
    if (item) {
      this.build(item);
    }
    this.quickActions = [
      new QuickAction({
        icon: "create",
        title: "modifica",
        description: "",
        action: (args: { alertCtrl: any; router: any }) => {
          args.router.navigate([this.getEditPopup(), this.key]);
        }
      })
    ];
  }

  getNote() {
    return new Value({
      value: `${this.firstName} ${this.lastName}`,
      label: "user"
    });
  }

  getTitle() {
    return new Value({ value: this.email, label: "user mail" });
  }

  build(item: Object) {
    const loader = ([Key, value]) => {
      this[Key] = value;
    };
    Object.entries(item).forEach(loader);
    if (item["birthDate"]) {
      this.birthDate = new BirthDateModel(item["birthDate"]);
    }
    this.privileges = configs.accessLevel.filter(
      (access: RoleModel) => access.value == this.level
    )[0];
  }
  hasQuickActions() {
    return true;
  }
  getQuickActions() {
    return this.quickActions;
  }

  getCountingText() {
    return " utenti";
  }

  serialize() {
    return {
      key: this.key,
      birthDate: this.birthDate.serialize(),
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      enabled: this.enabled,
      level: this.privileges.value
    };
  }

  async load(key: string, service: ItemServiceInterface) {
    if (service.getItem(key)) {
      service.getItem(key).on("value", value => {
        this.build(value.val());
        this.key = key;
        return this;
      });
    }
    return this;
  }

  getValue3() {
    const ruolo: RoleModel = configs.accessLevel.filter(
      (v: RoleModel) => v.value == this.level
    )[0];
    const value = new Value({ value: ruolo.key, label: "ruolo " });
    return value;
  }

  getValue2() {
    const value = new Value({
      value: this.enabled ? "" : " non abilitato",
      label: " abilitato"
    });
    return value;
  }

  getValue4() {
    const value = new Value({
      value: this.enabled ? "si" : "no",
      label: " abilitato "
    });
    return value;
  }

  getEditPopup() {
    return "/user/edit-user";
  }
  /*
  getEditPopup(item, service) {
    return "to be implemented";
  }*/

  getAggregate() {
    return new Value({ label: "aggregato", value: "to be implemented" });
  }

  getCreatePopup() {
    return "to be implemented";
  }

  getElement() {
    const genere: Genere = "o";
    return { element: "volantinaggio", genere: genere };
  }
}
