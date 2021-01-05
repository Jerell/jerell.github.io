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
      width: 1190,
      height: 296,
      margin: { top: 10, right: 30, bottom: 30, left: 40 },
      nodeRadius: 10,
      lineThickness: 5,
      color: {
        node: {
          onshore: "#22C55E",
          offshore: "#0D9488",
        },
        pipe: {
          onshore: "#86EFAC",
          offshore: "#2DD4BF",
        },
      },
    };

    const pipelength = d3.scaleLinear().domain([0, 50]).range([15, 30]);

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id(function (d) {
            return d.id;
          })
          .distance((d) => pipelength(d.length))
      )
      .force("charge", d3.forceManyBody().strength(-150))
      .force("center", d3.forceCenter(settings.width / 2, settings.height / 2));

    function dragstarted(e, d) {
      if (!e.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(e, d) {
      d.fx = e.x;
      d.fy = e.y;
    }

    function dragended(e, d) {
      if (!e.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

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
          return d.name.startsWith("Manifold")
            ? settings.color.pipe[shore]
            : settings.color.node[shore];
        });

      node.call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
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

      // data.nodes[4].fx = settings.width / 2.5;
      // data.nodes[4].fy = 100;

      simulation.nodes(data.nodes).on("tick", ticked);

      simulation.force("link").links(data.links);

      // const simulation = d3
      //   .forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
      //   .force(
      //     "link",
      //     d3
      //       .forceLink() // This force provides links between nodes
      //       .id(function (d) {
      //         return d.id;
      //       }) // This provide  the id of a node
      //       .links(data.links) // and this the list of links
      //   )
      //   .force("charge", d3.forceManyBody().strength(-230)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      //   .force(
      //     "center",
      //     d3.forceCenter(settings.width / 2, settings.height / 2)
      //   ) // This force attracts nodes to the center of the svg area
      //   .on("end", ticked);

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
