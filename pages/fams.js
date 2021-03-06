<p className="mb-2">modify node</p>;
import Head from "next/head";
import Demo from "../components/demo";
import utilStyles from "../styles/utils.module.css";
import Horizon from "../components/horizon";
import SimulationForm from "../components/simulationForm";
import ModifyNode from "../components/modifyNode";
import CaseSelection from "../components/caseSelection";
import Gauge from "../components/gauge";
import Network from "../components/network";
import { useState } from "react";
import { getUnit } from "../public/utils";
import { PressureTable, PipeTable } from "../components/dataTable";
import LineChart from "../components/lineChart";

import Case from "../components/case";

const name = "FAMS";

function nodeData(node) {
  if (!node || !node.properties) {
    return;
  }

  let dataStrings = Object.keys(node.properties).map((prop) => {
    let value = node.properties[prop];
    let unit = getUnit(prop);
    const noUnit = ["closed", "n/a"];
    if (noUnit.includes(`${value}`.toLowerCase())) {
      unit = "";
    }
    return `${prop.charAt(0).toUpperCase() + prop.slice(1)}: ${value}${unit}`;
  });
  return dataStrings ? dataStrings : [];
}

function NodeInfo({ name, lines = [] }) {
  return (
    <>
      <p>{name}</p>
      {lines.map((l, i) => (
        <p key={i}>{l}</p>
      ))}
    </>
  );
}

export default function Fams() {
  const [selectedNode, setNode] = useState({
    name: "placeholder",
    properties: { pressure: [36, 36] },
  });
  const [selectedNodeID, selectNode] = useState(0);
  const [nodeName, setNodeName] = useState("Select a node on the map");
  const [selectedCase, selectCase] = useState(0);

  function handleNodeHover(node) {
    selectNode(node.id);
    setNodeName(node.name);
    setNode(node);
  }

  const guageMaps = [
    [0.5, 0.8, 0.2, 0.7, 0.6, 0.34],
    [0.9, 0.1, 0.3, 0.4, 0.2, 0.15],
    [0.2, 0.0, 0.5, 0.6, 0.6, 0.23],
    [0.1, 0.3, 0.1, 0.3, 0.4, 0.15],
    [0.3, 0.5, 0.7, 0.7, 0.8, 0.37],
    [0.7, 0.2, 0.9, 0.7, 0.1, 0.68],
    [0.6, 0.6, 0.8, 0.6, 0.5, 0.86],
    [0.5, 0.9, 0.4, 0.2, 0.3, 0.45],
    [0.4, 0.4, 0.6, 0.1, 0.7, 0.19],
    [0.8, 0.7, 0.0, 0.9, 0.9, 0.72],
    [0.2, 0.1, 0.1, 0.1, 0.5, 0.11],
  ];

  return (
    <Demo name={name}>
      <Head>
        <title>{name}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div className="grid grid-cols-6 gap-4 text-center rounded-t-xl overflow-hidden bg-gradient-to-r from-green-50 to-green-100 bg-white p-8">
          <div className="col-span-2 rounded-md flex flex-col justify-start 2xl:items-center text-green-500 text-2xl font-extrabold overflow-hidden">
            <p className="pl-1 text-center">Live data stream</p>
            <Case selected={selectedCase}>
              <LineChart />
              {/* <Horizon></Horizon> */}
            </Case>
          </div>
          <div className="col-span-2 rounded-md flex flex-col text-green-500 text-2xl font-extrabold bg-gradient-to-br from-transparent to-green-200">
            <p className="pl-1 text-left">Network map</p>
            <Case selected={selectedCase}>
              <Network handleNodeHover={handleNodeHover}></Network>
            </Case>
          </div>
          <div className="rounded-md flex-col justify-center text-green-500 text-2xl font-extrabold flex-grow col-span-2">
            <Case selected={selectedCase}>
              <PressureTable selectedNodeID={selectedNodeID}></PressureTable>
            </Case>
          </div>
          <div className="rounded-md flex-col text-green-500 text-2xl font-extrabold flex-grow col-span-2">
            <p className="mb-2">Case selection</p>
            <CaseSelection cb={selectCase}></CaseSelection>
          </div>
          <div className="rounded-md flex flex-col text-green-500 text-2xl font-extrabold flex-grow col-span-2">
            <p className="mb-2">Modify node</p>
            <Case selected={selectedCase}>
              <ModifyNode
                name={nodeName}
                properties={
                  selectedNode.properties
                    ? Object.keys(selectedNode.properties)
                    : []
                }
                values={
                  selectedNode.properties
                    ? Object.values(selectedNode.properties)
                    : []
                }
              ></ModifyNode>
            </Case>
          </div>
          <div className="rounded-md flex-col justify-center text-green-500 text-2xl font-extrabold flex-grow col-span-2">
            <Case selected={selectedCase}>
              <PipeTable selectedNodeID={selectedNodeID}></PipeTable>
            </Case>
          </div>
          <div className="col-span-3 bg-green-500 rounded-md flex flex-col items-center text-white text-2xl font-extrabold">
            <p className="text-left pl-1">Simulate</p>
            <SimulationForm></SimulationForm>
            <p className="text-left pl-1 font-medium">
              This will probably be very different
            </p>
          </div>
          <div className="col-span-3 bg-green-500 rounded-md flex flex-col items-center justify-center text-white text-2xl font-extrabold">
            <p>simulation results</p>
            <p>
              chart like{" "}
              <a href="https://observablehq.com/@d3/fan-chart">this</a> or{" "}
              <a href="https://covid19.healthdata.org/global?view=total-deaths&tab=trend">
                this
              </a>{" "}
              maybe
            </p>
          </div>
          {guageMaps[selectedNodeID].map((p, i) => (
            <div
              key={i}
              className="bg-green-500 rounded-md flex flex-col items-center justify-center text-white text-2xl font-extrabold"
            >
              <Gauge percent={p}></Gauge>
            </div>
          ))}
        </div>
      </section>
    </Demo>
  );
}
