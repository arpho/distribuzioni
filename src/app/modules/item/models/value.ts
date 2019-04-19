export class Value {
  label: string;
  value: string | Number;

  constructor(value: string | Number, label: string) {
    this.label = label;
    this.value = value;
  }
}
