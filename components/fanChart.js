import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function FanChart() {
  const ref = useRef();

  function init() {
    const settings = {
      width: 889,
      height: 250,
      margin: { top: 20, right: 30, bottom: 30, left: 40 },
    };

    const xAxis = (g) =>
      g
        .attr(
          "transform",
          `translate(0,${settings.height - settings.margin.bottom})`
        )
        .call(d3.axisBottom(x).ticks(settings.width / 80))
        .call((g) => g.select(".domain").remove());

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${settings.margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, ",d"))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .append("text")
            .attr("x", -settings.margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(data.y)
        );

    const svg = d3
      .create("svg")
      .attr("viewBox", [0, 0, settings.width, settings.height])
      .attr("font-family", "sans-serif")
      .attr("font-size", "10")
      .attr("stroke-miterlimit", 1);

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);
  }

  useEffect(init, []);
  return (
    <>
      <div className="fan relative overflow-hidden" ref={ref}></div>
    </>
  );
}
