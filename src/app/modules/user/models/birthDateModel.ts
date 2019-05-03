export class BirthDateModel {
  day: number;
  month: number;
  year: number;
  constructor(d?: { year: number; month: number; day: number }) {
    if (d) {
      this.day = d.day;
      this.month = d.month;
      this.year = d.year;
    }
  }
  formatDate() {
    const mm = this.month + 1;
    const dd = this.day;
    return [this.year, (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join(
      "-"
    );
  }
}
