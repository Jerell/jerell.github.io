import network from "../public/network.json";
import {
  multiPipePressureSeek,
  outletPressureSeek,
  pressureDrop2,
} from "../public/utils.js";

const flowNet = pressureThroughNetwork();

function processFlow() {
  for (let pipe of network.links) {
    const sourceNode = network.nodes[pipe.source];
    const targetNode = network.nodes[pipe.target];

    const inflow = sourceNode.properties["flow rate"];
    if (!inflow) continue;

    if (!targetNode.properties["flow rate"]) {
      targetNode.properties["flow rate"] = 0;
    }

    if (!targetNode.properties.pressure) targetNode.properties.pressure = [];

    if (typeof targetNode.properties.pressure === "string") {
      console.log(`${targetNode.name}, PRESSURE: ${targetNode.pressure}`);
    } else {
      targetNode.properties["flow rate"] += parseFloat(inflow);
    }
  }
}

function flowThroughNetwork() {
  for (let pipe of network.links) {
    let inflow = network.nodes[pipe.source].properties["flow rate"];
    if (!inflow) continue;
    // console.log(`${inflow} from ${net.nodes[pipe.source].name}`);

    if (!network.nodes[pipe.target].properties["flow rate"]) {
      network.nodes[pipe.target].properties["flow rate"] = 0;
    }

    let targetPressure = network.nodes[pipe.target].properties.pressure;
    if (!targetPressure) targetPressure = [];
    if (typeof targetPressure[0] !== "string") {
      network.nodes[pipe.target].properties["flow rate"] += parseFloat(inflow);
      // console.log(`to ${net.nodes[pipe.target].name}`);
    } else {
      // console.log(`no flow to ${net.nodes[pipe.target].name}`);
    }
  }
  return network;
}

function calcPressureThroughNetwork() {
  let wok = flowThroughNetwork();
  for (let pipe of wok.links) {
    const sourceNode = wok.nodes[pipe.source];
    const targetNode = wok.nodes[pipe.target];
    if (
      sourceNode.id === 5 &&
      targetNode.properties["flow rate"] &&
      targetNode.properties.pressure[0]
    ) {
      // console.log({ sourceNode, targetNode, pipe });
      // console.log(pipe);
      // let p_outlet = outletPressureSeek({
      //   sourceNode,
      //   pipe,
      //   targetPressure: 5,
      //   precision: 2,
      //   // targetPressure: targetNode.properties.pressure[0],
      // });
      // console.log(p_outlet);

      let p_multi = multiPipePressureSeek({
        nodes: [wok.nodes[5], wok.nodes[6], wok.nodes[7]],
        pipes: [wok.links[5], wok.links[6]],
      });
      console.log({ p_multi });
    }
  }
}
calcPressureThroughNetwork();

function pressureThroughNetwork() {
  for (let pipe of network.links) {
    // console.log({ pipe });
    let drop = pressureDrop2({
      ...pipe,
      flowrate: network.nodes[pipe.source].properties["flow rate"],
      ...network.nodes[pipe.source].properties,
    });
    // console.log({ drop });

    let resultingPressure =
      network.nodes[pipe.source].properties.pressure[1] - drop;
    let pressureArray = [resultingPressure, resultingPressure];

    if (!network.nodes[pipe.target].properties.pressure) {
      network.nodes[pipe.target].properties.pressure = [];
    }

    for (let i in pressureArray) {
      if (!network.nodes[pipe.target].properties.pressure[i]) {
        network.nodes[pipe.target].properties.pressure[i] = pressureArray[i];
      } else if (
        typeof network.nodes[pipe.target].properties.pressure[i] === "number"
      ) {
        network.nodes[pipe.target].properties.pressure[i] = Math.min(
          pressureArray[i],
          network.nodes[pipe.target].properties.pressure[i]
        );
      }
    }
  }
  return network;
}

