import {
  ItemModelInterface,
  Genere
} from "../modules/item/models/itemModelInterface";
import { Value } from "../modules/item/models/value";

export class VolantinaggiModel implements ItemModelInterface {
  constructor(model?: {
    title: string;
    archived: boolean;
    startDate: string;
    endDate: string;
    note: string;
  }) {
    if (model) {
      this.title = model.title;
      this.archived = model.archived;
      this.periodo = {
        inizio: new Date(model.startDate),
        fine: new Date(model.endDate)
      };
      this.note = model.note;
    }
  }
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

  formatDate(d: Date) {
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate()
    };
  }

  serialize() {
    return {
      // key: this.key,
      title: this.title,
      note: this.note,
      archived: this.archived || false,
      volantini: this.volantini || 0,
      locandine: this.locandine || 0,
      manifesti: this.manifesti || 0,
      inizio: this.formatDate(this.periodo.inizio),
      fine: this.formatDate(this.periodo.fine)
    };
  }

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

  build(item: Object) {
    const loader = ([Key, value]) => {
      this[Key] = value;
    };
    Object.entries(item).forEach(loader);
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
