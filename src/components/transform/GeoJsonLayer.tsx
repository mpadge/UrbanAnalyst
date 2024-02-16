import * as d3 from 'd3';
import 'd3-scale-chromatic';
import { GeoJsonLayer } from "@deck.gl/layers/typed";

export async function getGeoJsonLayer(geoJSONcontent: any, layerMin: number, layerMax: number, varname: string, alpha: number, setGeoJsonLayer: (layer: any) => void) {
    
        let Color = d3
            .scaleSequential()
            .domain([layerMax, layerMin])
            .interpolator(d3.interpolateViridis);

        const this_layer = [
            new GeoJsonLayer({
                id: 'polygon-layer',
                data: geoJSONcontent,
                filled: true,
                stroked: true,
                getLineWidth: 10,
                getLineColor: [122, 122, 122],
                getFillColor: d => {
                    var layerval = Math.max (layerMin, Math.min (layerMax, d.properties?.[varname]));
                    if (isNaN(layerval)) {
                        layerval = layerMin;
                    }
                    if (!(varname === "bike_index" || varname === "natural")) {
                        // Invert the palette:
                        layerval = layerMin + (layerMax - layerval);
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
                    getFillColor: [varname]
                }
                })
            ]

        setGeoJsonLayer(this_layer)
}
