import "./Chat.css"
import { useState, useEffect } from "react"

const url = "ws://localhost:8080/ws"
const ws  = new WebSocket(url)

function Chat() {
   const [messages, setMessages] = useState(["hi", "hello"])
   const [input, setInput] = useState("")

   useEffect(() => {
      ws.onmessage = (event) => {
         console.log(event)
         const data = JSON.parse(event.data)
         console.log(data)
         setMessages(messages => [...messages, JSON.stringify(data)])
      }

      ws.onclose = (event) => {
         console.log("Socket closed: ", event)
      }
   })

   const Δkey = (event) => {
      if (event.key === "Enter")
         ws.send(JSON.stringify({ msg: input, date: new Date(), })), 
         setInput("")
   }
   const Δinput = (event) => setInput(event.target.value)

   return (
      <div id="Chat">
         <h1>Chat</h1>
         <ul>
            {
               messages.map((message, i) => <li key={i}>{message}</li>)
            }
         </ul>
         <input value={input} onChange={Δinput} onKeyPress={Δkey} />
      </div>
   )
}

export default Chat