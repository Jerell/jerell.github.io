import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import styles from "../styles/lineChart.module.css";
import { add } from "date-fns";
// const d3 = require("d3");

export default function lineChart({ systemCase, selectedNode }) {
  const ref = useRef();
  const nodes = selectedNode ? [selectedNode] : systemCase.nodes;
  const properties = Object.keys(nodes[0].properties);
  const [property, setProperty] = useState("flow rate");

  function handlePropertySelect(e) {
    setProperty(e.target.innerText.trim());
  }

  function init() {
    const margin = { top: 20, right: 80, bottom: 20, left: 150 },
      width = ref.current.clientWidth - margin.left - margin.right,
      height = 424 - margin.top - margin.bottom,
      tickLabelSize = 14,
      tickHours = 6,
      legendFontSize = 13,
      legendLineHeight = 16;

    ref.current.innerHTML = "";

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const data = nodes.filter((n) =>
      Object.keys(n.properties).includes(property)
    );

    const legendData = data.map((n) => ({ name: n.name, display: true }));
    function toggleItem(e, d) {
      const { name } = d;
      const i = legendData.findIndex((l) => l.name === name);
      if (i < 0) return;

      legendData[i].display = !legendData[i].display;

      console.log(legendData);
      for (let l of lg) {
        if (l.innerHTML.match(`>${name}</`)) {
          if (!legendData[i].display) {
            l.classList.add(styles.hide);
            this.classList.add(styles.inactive);
          } else {
            l.classList.remove(styles.hide);
            this.classList.remove(styles.inactive);
          }
          console.log(l, this);
          return;
        }
      }
    }

    const xVal = (d) => d.id;

    const yVal = (d) => {
      // console.log(d);
      if (typeof d.properties[property] === "number")
        return d.properties[property];
      try {
        return parseFloat(
          d.properties[property][0]
            ? d.properties[property][0]
            : d.properties[property]
        );
      } catch {
        return 0;
      }
    };

    // const x = d3.scaleLinear().domain(d3.extent(data, xVal)).range([2, width]);
    const x = d3
      .scaleTime()
      .domain([add(new Date(), { days: -2 }), new Date()])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, yVal) + 5])
      .range([height, 0]);

    function zoomed(e) {
      const newX = e.transform.rescaleX(x);
      xA.call(
        d3
          .axisBottom(newX)
          .ticks(d3.timeHour.every(tickHours))
          .tickSizeInner(-height)
          .tickSizeOuter(2)
      );
    }
    const zoom = d3
      .zoom()
      .on("zoom", (e, d) => {
        zoomed(e);
      })
      .scaleExtent([1, 1]);

    svg.call(zoom);

    const xAxis = d3
      .axisBottom(x)
      .ticks(d3.timeHour.every(tickHours))
      .tickSizeInner(-height)
      .tickSizeOuter(2);
    const yAxis = d3.axisLeft(y).ticks(10);

    // Frame
    const frame = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Axes
    frame.append("g").attr("class", "y axis").call(yAxis);

    const xA = frame
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    // function update() {
    const lg = frame
      .selectAll("g.line")
      .data(
        data.filter((d) =>
          y(
            d.properties[property][0]
              ? d.properties[property][0]
              : d.properties[property]
          )
        ),
        (d) => d.id
      )
      .enter()
      .append("g")
      .attr("class", "line");
    lg.append("text")
      .text((d) => d.name)
      .attr("class", "text-sm font-normal italic")
      .attr("dx", width)
      .attr(
        "dy",
        (d) =>
          y(
            d.properties[property][0]
              ? d.properties[property][0]
              : d.properties[property]
          ) - 3
      )
      .attr("text-anchor", "end");

    const l = lg
      .append("line")
      .style("stroke", "green")
      .style("stroke-width", 1);

    // console.log(y(5));

    l.attr("x1", 0)
      .attr("x2", width)
      .attr("y1", (d) =>
        y(
          d.properties[property][0]
            ? d.properties[property][0]
            : d.properties[property]
        )
      )
      .attr("y2", (d) =>
        y(
          d.properties[property][0]
            ? d.properties[property][0]
            : d.properties[property]
        )
      )
      .transition()
      .duration(100);

    const legend = svg
      .append("g")
      .selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .attr("dx", 0)
      .attr("dy", (l, i) => margin.top + legendLineHeight * i)
      .text((l) => l.name)
      .attr("font-size", legendFontSize)
      .attr("font-weight", (l) => (l.display ? "bold" : "normal"))
      .on("click", toggleItem);

    // l.attr("x1", margin.left)
    //   .attr("x2", width + margin.left)
    //   .attr("y1", (d) => d.properties[property])
    //   .attr("y2", (d) => d.properties[property])
    //   .transition()
    //   .duration(100)
    //   .style("stroke", "red");
    // }

    // update();

    // const period = 250;
    // ref.current.update = (data) => {
    //   gX.call(xAxis);
    // };
    // function update() {
    //   ref.current.update();
    // }
    // const repeat = setInterval(update, period);
  }

  useEffect(init, [selectedNode, systemCase, property]);

  return (
    <>
      <h2 className="text-sm ">
        {properties.map((p, i) => (
          <span key={i} onClick={handlePropertySelect}>{`${p} `}</span>
        ))}
      </h2>
      <h2 className="text-sm ">{property}</h2>
      <div className={styles.lineChart} ref={ref}></div>
    </>
  );
}
