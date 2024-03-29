import { useRecoilState, useRecoilValue } from "recoil"
import { current_date } from "../state/atoms"

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

/**
 * Maps `1...12` into a month name.
 * @example
 * monthToString(1)  // "January"
 * monthToString(12) // "December"
 */
export function numberToMonth(n:number) {
   return [
      "Jan" as const,
      "Feb" as const,
      "Mar" as const,
      "Apr" as const,
      "May" as const,
      "June" as const,
      "July" as const,
      "Aug" as const,
      "Sep" as const,
      "Oct" as const,
      "Nov" as const,
      "Dec" as const,
   ][n - 1]
}

/**
 * Given a `date` object, return a string such as `June 23`.
 * @example
 * reportMonthAndDay(new Date()) // "May 15"
 */
export function monthDayString(date:Date) {
   return `${numberToMonth(date.getMonth())} ${date.getDate()}`
}

/**
 * Maps `date` to string.
 * @example
 * console.log(new Date()) // "15 May 2020"
 */
export function dayMonthYearString(date:Date|null) {
   const current = useRecoilValue(current_date)
   const day = date?.getDate()
   const month = numberToMonth(date?.getMonth()!)
   const year = date?.getFullYear()
   return date
      ? `${day} ${month} ${year !== current.year ? year : ""}`
      : ""
}

/**
 * Maps `date` to an object with `day`, `month`, and `year` properties.
 * @example
 * const { day, month, year } = dayMonthYear(new Date())
 * console.log(`${month} ${day}, ${year}`) // "May 15, 2020"
 */
export function dayMonthYear(date:Date) {
   const day = date.getDate()
   const month = numberToMonth(date.getMonth())
   const year = date.getFullYear()
   return { day, month, year, }
}