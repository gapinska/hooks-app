import React from "react"
import Home from "./Home"
import Speakers from "./Speakers"
import "./App.css"

export const ConfigContext = React.createContext()

const pageToShow = (pageName = "Speakers") => {
  if (pageName === "Home") return <Home />
  if (pageName === "Speakers") return <Speakers />
  return <div>Not Found</div>
}

const configValue = {
  showSpeakerSpeakingDays: true,
}

function App({ pageName }) {
  return (
    <ConfigContext.Provider value={configValue}>
      {pageToShow(pageName)}
    </ConfigContext.Provider>
  )
}

export default App
