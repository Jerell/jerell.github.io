import Head from "next/head";
import Demo from "../components/demo";
import utilStyles from "../styles/utils.module.css";

const name = "FAMS";

export default function Vis() {
  return (
    <Demo name={name}>
      <Head>
        <title>{name}</title>
      </Head>
      <section className={utilStyles.headingMd}></section>
    </Demo>
  );
}
