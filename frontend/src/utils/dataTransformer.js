import { dateProcessing } from "./dateConvertor"

export const dataTransformer = (date = []) => {
    let object = {}
    let datereplice = ""
    date.map((el) => {
      const date = dateProcessing(new Date(el.createdAt))
      if (datereplice.length === 0 || datereplice != date) {
        datereplice = date
        object[datereplice] = []
        object[datereplice].push(el)
      } else {
        object[datereplice].push(el)
      }
    })
    return Object.entries(object)
  }