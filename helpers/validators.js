const dateOr = function (string) {
    const date = new Date(string)
    // protects from "Invalid Date" if string is invalid or undefined
    return isNaN(date) ? null : date
}

/* Return rows or throw 404. */
const rowsOr = function (output) {
    if (!output.rows.length) {
        throw Error(404)
    } else {
        return output.rows
    }
}

module.exports = { dateOr, rowsOr }
