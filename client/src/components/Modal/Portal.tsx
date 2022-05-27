import { createPortal } from "react-dom"

function PortalWrapper(wrapperId) {
   const wrapperElement = document.createElement("div")
   wrapperElement.id = wrapperId
   document.body.appendChild(wrapperElement)
   return wrapperElement
}

function ModalPortal({ children }) {
   return createPortal(children, document.getElementById("modal") as HTMLElement)
}

export default ModalPortal