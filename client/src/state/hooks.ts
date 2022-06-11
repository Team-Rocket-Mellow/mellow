import { useRecoilState, useSetRecoilState } from "recoil"
import { useState, useEffect, useCallback } from "react"
import { left_menu } from "./atoms"

// —————————————————————————————————————————————————————————————————————————————
// Time

export function useTime() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => { setTime(new Date()) }, 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

// —————————————————————————————————————————————————————————————————————————————
// Hotkeys

export function useHotKey() {
  const toggleMenu = useSetRecoilState(left_menu)

  const Δkey = (Δ:KeyboardEvent) => {
    switch(Δ.key) {
      case "m":
        !(document.activeElement instanceof HTMLInputElement) && toggleMenu($ => !$)
        break
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", Δkey)
    return () => document.removeEventListener("keydown", Δkey)
  }, [])
}