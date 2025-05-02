export const dateTimeProcessing = (date) => {
    try {
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return (hours + ":" + minutes)
    } catch {
        throw new Error("Произошла ошибка");
    }
}

/**
 * 
 * @param {object} data 
 * @returns {string}
 */
export const dateTimeProcessingForRequest = (data) => {
    try {
      const time = new Date(data.updatedAt)
      const hours = time.getHours()
      const minutes = time.getMinutes()
      return (hours + ":" + minutes)
    } catch {
      throw new Error("Произошла ошибка");
    }
  }

export const dateProcessing = (date) => {
    try {
        const year = date.getFullYear()
        const currentMonth = date.getMonth() + 1
        const day = date.getDate()
        let month = ""

        if (currentMonth < 10) {
            month = "0" + Number(currentMonth)
        } else {
            month = Number(currentMonth)
        }

        return day + "." + month + "." + year
    } catch {
        throw new Error("Произошла ошибка");
    }
}

/**
 * 
 * @param {object} params 
 * @returns {string}
 */
export const dateProcessingForRequest = (params) => {
    try {
      const year = params[0] + params[1] + params[2] + params[3]
      const mount = params[4] + params[5]
      const day = params[6] + params[7]
      return day + "." + mount + "." + year
    } catch {
      throw new Error("Произошла ошибка");
    }
  }