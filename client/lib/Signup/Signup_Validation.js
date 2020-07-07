export const charactersValidation = (char) => {

    if (char == char.toUpperCase()) {
        return "Upper"
    } else if (Number.isInteger(char) == true) {
        return "Number"
    } else {
        return "Normal"
    }

}