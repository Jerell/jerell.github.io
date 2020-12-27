import Head from "next/head";
import Demo from "../components/demo";
import utilStyles from "../styles/utils.module.css";
import Horizon from "../components/horizon";
import SimulationForm from "../components/simulationForm";
import Gauge from "../components/gauge";
import Network from "../components/network";

const name = "FAMS";

export default function Fams() {
  return (
    <Demo name={name}>
      <Head>
        <title>{name}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div className="grid grid-cols-6 gap-4 text-center rounded-t-xl overflow-hidden bg-gradient-to-r from-green-50 to-green-100 bg-white p-8">
          <div className="col-span-2 row-span-2 bg-gray-300 rounded-md flex flex-col 2xl:items-center text-white text-2xl font-extrabold overflow-hidden">
            <p className="pl-1 text-center">Live data stream</p>
            <Horizon></Horizon>
          </div>
          <div className="col-span-2 row-span-2 rounded-md flex flex-col justify-between text-green-500 text-2xl font-extrabold">
            <p className="pl-1 text-center">Network map</p>
            <Network></Network>
            <p className="text-left pl-1 font-medium">
              Interactive map allows you to select nodes to view data for
            </p>
          </div>
          <div className="col-span-2 bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            info or graphs
          </div>
          <div className="rounded-md flex items-center justify-center text-green-500 text-2xl font-extrabold">
            graphs
          </div>
          <div className="bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            graphs
          </div>
          <div className="col-span-3 bg-green-500 rounded-md flex flex-col items-center text-white text-2xl font-extrabold">
            <p className="text-left pl-1">Simulate</p>
            <SimulationForm></SimulationForm>
            <p className="text-left pl-1 font-medium">
              This will probably be very different
            </p>
          </div>
          <div className="col-span-3 bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            simulation results, fan chart
          </div>
          {[0.5, 0.1, 0.2, 0.7, 0.6, 0.3].map((p, i) => (
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
