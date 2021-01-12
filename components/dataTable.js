import network from "../public/network.json";
import { pressureDrop2 } from "../public/utils.js";

const flowNet = pressureThroughNetwork();

function flowThroughNetwork() {
  let net = network;
  for (let pipe of net.links) {
    let inflow = net.nodes[pipe.source].properties["flow rate"];
    if (!inflow) continue;
    console.log(`${inflow} from ${net.nodes[pipe.source].name}`);

    if (!net.nodes[pipe.target].properties["flow rate"]) {
      net.nodes[pipe.target].properties["flow rate"] = 0;
    }

    let targetPressure = net.nodes[pipe.target].properties.pressure;
    if (!targetPressure) targetPressure = [];
    if (typeof targetPressure[0] !== "string") {
      net.nodes[pipe.target].properties["flow rate"] += parseFloat(inflow);
      console.log(`to ${net.nodes[pipe.target].name}`);
    } else {
      console.log(`no flow to ${net.nodes[pipe.target].name}`);
    }
  }
  return net;
}

function pressureThroughNetwork() {
  let net = flowThroughNetwork();
  for (let pipe of net.links) {
    console.log({ pipe });
    let drop = pressureDrop2({
      ...pipe,
      flowrate: net.nodes[pipe.source].properties["flow rate"],
      ...net.nodes[pipe.source].properties,
    });
    console.log({ drop });

    let resultingPressure =
      net.nodes[pipe.source].properties.pressure[1] - drop;
    let pressureArray = [resultingPressure, resultingPressure];

    if (!net.nodes[pipe.target].properties.pressure) {
      net.nodes[pipe.target].properties.pressure = [];
    }

    for (let i in pressureArray) {
      if (!net.nodes[pipe.target].properties.pressure[i]) {
        net.nodes[pipe.target].properties.pressure[i] = pressureArray[i];
      }
    }

    // console.log(net.nodes[pipe.target].properties);
    // net.nodes[pipe.target].properties.pressure[0] =
    //   net.nodes[pipe.source].properties.pressure[1] - drop;
    // net.nodes[pipe.target].properties.pressure[1] =
    //   net.nodes[pipe.source].properties.pressure[1] - drop;
  }
  return net;
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
        })}
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
