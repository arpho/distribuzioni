import {
  ItemModelInterface,
  Genere
} from "../modules/item/models/itemModelInterface";
import { Value } from "../modules/item/models/value";

export class VolantinaggiModel implements ItemModelInterface {
  private periodo: { inizio: Date; fine: Date };
  public title: string;
  public note: string;
  public key: string;
  public archived: boolean;
  private volantini: Number;
  private locandine: Number;
  private manifesti: Number;
  getEditPopup() {}

  getCreatePopup() {}

  aggregateAction() {}

  serialize() {}

  getElement() {
    const genere: Genere = "o";
    return { element: "volantinaggio", genere: genere };
  }
  getAggregate() {
    return new Value("aggregato", "to be implemented");
  }

  isArchived() {
    return this.archived;
  }

  getNote() {
    return new Value("nota", this.note);
  }

  getTitle() {
    return new Value(this.title, "volantinaggio");
  }

  archiveItem(archived) {
    this.archived = archived;
  }

  getValue2() {
    return new Value("volantini acquiastati", this.volantini);
  }

  getValue3() {
    return new Value("locandine acquistate", this.locandine);
  }

  getValue4() {
    return new Value(
      "manifesti",
      this.manifesti || "non sono stati affissi manifesti"
    );
  }
}
