import {
  multiPipePressureSeek,
  outletPressureSeek,
  pressureDrop2,
} from "../public/utils.js";
import { useEffect } from "react";

function PressureNodeRow({ obj, selected }) {
  const pressureColor =
    obj.properties.pressure && obj.properties.pressure[0] > 30
      ? "green"
      : "yellow";

  const pressure = () => {
    let p = obj.properties.pressure;
    if (!p) {
      return 0;
    }

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

export function PressureTable({ selectedNodeID, systemCase }) {
  const headings = ["Node", "Temp (°C)", "Pressure (bara)", "Flow rate (MTPA)"];
  // const data = systemCase.nodes.filter((n) => n.properties.pressure);
  return (
    <DataTable
      type="Nodes"
      selectedNodeID={selectedNodeID}
      headings={headings}
      data={systemCase.nodes}
      systemCase={systemCase}
    ></DataTable>
  );
}

function PipeRow({ obj, selected, systemCase }) {
  return (
    <tr className={`text-center ${selected ? "bg-green-100" : ""}`}>
      <td className="text-left">
        <div className="flex items-center">
          <div className="ml-2">
            <div className="font-medium text-gray-900">
              {systemCase.nodes[obj.source].name}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="text-gray-900">{systemCase.nodes[obj.target].name}</div>
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
          flowrate: systemCase.nodes[obj.source].properties["flow rate"],
          ...systemCase.nodes[obj.source].properties,
        }).toFixed(1)}
      </td>
    </tr>
  );
}

export function PipeTable({ selectedNodeID, systemCase }) {
  const headings = [
    "Source",
    "Target",
    "Length (km)",
    'Diameter (")',
    "Pressure drop (bar)",
  ];
  const data = systemCase.links;
  return (
    <DataTable
      type="Pipes"
      selectedNodeID={selectedNodeID}
      headings={headings}
      data={data}
      systemCase={systemCase}
    ></DataTable>
  );
}

export default function DataTable({
  selectedNodeID,
  type,
  headings,
  data,
  systemCase,
}) {
  // useEffect(() => {
  //   calcPressureThroughNetwork(systemCase);
  // }, [systemCase]);

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
                systemCase={systemCase}
              ></PressureNodeRow>
            ) : (
              <PipeRow
                key={i}
                obj={obj}
                selected={
                  obj.source === selectedNodeID || obj.target === selectedNodeID
                }
                systemCase={systemCase}
              ></PipeRow>
            )
          )}
        </tbody>
      </table>
    </>
  );
}
