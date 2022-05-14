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

function nextMidnight() {
   const oneDayMillis = 24 * 60 * 60 * 1000
   const someTimeTomorrow = new Date(Date.now() + oneDayMillis)
   someTimeTomorrow.setHours(0)
   someTimeTomorrow.setMinutes(0)
   someTimeTomorrow.setSeconds(0)
   someTimeTomorrow.setMilliseconds(0)
   return someTimeTomorrow
}
 
function happensTomorrow(event:Date) {
   return event > nextMidnight()
}

function treatAsUTC(date:Date) {
   var result = new Date(date);
   result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
   return result;
}

export function daysBetween(start:Date, end:Date) {
   const millisecondsPerDay = 24 * 60 * 60 * 1000
   return (+treatAsUTC(end) - +treatAsUTC(start)) / millisecondsPerDay
}
