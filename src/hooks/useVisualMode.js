import { useState } from "react";

// React hook to update mode of appointments

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  // Transition
  function transition(newMode, replace = false) {
    setMode(newMode); 
  
    if (replace) {
      let replacedArray = [...history];
      replacedArray.pop();
      replacedArray.push(newMode);
      return setHistory(replacedArray);
    } 
    
    setHistory(prev => ([...prev, newMode]))
  }
  // Back
  function back() {
    if (history.length >= 2) {
      let historyIndex;
      history.forEach((x, index) => x === mode ? historyIndex = index : null);
      setMode(history[historyIndex - 1]);
    }
  }


  return { mode, transition, back }
}