export function getUserName(strg) {
    const arr = strg.split("@")

    return arr[0]
}