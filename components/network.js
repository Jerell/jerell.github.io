import { useRef, useEffect } from "react";
import * as d3 from "d3";
import networkStyles from "../styles/network.module.css";

export default function Network({ selectNode, setNodeName, handleNodeHover }) {
  const ref = useRef();

  function handleMouseOverNode(e, d) {
    handleNodeHover(d);
  }

  function init() {
    const settings = {
      width: 586,
      height: 424,
      margin: { top: 10, right: 30, bottom: 30, left: 40 },
      nodeRadius: 10,
      lineThickness: 5,
      color: {
        node: {
          onshore: "#22C55E",
          offshore: "#0D9488",
          off: "#64748B",
        },
        pipe: {
          onshore: "#86EFAC",
          offshore: "#2DD4BF",
        },
      },
      legend: {
        offset: { top: 50 },
        fontSize: 20,
      },
    };

    const pipelength = d3.scaleLinear().domain([0, 50]).range([15, 30]);

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id((d) => d.id)
          .distance((d) => pipelength(d.length))
      )
      .force("charge", d3.forceManyBody().strength(-175))
      .force("center", d3.forceCenter(settings.width / 2, settings.height / 2));

    const drag = d3.drag().on("start", dragstart).on("drag", dragged);

    function dragstart(e, d) {
      if (!e.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
      d3.select(this).classed("fixed", true);
    }

    function dragged(e, d) {
      d.fx = e.x;
      d.fy = e.y;
    }

    function click(e, d) {
      delete d.fx;
      delete d.fy;
      d3.select(this).classed("fixed", false);
      simulation.alpha(1).restart();
    }

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", settings.width)
      .attr("height", settings.height)
      .call(
        d3.zoom().on("zoom", function (event) {
          svg.attr("transform", event.transform);
        })
      )
      .append("g")
      .attr(
        "transform",
        "translate(" + settings.margin.left + "," + settings.margin.top + ")"
      );

    const legendData = [
      {
        text: "Onshore",
        color: settings.color.node.onshore,
      },
      {
        text: "Offshore",
        color: settings.color.node.offshore,
      },
      {
        text: "Closed",
        color: settings.color.node.off,
      },
    ];

    d3.json("network.json").then(function (data) {
      const link = svg
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", (d) => {
          const shore = data.nodes[d.target].onshore ? "onshore" : "offshore";

          return settings.color.pipe[shore];
        })
        .attr("class", networkStyles.path)
        .attr("stroke-width", settings.lineThickness);

      const node = svg.selectAll("g").data(data.nodes).enter().append("g");

      node
        .append("circle")
        .attr("r", (d) =>
          d.name.startsWith("Manifold")
            ? settings.lineThickness
            : settings.nodeRadius
        )
        .style("fill", (d) => {
          const shore = d.onshore ? "onshore" : "offshore";
          if (
            (d.properties.pressure &&
              typeof d.properties.pressure[0] === "string") ||
            d.properties["flow rate"] === 0
          )
            return settings.color.node.off;
          return d.name.startsWith("Manifold")
            ? settings.color.pipe[shore]
            : settings.color.node[shore];
        });

      node.call(drag).on("click", click);

      node.on("mouseover touchmove", (e, d) => handleMouseOverNode(e, d));

      // Node label
      node
        .append("text")
        .attr("dx", (d) => {
          if (d.id >= 8 || d.name === "Manifold A" || d.name === "Manifold B") {
            return -settings.nodeRadius / 3;
          }
          return settings.nodeRadius / 3;
        })
        .attr("dy", (d) => settings.nodeRadius / 2)
        .attr("font-size", settings.nodeRadius + 5)
        .attr("text-anchor", (d) => {
          if (d.id >= 8 || d.name === "Manifold A" || d.name === "Manifold B") {
            return "start";
          }
          return "end";
        })
        .text((d) => d.name);
      // Icon
      node
        .filter((d) => d.icon)
        .append("text")
        .attr("class", "fa")
        .attr("font-family", "Font Awesome 5 Free")
        .text((d) => d.icon)
        .attr("dy", -1.5 * settings.nodeRadius);

      node.attr("opacity", (d) =>
        (d.properties.pressure &&
          typeof d.properties.pressure[0] === "string") ||
        d.properties["flow rate"] === 0
          ? 0.75
          : 1
      );

      const legend = svg
        .append("g")
        .selectAll("text")
        .data(legendData)
        .enter()
        .append("text")
        .attr("dx", 0)
        .attr(
          "dy",
          (l, i) =>
            settings.legend.offset.top + 1.3 * i * settings.legend.fontSize
        )
        .text((l) => l.text)
        .attr("font-size", settings.legend.fontSize)
        .style("fill", (l) => l.color);

      simulation.nodes(data.nodes).on("tick", tick);

      simulation.force("link").links(data.links);

      function tick() {
        node
          .attr("cx", function (d) {
            return (d.x = Math.max(
              settings.nodeRadius,
              Math.min(settings.width - settings.nodeRadius, d.x)
            ));
          })
          .attr("cy", function (d) {
            return (d.y = Math.max(
              settings.nodeRadius,
              Math.min(settings.height - settings.nodeRadius, d.y)
            ));
          });

        link
          .attr("x1", function (d) {
            return d.source.x;
          })
          .attr("y1", function (d) {
            return d.source.y;
          })
          .attr("x2", function (d) {
            return d.target.x;
          })
          .attr("y2", function (d) {
            return d.target.y;
          });

        node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      }
    });
  }

  useEffect(init, []);
  return (
    <>
      <div className="network relative overflow-hidden" ref={ref}></div>
    </>
  );
}
