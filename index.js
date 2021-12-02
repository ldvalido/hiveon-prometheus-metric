const stats = require('./stats.js')

const addr = process.env.addr || "Dd556283122c3b4556BF7e0B3EFeEBF2Ab6Ade99".toLocaleLowerCase();

(async() => {
    const res = await stats.getAll(addr)
    console.log(JSON.stringify(res));
})()