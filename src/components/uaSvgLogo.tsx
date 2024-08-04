"use client"

import * as React from 'react';

export const SvgComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            d="M 0,5 v -5 h 24"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            d="M 24,19 v 5 h -24"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            d="M 3 6 v 8 C 3 21, 11 21, 11 14 v -8"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            d="M 13 20 l 5 -14 l 5 14"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            d="M 14 15 h 9"
        />
  </svg>
)
