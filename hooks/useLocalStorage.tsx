import { useCallback, useEffect, useState } from "react"

const useLocalStorage = (key: any, defaultValue = null) => {
  const storageValue =
    typeof window !== "undefined" && window.localStorage.getItem(key)
  const initValue = storageValue ? JSON.parse(storageValue) : null

  const [value, setValue] = useState(initValue)
  useEffect(() => {
    if (defaultValue) {
      typeof window !== "undefined" &&
        window.localStorage.setItem(key, JSON.stringify(defaultValue))
      setValue(defaultValue)
    }
  }, [])

  const updatingValue = useCallback(
    (newValue: any) => {
      typeof window !== "undefined" &&
        window.localStorage.setItem(key, JSON.stringify(newValue))
      return setValue(newValue)
    },
    [key]
  )

  const removingValue = useCallback(() => {
    typeof window !== "undefined" && window.localStorage.removeItem(key)
    return setValue(null)
  }, [key])

  return [
    value,
    (valueToUp: any) => updatingValue(valueToUp),
    () => removingValue(),
  ]
}

export default useLocalStorage
