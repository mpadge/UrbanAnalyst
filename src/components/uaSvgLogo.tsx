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
            d="M 4 5 v 8 C 3 21, 9 21, 9 14 v -9"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            d="M 12.5 20 l 4 -12 l 4 12"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            d="M 15 15 h 5"
        />
  </svg>
)
