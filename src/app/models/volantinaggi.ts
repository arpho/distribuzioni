import {
  ItemModelInterface,
  Genere
} from "../modules/item/models/itemModelInterface";

import { Value } from "../modules/item/models/value";

import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface";

import { QuickAction } from "../modules/item/models/QuickAction";

export class LeafletingModel implements ItemModelInterface {
  /**
   * name
   */
  public name() {}

  quickActions: Array<QuickAction>;

  constructor(model?: {
    title: string;
    archived: boolean;
    startDate: string;
    endDate: string;
    note: string;
  }) {
    this.quickActions = [
      new QuickAction({
        icon: "paper-plane",
        title: "aggiungi volantini",
        // tslint:disable-next-line: max-line-length
        description: "incrementa il numero dei volantini stampati",
        action: this.addLeftflyer
      }),
      new QuickAction({
        icon: "paper",
        title: "aggiungi locandine",
        // tslint:disable-next-line: max-line-length
        description: "incrementa il numero delle locandine stampate",
        action: this.addPosters
      }),
      new QuickAction({
        icon: "today",
        title: "aggiungi manifesti",
        // tslint:disable-next-line: max-line-length
        description: "incrementa il numero dei manifesti affissi",
        action: this.addManifesti
      }),
      new QuickAction({
        icon: "create",
        title: "modifica",
        description: "",
        action: (args: { alertCtrl: any; router: any }) => {
          args.router.navigate([this.getEditPopup(), this.key]);
        }
      })
    ];

    if (model) {
      this.title = model.title;
      this.archived = model.archived;

      this.periodo = {
        inizio: new Date(model.startDate),
        fine: new Date(model.endDate)
      };
      this.note = model.note;
    } else {
      this.periodo = {
        inizio: new Date(),
        fine: new Date()
      };
    }
  }

  public periodo: {
    inizio: Date;
    fine: Date;
  };
  public title: string;
  public note: string;
  public key: string;
  public archived: boolean;
  private volantini: number;
  private locandine: number;
  private manifesti: number;

  addPosters = async (args: {
    alertCtrl: any;
    router: any;
    Service: ItemServiceInterface;
  }) => {
    const alert = await args.alertCtrl.create({
      header: "nuovi locandine stampate",
      subHeader: "",
      message: "This is an alert message.",
      inputs: [
        {
          name: "posters",
          type: "number",
          value: 0
        }
      ],
      buttons: [
        {
          text: "OK",
          handler: data => {
            this.locandine += parseInt(data.posters) || 0;
            args.Service.updateItem(this);
            alert.dismiss();
          }
        }
      ]
    });
    return await alert.present();
  };

  addManifesti = async (args: {
    alertCtrl: any;
    router: any;
    Service: ItemServiceInterface;
  }) => {
    const alert = await args.alertCtrl.create({
      header: "nuovi manifesti affissi",
      subHeader: "",
      message: "This is an alert message.",
      inputs: [
        {
          name: "manifesti",
          type: "number",
          value: 0
        }
      ],
      buttons: [
        {
          text: "OK",
          handler: data => {
            this.manifesti += parseInt(data.manifesti) || 0;
            args.Service.updateItem(this);
            alert.dismiss();
          }
        }
      ]
    });
    return await alert.present();
  };

  addLeftflyer = async (args: {
    alertCtrl: any;
    router: any;
    Service: ItemServiceInterface;
  }) => {
    const alert = await args.alertCtrl.create({
      header: "nuovi volantini stampati",
      subHeader: "",
      message: "This is an alert message.",
      inputs: [
        {
          name: "leftflyer",
          type: "number",
          value: 0
        }
      ],
      buttons: [
        {
          text: "OK",
          handler: data => {
            this.volantini += parseInt(data.leftflyer) || 0;
            args.Service.updateItem(this);
            alert.dismiss();
          }
        }
      ]
    });
    return await alert.present();
  };

  getQuickActions() {
    return this.quickActions;
  }

  hasQuickActions() {
    return true;
  }

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

  updateItem(
    newItem: any

    /*
   carica le modifiche nel modello
  */
  ) {
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

    return {
      element: "volantinaggio",
      genere: genere
    };
  }

  getAggregate() {
    return new Value({ label: "aggregato", value: "to be implemented" });
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
    return new Value({ value: this.note, label: "nota" });
  }

  build(item: Object) {
    const loader = ([Key, value]) => {
      this[Key] = value;
    };
    Object.entries(item).forEach(loader);
  }

  getTitle() {
    return new Value({ value: this.title, label: "volantinaggio" });
  }

  archiveItem(archived) {
    this.archived = archived;
  }

  getValue2() {
    return new Value({ value: this.volantini, label: "volantini stamp " });
  }

  getValue3() {
    return new Value({ value: this.locandine, label: "locandine acquistate " });
  }

  getValue4() {
    return new Value({ value: this.manifesti || 0, label: "manifesti " });
  }
}
