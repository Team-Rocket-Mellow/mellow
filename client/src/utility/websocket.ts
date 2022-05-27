async function connect() {
   const ws = new WebSocket(`ws://${window.location.host}/ws`)
   return new Promise((resolve, reject) => {
      ws.onopen = () => {
         resolve(ws)
      }
      ws.onerror = (err) => {
         reject(err)
      }
   })
}

export default connect