export const getClassProperties = <T>(Class: new () => T) => {
  console.log(Object.getOwnPropertyNames(Class.prototype))

  return []
}
