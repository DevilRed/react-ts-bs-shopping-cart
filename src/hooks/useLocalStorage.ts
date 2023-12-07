import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue:T | (() => T)) {
	// get value from local storage or return initia value
	const [value, setValue] = useState<T>(() => {
		const jsonValue = localStorage.getItem(key)
		if (jsonValue != null) {
			return JSON.parse(jsonValue)
		}
		if (typeof initialValue === "function") {
			return (initialValue as () => T)()
		} else {
			return initialValue
		}
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	// cast value to avoid ts warnings
	return [value, setValue] as [T, typeof setValue]
}