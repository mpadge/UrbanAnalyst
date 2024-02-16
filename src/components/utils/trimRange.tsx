
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

export function getRangeLimits(geoJSONcontent: any, varname: string) {
    let min = Infinity;
    let max = -Infinity;
    if (geoJSONcontent) {
        geoJSONcontent.features.forEach((feature: any) => {
            const value = feature.properties?.[varname];
            if (value !== undefined && !isNaN(value)) {
                if (value < min) {
                    min = value;
                } else if (value > max) {
                    max = value;
                }
            }
        });
    }

    return [min, max];
}
