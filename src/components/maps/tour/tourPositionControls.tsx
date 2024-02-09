// Tour popover positions can only be controlled in px units as offset from
// values of zero corresponding to the middle of the window.
// There are two types of tour panels, each of which is defined for three screen
// sizes by the following constants:

const w_large_big = 600;
const w_med_big = 400;
const w_narrow_big = 300;
const w_large_small = 400;
const w_med_small = 300;
const w_narrow_small = 250;


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
            w = w_large_big;
        } else {
            w = w_large_small;
        }
    } else if (width > 700) {
        if (wide) {
            w = w_med_big;
        } else {
            w = w_med_small;
        }
    } else {
        if (wide) {
            w = w_narrow_big;
        } else {
            w = w_narrow_small;
        }
    }

    return w;
}
