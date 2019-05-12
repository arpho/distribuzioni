import {
  ItemModelInterface,
  Genere
} from "../../item/models/itemModelInterface";
import { ItemServiceInterface } from "../../item/models/ItemServiceInterface";
import { Value } from "../../item/models/value";
import { BirthDateModel } from "./birthDateModel";
import { RoleModel } from "./privilegesLevelModel";
import { configs } from "src/app/configs/configs";
export class UserModel implements ItemModelInterface {
  birthDate: BirthDateModel; // { day: number; month: number; year: number };
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  key: string;
  level: Number;
  enabled: Boolean;
  privileges: RoleModel;

  constructor(item?: Object) {
    if (item) {
      this.build(item);
    }
  }

  getNote() {
    return new Value(`${this.firstName} ${this.lastName}`, "user");
  }

  getTitle() {
    return new Value(this.email, "user");
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
      (access: RoleModel) => access.level == this.level
    )[0];
  }

  serialize() {
    return {
      key: this.key,
      birthDate: this.birthDate.serialize(),
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      enabled: this.enabled,
      level: this.privileges.level
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
    const value = new Value(this.level, "livello");
    return value;
  }

  getValue2() {
    const value = new Value(
      this.enabled ? " abilitato" : " non abilitato",
      " abilitato"
    );
    return value;
  }

  getValue4() {
    const value = new Value(this.enabled, " abilitato");
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
    return new Value("aggregato", "to be implemented");
  }

  getCreatePopup() {
    return "to be implemented";
  }

  getElement() {
    const genere: Genere = "o";
    return { element: "volantinaggio", genere: genere };
  }
}
