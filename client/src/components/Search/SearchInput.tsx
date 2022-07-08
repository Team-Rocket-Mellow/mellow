import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useRecoilState } from "recoil"
import { search } from "../../state/atoms"

function SearchInput() {
   const [text, setText] = useRecoilState(search)
   const go = useNavigate()

   const Δtext = (Δ) => setText(Δ.target.value)
   const clearText = () => setText("")
   const submit = (Δ:React.FormEvent<HTMLInputElement>) => {
      Δ.preventDefault()
      if (text) go(`/search/${text}`)
   }

   const hotkey = (Δ:KeyboardEvent) => {
      const $input = document.querySelector<HTMLInputElement>("#SearchInput")
      switch (Δ.key) {
        case "/":
          if (!(document.activeElement instanceof HTMLInputElement)) {
            Δ.preventDefault()
            $input?.focus()
          }
          break
        case "Escape":
          Δ.preventDefault()
          if (document.activeElement === $input) $input?.blur()
          break
      }
    }
  
    useEffect(() => {
      document.addEventListener("keydown", hotkey)
      return () => document.removeEventListener("keydown", hotkey)
    }, [])

   return (
      <input
        id='SearchInput'
        placeholder='/  to search'
        type='search'
        tabIndex={-1}
        value={text}
        onChange={Δtext}
        onBlur={clearText}
        onSubmit={submit}
      />
   )
}

export default SearchInput