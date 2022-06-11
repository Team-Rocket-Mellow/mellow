import { useRecoilState } from "recoil"
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
  const [isMenuOn, toggleMenu] = useRecoilState(left_menu)

  const Δkey = useCallback((Δ:KeyboardEvent) => {
    switch(Δ.key) {
      case "m":
        !(document.activeElement instanceof HTMLInputElement) && toggleMenu(!isMenuOn)
        break
    }
  }, [isMenuOn])

  useEffect(() => {
    document.addEventListener("keydown", Δkey)
    return () => document.removeEventListener("keydown", Δkey)
  }, [isMenuOn])
}