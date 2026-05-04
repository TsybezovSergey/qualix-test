type AnyDate = SimpleDay | Date | string | number;

export class SimpleDay {
  private _date: Date;

  constructor(date: AnyDate = new Date()) {
    if (date instanceof SimpleDay) {
      this._date = new Date(date._date);
    } else if (date instanceof Date) {
      this._date = new Date(date.getTime());
    } else {
      this._date = new Date(date);
    }
  }

  format(): string {
    const pad = (n: number, len = 2) => String(n).padStart(len, '0');
    const year = this._date.getFullYear();
    const month = this._date.getMonth() + 1;
    const day = this._date.getDate();
    const hours = this._date.getHours();
    const minutes = this._date.getMinutes();
    const seconds = this._date.getSeconds();

    return `${year}-${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
}

export function simpleDay(date?: AnyDate): SimpleDay {
  return new SimpleDay(date);
}
