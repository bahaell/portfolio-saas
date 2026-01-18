"use client"

import { useState, useCallback, useRef } from "react"
import type { ThemeConfig } from "@/lib/types/theme"

interface HistoryState {
  overrides: Partial<ThemeConfig>
  sections: Record<string, boolean>
}

export function useThemeHistory(initialState: HistoryState) {
  const [currentState, setCurrentState] = useState<HistoryState>(initialState)
  const historyStack = useRef<HistoryState[]>([initialState])
  const redoStack = useRef<HistoryState[]>([])

  const updateState = useCallback(
    (newState: HistoryState) => {
      historyStack.current.push(currentState)
      redoStack.current = []
      setCurrentState(newState)
    },
    [currentState],
  )

  const undo = useCallback(() => {
    if (historyStack.current.length > 1) {
      redoStack.current.push(currentState)
      const previousState = historyStack.current.pop()!
      setCurrentState(previousState)
    }
  }, [currentState])

  const redo = useCallback(() => {
    if (redoStack.current.length > 0) {
      historyStack.current.push(currentState)
      const nextState = redoStack.current.pop()!
      setCurrentState(nextState)
    }
  }, [currentState])

  const reset = useCallback(() => {
    setCurrentState(initialState)
    historyStack.current = [initialState]
    redoStack.current = []
  }, [initialState])

  return {
    state: currentState,
    updateState,
    undo,
    redo,
    reset,
    canUndo: historyStack.current.length > 1,
    canRedo: redoStack.current.length > 0,
  }
}
