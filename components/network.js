import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Network({ selectNode, setNodeName, handleNodeHover }) {
  const ref = useRef();

  function handleMouseOverNode(e, d) {
    handleNodeHover(d);
  }

  function init() {
    const settings = {
      width: 586,
      height: 296,
      margin: { top: 10, right: 30, bottom: 30, left: 40 },
      nodeRadius: 10,
      lineThickness: 5,
    };

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", settings.width)
      .attr("height", settings.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + settings.margin.left + "," + settings.margin.top + ")"
      );

    d3.json("network.json").then(function (data) {
      const link = svg
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", "#86EFAC")
        .attr("stroke-width", settings.lineThickness);

      const node = svg.selectAll("g").data(data.nodes).enter().append("g");

      node
        .append("circle")
        .attr("r", (d) =>
          d.name.startsWith("Manifold")
            ? settings.lineThickness
            : settings.nodeRadius
        )
        .style("fill", (d) =>
          d.name.startsWith("Manifold") ? "#86EFAC" : "#22C55E"
        );

      node.on("mouseover touchmove", (e, d) => handleMouseOverNode(e, d));

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
        .text((d) => d.name)
        .style("fill", "#1F2937");

      const simulation = d3
        .forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
        .force(
          "link",
          d3
            .forceLink() // This force provides links between nodes
            .id(function (d) {
              return d.id;
            }) // This provide  the id of a node
            .links(data.links) // and this the list of links
        )
        .force("charge", d3.forceManyBody().strength(-230)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force(
          "center",
          d3.forceCenter(settings.width / 3, settings.height / 2)
        ) // This force attracts nodes to the center of the svg area
        .on("end", ticked);

      function ticked() {
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

        node.attr("transform", (d) => `translate(${d.x + 6}, ${d.y + 6})`);
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
