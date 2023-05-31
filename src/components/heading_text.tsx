
export default function PageHeadingText (layer: string) {

    var heading: string = "";

    if (layer.replace("\_", "").substring(0,6) === "social") {
        heading = "Social Index";
    } else if (layer.replace("\_", "") === "timesrel") {
        heading = "Transport Relative";
    } else if (layer.replace("\_", "") === "timesabs") {
        heading = "Transport Absolute";
    } else if (layer === "transfers") {
        heading = "Num. Transfers";
    } else if (layer === "intervals") {
        heading = "Transport Interval";
    } else if (layer === "transport") {
        heading = "Transport Combined";
    } else if (layer === "popdens") {
        heading = "Population";
    } else if (layer.replace("\_", "") === "schooldist") {
        heading = "School Distance";
    } else if (layer.replace("\_", "").substring(0,4) === "bike") {
        heading = "Bicycle Index";
    } else if (layer === "natural") {
        heading = "Nature Index";
    } else if (layer === "parking") {
        heading = "Parking";
    }

    return heading;
}
