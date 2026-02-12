import * as d3 from 'd3';
import 'd3-scale-chromatic';
import { GeoJsonLayer } from "@deck.gl/layers/typed";


export function getGeoJsonLayer(geoJSONcontent: any, layerRange: number[], varname: string, alpha: number): any[] {

    let Color = d3
        .scaleSequential()
        .domain(layerRange)
        .interpolator(d3.interpolateViridis);

    const this_layer = [
        new GeoJsonLayer({
            id: 'polygon-layer',
            data: geoJSONcontent,
            filled: true,
            stroked: true,
            getLineWidth: 10,
            getLineColor: [122, 122, 122],
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            getFillColor: d => {
                var layerval = Math.max (layerRange[0], Math.min (layerRange[1], d.properties?.[varname]));
                if (isNaN(layerval)) {
                    layerval = layerRange[0];
                }
                if (varname === "bike_index" || varname === "natural") {
                    // Invert the palette:
                    layerval = layerRange[0] + (layerRange[1] - layerval);
                }
                const layerarr: any = d3.color(Color(layerval));
                var red = 0, green = 0, blue = 0;
                if (layerarr) {
                    red = layerarr.r;
                    green = layerarr.g;
                    blue = layerarr.b;
                }
                return [red, green, blue]
            },
            opacity: 1 - alpha,
            updateTriggers: {
                getFillColor: [varname, layerRange]
            }
        })
    ]

    return this_layer;
}
