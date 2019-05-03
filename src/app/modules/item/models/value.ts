export class Value {
  label: string;
  value: string | Number | Boolean;

  constructor(value: string | Number | Boolean, label: string) {
    this.label = label;
    this.value = value;
  }
}
