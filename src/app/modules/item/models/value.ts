export class Value {
  label: string;
  value: string | number;

  constructor(value, label) {
    this.label = label;
    this.value = value;
  }
}
