import { useState, useEffect, useCallback } from 'react'

const useTimer = (time: number) => {
  const [timer, setTimer] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(prev => prev + 100)
    }, 100)
    return () => clearInterval(timerInterval)
  }, [])

  useEffect(() => {
    if (timer > time) {
      setDone(true)
    }
  }, [timer, time])

  const resetTimer = useCallback(() => {
    setTimer(0)
    setDone(false)
  }, [])

  return { resetTimer, done, timer }
}

export default useTimer