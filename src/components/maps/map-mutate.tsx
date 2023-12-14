import { NextPage } from "next";
import { useEffect, useState, Suspense } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGL } from "@deck.gl/react/typed";
import { Map } from "react-map-gl";
import * as d3 from 'd3';
import dynamic from 'next/dynamic'

import * as wasm_js from '@/../pkg/uamutations.js';
import BindGenComponent from '@/components/maps/map-mutateComponent';

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

interface BindGenProps {
    filename1: string
    filename2: string
    varnames: string[]
    nentries: number
}

const WasmBindGenCalc = dynamic(() => Promise.resolve(BindGenComponent), {
    ssr: false
});

export default WasmBindGenCalc;
