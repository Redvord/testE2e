function generateINNUL() {
    let region, inspection, numba, rezult, kontr;
    region = String(Math.floor(Math.random() * 99));
    inspection = String(Math.floor(Math.random() * 98));
    numba = String(Math.floor(Math.random() * 99999));
    rezult = region + inspection + numba;
    console.log(rezult);
    kontr = String(((
            2*rezult[0] + 4*rezult[1] + 10*rezult[2] +
            3*rezult[3] + 5*rezult[4] + 9*rezult[5] +
            4*rezult[6] + 6*rezult[7] + 8*rezult[8]
        ) % 11) % 10);
    kontr == 10 ? kontr = 0: kontr = kontr;
    rezult = rezult + kontr;
    return rezult;
}

export {generateINNUL};