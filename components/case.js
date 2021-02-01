import network from "../public/network.json";
import { multiPipePressureSeek, pressureDrop2 } from "../public/utils";
import { useEffect } from "react";

function flow(net) {
  const flowed = Object.create(net);

  for (let pipe of net.links) {
    const inflow = net.nodes[pipe.source].properties["flow rate"];
    if (!inflow) continue;

    if (!net.nodes[pipe.target].properties["flow rate"]) {
      flowed.nodes[pipe.target].properties["flow rate"] = 0;
    }

    let targetPressure = net.nodes[pipe.target].properties.pressure;
    if (!targetPressure) targetPressure = [];
    if (typeof targetPressure[0] === "string") continue;

    flowed.nodes[pipe.target].properties["flow rate"] += parseFloat(inflow);
  }
  return flowed;
}

function press(net) {
  const pressed = flow(net);
  for (let pipe of pressed.links) {
    const sourceNode = pressed.nodes[pipe.source];
    const targetNode = pressed.nodes[pipe.target];

    if (!sourceNode.properties.pressure) continue;

    const drop = pressureDrop2({
      ...pipe,
      flowrate: sourceNode.properties["flow rate"],
      ...sourceNode.properties,
    });
    const resultingPressure = sourceNode.properties.pressure[1] - drop;
    const pressureArray = [resultingPressure, resultingPressure];

    if (!targetNode.properties.pressure) {
      targetNode.properties.pressure = pressureArray;
    }

    for (let i in pressureArray) {
      if (!targetNode.properties.pressure[i]) {
        targetNode.properties.pressure[i] = pressureArray[i];
      } else if (typeof targetNode.properties.pressure[i] === "number") {
        targetNode.properties.pressure[i] = Math.min(
          pressureArray[i],
          targetNode.properties.pressure[i]
        );
      }
    }
  }
  // compressor station goal seek
  multiPipePressureSeek({
    nodes: [pressed.nodes[5], pressed.nodes[6], pressed.nodes[7]],
    pipes: [pressed.links[5], pressed.links[6]],
  });

  return pressed;
}

export default function Case({ children }) {
  // useEffect(() => {}, [])

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        systemCase: press(JSON.parse(JSON.stringify(network))),
      });
    }
    return child;
  });
  return <>{childrenWithProps}</>;
}
