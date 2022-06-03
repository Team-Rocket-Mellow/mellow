import { current_date } from "./atoms"

class Clock {
   day   : number
   month : number
   year  : number

   constructor() {
      const now = new Date()
      this.day   = now.getDate()
      this.month = now.getMonth()
      this.year  = now.getFullYear()
   }

   tick(offset=60_000) {
      const t0 = new Date()
      const day = t0.getDate()
      const ms_to_midnight = t0.getTime() - t0.setHours(0,0,0,0)
      const id = setTimeout(() => {
         this.tick(0)
      }, ms_to_midnight - offset)
   }

   parseDate(date:Date) {
      return {
         day   : date.getDate(),
         month : date.getMonth(),
         year  : date.getFullYear()
      }
   }
}

export default Clock