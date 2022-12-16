import { useState } from "react";

// React hook to update mode of appointments

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  // Transition
  function transition(initial, replace = false) {
    
    setHistory(prev => {
      if (replace) {
        return [...prev.slice(0, prev.length - 1), initial];
      }
      return [...prev, initial]
    })


    setMode(initial); 
  }
  // Back
  function back() {
    if (history.length > 1) {
      history.pop()
      setMode(history.slice(-1)[0]);
    }
  }


  return { mode, transition, back }
}