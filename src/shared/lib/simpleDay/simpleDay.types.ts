import type { SimpleDay } from './simpleDay';

export type TimeUnit =
  | 'year'
  | 'years'
  | 'month'
  | 'months'
  | 'day'
  | 'days'
  | 'hour'
  | 'hours'
  | 'minute'
  | 'minutes'
  | 'second'
  | 'seconds'
  | 'millisecond'
  | 'milliseconds';

export type AnyDate = SimpleDay | Date | string | number;
