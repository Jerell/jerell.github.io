import network from "../public/network.json";
import { pressureDrop } from "../public/utils.js";

const flowNet = flowThroughNetwork();

function flowThroughNetwork() {
  let net = network;
  for (let pipe of net.links) {
    let inflow = net.nodes[pipe.source].properties["flow rate"];
    if (!inflow) continue;
    console.log(`${inflow} from ${net.nodes[pipe.source].name}`);

    if (!net.nodes[pipe.target].properties["flow rate"])
      net.nodes[pipe.target].properties["flow rate"] = 0;

    console.log(`to ${net.nodes[pipe.target].name}`);
    net.nodes[pipe.target].properties["flow rate"] += parseFloat(inflow);
  }
  return net;
}

function PressureNodeRow({ obj, selected }) {
  const pressureColor = obj.properties.pressure > 30 ? "green" : "yellow";
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
        <div className="text-gray-900">{obj.properties.temperature}</div>
      </td>
      <td className="py-1">
        <span
          className={`py-0.5 px-1 inline-flex leading-5 font-semibold rounded-full bg-${pressureColor}-100 text-green-800`}
        >
          {obj.properties.pressure}
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
        {pressureDrop({
          ...obj,
          flowrate: flowNet.nodes[obj.source].properties["flow rate"],
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
    "Pressure drop (bara)",
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
