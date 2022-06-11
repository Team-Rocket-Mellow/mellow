import { useRecoilState } from "recoil"
import { useState, useEffect } from "react"
import { left_menu } from "./atoms"

function useTime() {
   const [time, setTime] = useState(() => new Date())

   useEffect(() => {
      const id = setInterval(() => { setTime(new Date()) }, 1000)
      return () => clearInterval(id)
   }, [])

   return time
}

function useHotkey() {
   const [isMenuOn, toggleMenu] = useRecoilState(left_menu)

   function Δkey(Δ:KeyboardEvent) {
      switch(Δ.key) {
         case "m":
            if (!(document.activeElement instanceof HTMLInputElement)) toggleMenu(!isMenuOn)
            break
         default: break
      }
   }

   useEffect(() => {
      document.addEventListener("keydown", Δkey)
      return () => document.removeEventListener("keydown", Δkey)
   }, [])
}

export default useTime