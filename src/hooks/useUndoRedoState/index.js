import { useMemo, useState } from "react";
// If you're only working with primitives, this is not required
import isEqual from "lodash/isEqual";
import { useEffect } from "react";

function useUndoRedoState(init) {
  const [states, setStates] = useState([init]); // Used to store history of all states
  const [index, setIndex] = useState(0); // Index of current state within `states`
  const state = useMemo(() => states[index], [states, index]); // Current state

  const setState = (value) => {
    // Use lodash isEqual to check for deep equality
    // If state has not changed, return to avoid triggering a re-render

    if (isEqual(state, value)) {
      setStates(states);
      return;
    }

    const copy = states.slice(0, index + 1); // This removes all future (redo) states after current index
    copy.push(value);
    setStates(copy);
    setIndex(copy.length - 1);
  };
  // Clear all state history
  const resetState = (init) => {
    setIndex(0);
    setStates([init]);
  };
  // Allows you to go back (undo) N steps
  const goBack = (steps = 1) => {
    const indexNo = Math.max(0, Number(index) - (Number(steps) || 1));
    setIndex(indexNo);
    return indexNo;
  };
  // Allows you to go forward (redo) N steps
  const goForward = (steps = 1) => {
    const indexNo = Math.min(
      states.length - 1,
      Number(index) + (Number(steps) || 1)
    );
    setIndex(indexNo);
    return indexNo;
  };
  return {
    state,
    states,
    setState,
    resetState,
    index,
    lastIndex: states.length - 1,
    goBack,
    goForward,
  };
}

export default useUndoRedoState;
