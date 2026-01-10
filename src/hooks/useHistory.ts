import { useState, useCallback } from "react";

interface UseHistoryReturn<T> {
  state: T;
  setState: (newState: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clear: () => void;
}

const MAX_HISTORY_SIZE = 50;

export function useHistory<T>(initialState: T): UseHistoryReturn<T> {
  const [state, setStateInternal] = useState<T>(initialState);
  const [past, setPast] = useState<T[]>([]);
  const [future, setFuture] = useState<T[]>([]);

  const setState = useCallback(
    (newState: T) => {
      setPast((prevPast) => {
        const newPast = [...prevPast, state];
        // Limit history size
        if (newPast.length > MAX_HISTORY_SIZE) {
          newPast.shift();
        }
        return newPast;
      });
      setFuture([]); // Clear future when new state is set
      setStateInternal(newState);
    },
    [state]
  );

  const undo = useCallback(() => {
    if (past.length === 0) return;

    const newPast = [...past];
    const previous = newPast.pop()!;

    setPast(newPast);
    setFuture([state, ...future]);
    setStateInternal(previous);
  }, [past, state, future]);

  const redo = useCallback(() => {
    if (future.length === 0) return;

    const newFuture = [...future];
    const next = newFuture.shift()!;

    setFuture(newFuture);
    setPast([...past, state]);
    setStateInternal(next);
  }, [future, state, past]);

  const clear = useCallback(() => {
    setPast([]);
    setFuture([]);
    setStateInternal(initialState);
  }, [initialState]);

  return {
    state,
    setState,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    clear,
  };
}
