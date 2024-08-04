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
            strokeWidth="4"
            d="M 0,5 v -5 h 24"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            d="M 24,19 v 5 h -24"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            d="M 4 6 v 8 C 4 21, 10 21, 10 14 v -8"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            d="M 13 20 l 4 -12 l 4 12"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            d="M 15 15 h 5"
        />
  </svg>
)
