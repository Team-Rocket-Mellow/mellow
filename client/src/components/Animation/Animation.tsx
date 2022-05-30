import React, { useState, useEffect } from "react"

import "./Animation.css"

function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId:number
    if (isMounted && !shouldRender) { 
      setShouldRender(true) 
    }
    else if (!isMounted && shouldRender) {
      timeoutId = window.setTimeout(() => setShouldRender(false), delayTime)
    }
    return () => clearTimeout(timeoutId)
  }, [isMounted, delayTime, shouldRender])

  return shouldRender
}

function Animation() {
  const [isMounted, setIsMounted] = useState(true)
  const shouldRenderChild = useDelayUnmount(isMounted, 500)
  const mountedStyle = { animation: "inAnimation 500ms ease-in" }
  const unmountedStyle = { animation: "outAnimation 510ms ease-in" }

  const handleToggleClicked = () => setIsMounted(!isMounted)

  return (
    <main>
      <button onClick={handleToggleClicked}>Click me!</button>
      {
        shouldRenderChild && (
          <h1 style={isMounted ? mountedStyle : unmountedStyle}>Hello Animation.</h1>
        )
      }
    </main>
  )
}

export default Animation