export async function readInFile(u) {
    const fs = require("fs");
    const path = require("path");
    const p = path.join(process.cwd(), u)
    const s = fs.readFileSync(p, {encoding:'utf8', flag:'r'})
    return s.split("\n")
}

export async function getGames() {
   return readInFile("/data/games.txt");
}

export async function getVids() {
    const arr = Array.from(await readInFile("/data/dailyDoseIds.txt"));
    const fixedArr = arr.map(id => "https://www.youtube.com/watch?v=" + id + "&list=PLlUZ3i-FUgHqk9-C-Fw_C6YsvTyx2c8nc&ab_channel=DailyDoseOfInternet")
    return fixedArr
}


