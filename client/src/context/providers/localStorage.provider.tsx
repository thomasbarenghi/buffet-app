'use client'
export const localStorageProvider = (): Map<string, never> => {
  // eslint-disable-next-line @typescript-eslint/consistent-generic-constructors, @typescript-eslint/no-unsafe-argument
  const map: Map<string, never> = new Map(JSON.parse(localStorage?.getItem('app-cache') ?? '[]'))

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  return map
}
