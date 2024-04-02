export const arrayToObject = <T>(array: T[]): T => {
  const object = {}

  array.forEach((item) => {
    Object.assign(object, item)
  })

  return object as T
}
