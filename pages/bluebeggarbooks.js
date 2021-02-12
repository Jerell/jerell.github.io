import Demo from "../components/demo";
import Head from "next/head";
import styles from "../styles/bluebeggar.module.css";

const name = "Blue Beggar Books";

export default function Bbb() {
  return (
    <>
      <Demo name={name} header={false}>
        <Head>
          <title>{name}</title>
        </Head>
        <div className={styles.container}>
          <div>
            <img src="/images/logo.png" className={styles.logo} />
          </div>
          <button className={styles.button}>Continue</button>
        </div>
      </Demo>
    </>
  );
}
