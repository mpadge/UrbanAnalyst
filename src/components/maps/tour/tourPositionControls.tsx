// Positions of controls are all in dvw units, so panel positions here are
// converted in analogous ways.

export function posControlsX(width: number, near = "controls") {
    var left;
    if (width > 1120) {
        if (near == "controls") {
            left = width / 1.9 - 600;
        } else if (near == "nav") {
            left = width / 6 + 400;
        } else {
            left = width / 1.8 - 400;
        }
    } else if (width > 700) {
        if (near == "controls") {
            left = width / 2.1 - 400;
        } else if (near == "nav") {
            left = -width / 12 + 300;
        } else {
            left = width / 1.7 - 300;
        }
    } else {
        left = 0;
    }
    left = Math.round(left) + 'px';
    if (near == "controls" || near == "legend") {
        left = '-' + left;
    }

    return left;
}

export function posControlsY(width: number, height: number, near = "controls") {
    var top;
    if (width > 1120) {
        if (near == "controls") {
            top = 1 * height / 4;
        } else if (near == "nav") {
            top = 1 * height / 3.5;
        } else {
            top = 1 * height / 3.5;
        }
    } else if (width > 700) {
        if (near == "controls") {
            top = 1 * height / 5;
        } else if (near == "nav") {
            top = 1 * height / 3.5;
        } else {
            top = 1 * height / 3.6;
        }
    } else {
        top = 0;
    }
    top = Math.round(top) + 'px';
    if (near == "controls" || near == "nav") {
        top = '-' + top;
    }

    return top;
}

export function maxWidth(width: number, wide = false) {
    var w;
    if (width > 1120) {
        if (wide) {
            w = 600;
        } else {
            w = 400;
        }
    } else if (width > 700) {
        if (wide) {
            w = 400;
        } else {
            w = 300;
        }
    } else {
        if (wide) {
            w = 300;
        } else {
            w = 250;
        }
    }

    return w;
}
