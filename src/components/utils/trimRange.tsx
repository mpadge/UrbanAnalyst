
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

function calculateMean(arr: number[]): number {
    return arr.reduce((acc, val) => acc + val,  0) / arr.length;
}

function calculateStandardDeviation(arr: number[], usePopulation = false): number {
    const mean = calculateMean(arr);
    return Math.sqrt(
        arr
        .reduce((acc: number[], val) => acc.concat((val - mean) **  2), [])
        .reduce((acc: number, val) => acc + val,  0) /
            (arr.length - (usePopulation ?  0 :  1))
    );
}


export function trimRangeSDs(dat: number[], sdRange = 1.96): number[] {

    const mn = calculateMean(dat);
    const sd = calculateStandardDeviation(dat);
    const lowerLimit = mn - sdRange * sd;
    const upperLimit = mn + sdRange * sd;

    return dat.map(value => {
        if (value < lowerLimit) return lowerLimit;
        if (value > upperLimit) return upperLimit;
        return value;
    });
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
