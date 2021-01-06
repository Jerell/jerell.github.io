import network from "../public/network.json";

function Row({ node, selected }) {
  const pressureColor = node.properties.pressure > 30 ? "green" : "yellow";
  return (
    <tr className={`text-center ${selected ? "bg-green-100" : ""}`}>
      <td className="text-left">
        <div className="flex items-center">
          <div className="ml-2">
            <div className="font-medium text-gray-900">{node.name}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="text-gray-900">{node.properties.temperature}</div>
      </td>
      <td className="py-1">
        <span
          className={`py-0.5 px-1 inline-flex leading-5 font-semibold rounded-full bg-${pressureColor}-100 text-green-800`}
        >
          {node.properties.pressure}
        </span>
      </td>
      <td className="text-gray-500">{node.properties["flow rate"]}</td>
      <td className="text-center font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          <i className="fas fa-edit"></i> Edit
        </a>
      </td>
    </tr>
  );
}

export default function DataTable({ selectedNodeID }) {
  const pressureNodes = network.nodes.filter((n) => n.properties.pressure);

  return (
    <table className="min-w-full divide-y divide-gray-200 text-left text-xs border border-gray-300">
      <thead className="bg-gray-50">
        <tr className="text-center">
          <th
            scope="col"
            className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider"
          >
            Node
          </th>
          <th
            scope="col"
            className="px-2 py-1 font-medium text-gray-500 uppercase tracking-wider"
          >
            Temp (°C)
          </th>
          <th
            scope="col"
            className="px-2 font-medium text-gray-500 uppercase tracking-wider"
          >
            Pressure (bara)
          </th>
          <th
            scope="col"
            className="px-2 font-medium text-gray-500 uppercase tracking-wider"
          >
            Flow rate (MTPA)
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {pressureNodes.map((pn) => (
          <Row key={pn.id} node={pn} selected={pn.id === selectedNodeID}></Row>
        ))}
      </tbody>
    </table>
  );
}