function PressureNodeRow({ obj, selected }) {
  const pressureColor = obj.properties.pressure[0] > 30 ? "green" : "yellow";

  const pressure = () => {
    let p = obj.properties.pressure;
    const decimals = 1;
    if (typeof p[0] === "string") {
      return p[0];
    }
    if (p[0] - p[1]) {
      return `${p[0].toFixed(decimals)} in, ${p[1].toFixed(decimals)} out`;
    }
    return `${p[0].toFixed(decimals)}`;
  };

  const temperature = () => {
    let t = obj.properties.temperature;
    if (!t) return;
    const decimals = 1;
    if (typeof t[0] === "string") {
      return t[0];
    }
    if (t[0] - t[1]) {
      return `${t[0].toFixed(decimals)} in, ${t[1].toFixed(decimals)} out`;
    }
    return `${t[0].toFixed(decimals)}`;
  };

  return (
    <tr className={`text-center ${selected ? "bg-green-100" : ""}`}>
      <td className="text-left">
        <div className="flex items-center">
          <div className="ml-2">
            <div className="font-medium text-gray-900">{obj.name}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="text-gray-900">{temperature()}</div>
      </td>
      <td className="py-1">
        <span
          className={`py-0.5 px-1 inline-flex leading-5 font-semibold rounded-full bg-${pressureColor}-100 text-green-800`}
        >
          {pressure()}
        </span>
      </td>
      <td className="text-gray-500">{obj.properties["flow rate"]}</td>
      <td className="text-center font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          <i className="fas fa-edit"></i> Edit
        </a>
      </td>
    </tr>
  );
}

export function PressureTable({ selectedNodeID }) {
  const headings = ["Node", "Temp (°C)", "Pressure (bara)", "Flow rate (MTPA)"];
  const data = flowNet.nodes.filter((n) => n.properties.pressure);
  return (
    <DataTable
      type="Nodes"
      selectedNodeID={selectedNodeID}
      headings={headings}
      data={data}
    ></DataTable>
  );
}

function PipeRow({ obj, selected }) {
  return (
    <tr className={`text-center ${selected ? "bg-green-100" : ""}`}>
      <td className="text-left">
        <div className="flex items-center">
          <div className="ml-2">
            <div className="font-medium text-gray-900">
              {flowNet.nodes[obj.source].name}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="text-gray-900">{flowNet.nodes[obj.target].name}</div>
      </td>
      <td className="py-1">
        <span
          className={`py-0.5 px-1 inline-flex leading-5 font-normal text-green-800`}
        >
          {obj.length}
        </span>
      </td>
      <td className="text-gray-500">{obj.diameter}</td>
      <td className="text-center font-medium text-gray-900">
        {pressureDrop2({
          ...obj,
          flowrate: flowNet.nodes[obj.source].properties["flow rate"],
          ...flowNet.nodes[obj.source].properties,
        }).toFixed(1)}
      </td>
    </tr>
  );
}

export function PipeTable({ selectedNodeID }) {
  const headings = [
    "Source",
    "Target",
    "Length (km)",
    'Diameter (")',
    "Pressure drop (bar)",
  ];
  const data = flowNet.links;
  return (
    <DataTable
      type="Pipes"
      selectedNodeID={selectedNodeID}
      headings={headings}
      data={data}
    ></DataTable>
  );
}

export default function DataTable({ selectedNodeID, type, headings, data }) {
  const heading = (h, i) => (
    <th
      key={i}
      scope="col"
      className={`px-2 py-1$ ${
        !i ? "text-left " : ""
      }font-medium text-gray-500 uppercase tracking-wider`}
    >
      {h}
    </th>
  );

  return (
    <>
      <p className="text-md font-normal text-black text-left">{type}</p>
      <table className="min-w-full divide-y divide-gray-200 text-left text-xs border border-gray-300">
        <thead className="bg-gray-50">
          <tr className="text-center">
            {headings.map((h, i) => heading(h, i))}
            {type === "Nodes" ? (
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((obj, i) =>
            type === "Nodes" ? (
              <PressureNodeRow
                key={i}
                obj={obj}
                selected={obj.id === selectedNodeID}
              ></PressureNodeRow>
            ) : (
              <PipeRow
                key={i}
                obj={obj}
                selected={
                  obj.source === selectedNodeID || obj.target === selectedNodeID
                }
              ></PipeRow>
            )
          )}
        </tbody>
      </table>
    </>
  );
}
