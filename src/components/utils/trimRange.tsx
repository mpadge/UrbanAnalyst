
export function trimRange(dat: number[]): number[] {
    const sortedDat = [...dat].sort((a, b) => a - b);
    const ncols = 10 ** Math.floor(Math.log10(dat.length));
    const bin_width = (sortedDat[sortedDat.length -  1] - sortedDat[0]) / ncols;

    // Trim lower values
    let i =  0;
    while ((sortedDat[i +  1] - sortedDat[i]) > bin_width && i < Math.floor(sortedDat.length /  2)) {
        i++;
    }
    for (let j = 0; j < dat.length; j++) {
        if (dat[j] < sortedDat[i +  1]) {
            dat[j] = sortedDat[i +  1];
        }
    }

    // Trim upper values
    i = dat.length -  1;
    while ((sortedDat[i] - sortedDat[i -  1]) > bin_width && i > Math.ceil(sortedDat.length /  2)) {
        i--;
    }
    for (let j = 0; j < dat.length; j++) {
        if (dat[j] > sortedDat[i -  1]) {
            dat[j] = sortedDat[i -  1];
        }
    }

    return dat;
}
