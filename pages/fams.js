import Head from "next/head";
import Demo from "../components/demo";
import utilStyles from "../styles/utils.module.css";
import Horizon from "../components/horizon";

const name = "FAMS";

export default function Fams() {
  return (
    <Demo name={name}>
      <Head>
        <title>{name}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div className="grid grid-cols-6 gap-4 text-center rounded-t-xl overflow-hidden bg-gradient-to-r from-green-50 to-green-100 bg-white p-8">
          <div className="col-span-2 row-span-2 bg-gray-300 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            <Horizon></Horizon>
          </div>
          <div className="col-span-2 row-span-2 bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            2
          </div>
          <div className="col-span-2 bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            3
          </div>
          <div className="bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            4
          </div>
          <div className="bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            5
          </div>
          <div className="bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            6
          </div>
          <div className="bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            a
          </div>
          <div className="bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            a
          </div>
          <div className="bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            a
          </div>
          <div className="bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            a
          </div>
          <div className="bg-green-500 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">
            a
          </div>
        </div>
      </section>
    </Demo>
  );
}
