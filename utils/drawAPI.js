export async function readInFile(u) {
    const fs = require("fs")
    const path = require("path")
    const p = path.join(process.cwd(), u)
    const s = fs.readFileSync(p, {encoding: 'utf8', flag: 'r'})
    return s
}

export async function antonwashere() {
    return readInFile("data/antonwashere.txt")
}

