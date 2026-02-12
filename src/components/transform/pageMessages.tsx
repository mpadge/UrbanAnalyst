
import React, { useEffect } from 'react';
import * as d3 from 'd3';

import styles from '@/styles/message.module.css';
import useWindowSize from '@/components/windowSize';

interface MsgProps {
    msg: string,
}

export default function TransformMsgs (props: MsgProps): JSX.Element {

    const svgRef = React.useRef<SVGSVGElement>(null);

    const winSize = useWindowSize();
    const winWidth: number = winSize.width ?? 0;
    const winHeight: number = winSize.height ?? 0;

    useEffect((): void => {

        var svg = d3.select(svgRef.current);

        svg.selectAll("text").remove();

        var _text = svg.append("g")
        .call((g: any) => g.select(".domain").remove())
        .call((g: any) => g.append("text")
            .attr("x", winWidth / 2.3)
            .attr("y", winHeight / 2.3)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(props.msg));

    }, [svgRef, props.msg, winWidth, winHeight]);

    return (
        <div id="message-container" className={styles.mapmessage}>
            <svg ref={svgRef} style={{width: '100%', height: '100%'}}/>
        </div>
    )
};
