


function passWordGenerator() {
    const characters = [["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], ["0", "1", "2", "3", "4", "5", "7", "8", "9"], ["!", "&", "%", "?", "¿", "¡", "!"]]
    let newPassWord = "";
    for (i = 0; i < 8; i++) {
        let arr = characters[Math.floor(Math.random() * (characters.length))];
        newPassWord = newPassWord + arr[Math.floor(Math.random() * (arr.length))]
    }
    return newPassWord

}



module.exports = {
    passWordGenerator
}