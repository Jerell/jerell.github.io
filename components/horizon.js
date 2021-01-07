import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Horizon() {
  const ref = useRef();

  function init() {
    const settings = {
      width: 586,
      height: 40,
      margin: { top: 30, right: 10, bottom: 0, left: 10 },
      overlap: 7,
      step: 39,
    };

    d3.json("network.json").then(function (network) {
      const nodesToMonitor = network.nodes.filter(
        (n) =>
          n.properties &&
          n.properties.pressure &&
          typeof n.properties.pressure !== "string" &&
          n.properties.pressure[0]
      );

      function walk(v) {
        return Math.max(0, Math.min(1, v + (Math.random() - 0.5) * 0.05));
      }
      function generateData() {
        const n = nodesToMonitor.length,
          m = 586;
        const data = new Array(n);
        for (let i = 0; i < n; ++i) {
          const d = (data[i] = new Float64Array(m));
          for (let j = 0, v = 0; j < m; ++j) {
            d[j] = v = walk(v);
          }
        }
        return data;
      }
      const data = generateData();

      const x = d3.scaleTime().range([0, settings.width]);
      const y = d3
        .scaleLinear()
        .rangeRound([0, -settings.overlap * settings.step]);

      const color = (i) =>
        d3["schemeGreens"][Math.max(3, settings.overlap)][
          i + Math.max(0, 3 - settings.overlap)
        ];

      function horizon(d) {
        const { context } = this;
        const { length: k } = d;
        if (k < settings.width)
          context.drawImage(
            this,
            k,
            0,
            settings.width - k,
            settings.step,
            0,
            0,
            settings.width - k,
            settings.step
          );
        context.fillStyle = "#fff";
        context.fillRect(settings.width - k, 0, k, settings.step);
        for (let i = 0; i < settings.overlap; ++i) {
          context.save();
          context.translate(settings.width - k, (i + 1) * settings.step);
          context.fillStyle = color(i);
          for (let j = 0; j < k; ++j) {
            context.fillRect(j, y(d[j]), 1, -y(d[j]));
          }
          context.restore();
        }
      }

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${settings.margin.top})`)
          .call(
            d3
              .axisTop(x)
              .ticks(settings.width / 80)
              .tickSizeOuter(0)
          )
          .call((g) =>
            g
              .selectAll(".tick")
              .filter(
                (d) =>
                  x(d) < settings.margin.left ||
                  x(d) >= settings.width - settings.margin.right
              )
              .remove()
          )
          .call((g) => g.select(".domain").remove());

      const canvas = d3
        .select(ref.current)
        .selectAll("canvas")
        .data(data)
        .enter()
        .append("canvas")
        .attr("width", settings.width)
        .attr("height", settings.height)
        .style("position", "absolute")
        .style("image-rendering", "pixelated")
        .style(
          "top",
          (d, i) => `${i * (settings.step + 1) + settings.margin.top}px`
        )
        .property("context", function () {
          return this.getContext("2d");
        })
        .each(horizon);

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", settings.width)
        .attr("height", settings.height * data.length + settings.margin.top)
        .style("position", "relative")
        .style("font", "10px sans-serif");

      const gX = svg.append("g");

      // Label
      svg
        .append("g")
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("x", 4)
        .attr(
          "y",
          (d, i) => (i + 0.5) * (settings.step + 1) + settings.margin.top
        )
        .attr("dy", "0.35em")
        .text((d, i) => nodesToMonitor[i].name);

      // Vertical
      const rule = svg
        .append("line")
        .attr("stroke", "#000")
        .attr("y1", settings.margin.top - 6)
        .attr(
          "y2",
          settings.height * data.length -
            settings.margin.bottom -
            1 +
            settings.margin.top
        )
        .attr("x1", 0.5)
        .attr("x2", 0.5);
      svg.on("mousemove touchmove", (event) => {
        const x = d3.pointer(event, svg.node())[0] + 0.5;
        rule.attr("x1", x).attr("x2", x);
      });

      // Update

      ref.current.update = (data) => {
        canvas.data(data).each(horizon);
        gX.call(xAxis);
      };

      const period = 250;
      function update() {
        const m = data[0].length;
        const tail = data.map((d) => d.subarray(m - 1, m));
        const then = new Date(Math.ceil((Date.now() + 1) / period) * period);
        for (const d of data)
          d.copyWithin(0, 1, m), (d[m - 1] = walk(d[m - 1]));
        x.domain([then - period * settings.width, then]);
        ref.current.update(tail);
      }
      const repeat = setInterval(update, period);
    });
  }

  useEffect(init, []);
  return (
    <>
      <div className="horizon relative overflow-hidden" ref={ref}></div>
    </>
  );
}
