import type { CSSProperties } from 'react';

const tourPanelBackgroundColour = '#9cf7f7';
const tourPanelBorderRadiusWide = '20px';
const tourPanelBorderRadiusNarrow = '10px';

// Background and corner radius shared by all tour panels.
export function panelStyle(width: number): CSSProperties {
    return {
        backgroundColor: tourPanelBackgroundColour,
        borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
    };
}
