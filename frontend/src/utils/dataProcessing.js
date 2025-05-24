/**
 * 
 * @param {object} data 
 * @returns {object}
 */
export const dataProcessing = (data) => {
    return data.map((el) => {
        let [, year, month, day] = el.createdAt.match(/^(\d{4})-(\d{2})-(\d{2})/)
        return [year, month, day]
    })
}