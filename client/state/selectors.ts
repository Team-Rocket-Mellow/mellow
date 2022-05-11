import { State } from "./types"
import { useSelector, TypedUseSelectorHook } from "react-redux"

// —————————————————————————————————————————————————————————————————————————————
// Selectors 

// Reference: https://react-redux.js.org/using-react-redux/usage-with-typescript
export const useAppSelector: TypedUseSelectorHook<State> = useSelector