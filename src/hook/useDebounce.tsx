import { useState, useEffect } from "react";

export default function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const hander = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(hander)
    }
  }, [value, delay])
  return debouncedValue
}
