import {
  ItemModelInterface,
  Genere
} from "../modules/item/models/itemModelInterface";
import { Value } from "../modules/item/models/value";
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface";

export class LeafletingModel implements ItemModelInterface {
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
    } else {
      this.periodo = { inizio: new Date(), fine: new Date() };
    }
  }
  public periodo: { inizio: Date; fine: Date };
  public title: string;
  public note: string;
  public key: string;
  public archived: boolean;
  private volantini: Number;
  private locandine: Number;
  private manifesti: Number;
  getEditPopup() {
    return "/distribuzione-detail";
  }

  getCreatePopup() {}

  aggregateAction() {}

  formatDate(d: Date) {
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate()
    };
  }

  updateItem(newItem: any /*
   carica le modifiche nel modello
  */) {
    this.title = newItem["title"];
    this.note = newItem["note"];
    this.archived = newItem["archived"];
    this.periodo.inizio = new Date(newItem["startDate"]);
    this.periodo.fine = new Date(newItem["endDate"]);
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

  load(key: string, service: ItemServiceInterface) {
    if (service.getItem(key)) {
      service.getItem(key).on("value", value => {
        if (value.val()) {
          Object.entries(value.val()).forEach(v => {
            this[v[0]] = v[1];
          });
        }
        this.periodo = {
          inizio: new Date(
            this["inizio"].year,
            this["inizio"].month,
            this["inizio"].day
          ),
          fine: new Date(
            this["fine"].year,
            this["fine"].month,
            this["fine"].day
          )
        };
        this.key = key;
      });
    }
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
    return new Value(this.volantini, "volantini stamp");
  }

  getValue3() {
    return new Value(this.locandine, "locandine acquistate");
  }

  getValue4() {
    return new Value(this.manifesti || 0, "manifesti");
  }
}
