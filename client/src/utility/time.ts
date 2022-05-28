/**
 * Check whether two dates `t1` and `t2` are on the same calendar day.
 * @example
 * const t1 = new Date()
 * const t2 = new Date()
 * isSameDay(t1, t2) // true
 */
export function isSameDay(maybe:Date|null, now = new Date()) {
   return now.toJSON().slice(0, 10) === maybe?.toJSON().slice(0, 10)
}

function treatAsUTC(date:Date) {
   var result = new Date(date);
   result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
   return result;
}

/**
 * Maps `date` object into UTC string `YYYY-MM-DD`.
 * @example
 * const date = new Date()
 * dateToString(date) // "2020-01-01"
 */
export function dateToString(date:Date) {
   return date.toJSON().slice(0, 10)
}

/**
 * Maps `start` and `end` Date objects into a difference of decimal days.
 * @example
 * let d1 = new Date("June 2, 2020")
 * let d2 = new Date("June 20, 2020")
 * let d3 = new Date("June 20, 2020 12:00:00")
 * daysBetween(d1, d2) // => 18
 * daysBetween(d2, d1) // => -18
 * daysBetween(d1, d3) // => 18.5
 */
export function daysBetween(start:Date, end:Date) {
   const millisecondsPerDay = 24 * 60 * 60 * 1000
   const difference = (+treatAsUTC(end) - +treatAsUTC(start)) / millisecondsPerDay
   return difference
}