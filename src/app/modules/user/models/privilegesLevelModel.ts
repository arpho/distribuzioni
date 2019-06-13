import { ComboValue } from "../../dynamic-form/models/ComboValueinterface";
export class RoleModel implements ComboValue {
  public value: number;
  public key: string;

  constructor(level: { key: string; level: number }) {
    this.value = level.level;
    this.key = level.key;
  }
  isAllowed(Level: RoleModel) {
    return this.value <= Level.value;
  }
}
