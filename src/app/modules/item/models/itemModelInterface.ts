import { Value } from "./value";
import { ItemServiceInterface } from "./ItemServiceInterface";
import { AlertOptions } from "@ionic/core";
import { ItemFilterOPtions } from "./ItemFIlterOptions";

export type Genere = "o" | "a";

export interface ItemModelInterface {
  title: string;
  note: string;
  key: string;
  archived: boolean;
  getTitle(): Value;
  getNote(): Value;
  isArchived(): boolean;
  archiveItem(b: boolean);
  getValue2(): Value;
  getValue3(): Value;
  getValue4(): Value;
  getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface): any;
  getCreatePopup(service?: ItemServiceInterface): string | any;

  /**ritorna l'etichetta e il valore da visualizzare del campo aggregato **/
  getAggregate(): Value;
  aggregateAction(): any | void;
  serialize();
  getElement(): { element: string; genere: Genere };

  /**ritorna il nome del tipo di elemento
   * @returns {element:string,genere:'o'|'a'}
   */
}
