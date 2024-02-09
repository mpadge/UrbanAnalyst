// Tour popover positions can only be controlled in px units as offset from
// values of zero corresponding to the middle of the window. The left-hand side
// is, for example, then `-width / 2`. Those coordinates then describe the
// **middle** of the tour popover, so a popover of width, `w`, at the far
// left-hand side will then be at `-width / 2 + w / 2`. Most of the position
// controls below start with that and then modify the edge position by a
// specified amount.
//
// Popover widths are defined for two types of tour panels, each of which is
// defined for three screen sizes by the following constants:

const w_large_big = 600;
const w_med_big = 400;
const w_narrow_big = 300; // Only used in maxWidth, not posControls.
const w_large_small = 400;
const w_med_small = 300;
const w_narrow_small = 250; // Only used in maxWidth, not posControls.


export function posControlsX(width: number, near = "controls") {
    var left;
    if (width > 1120) {
        if (near == "controls") {
            left = width / 2 - w_large_big / 2 - width / 9;
        } else if (near == "nav") {
            left = width / 2 - w_large_small / 2 - width / 20;
        } else {
            left = width / 2 - w_large_small / 2;
        }
    } else if (width > 700) {
        if (near == "controls") {
            left = width / 2 - w_med_big / 2 - width / 5;
        } else if (near == "nav") {
            left = width / 2 - w_med_small / 2 - width / 10;
        } else {
            left = width / 2 - w_med_small / 2 - width / 20;
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
