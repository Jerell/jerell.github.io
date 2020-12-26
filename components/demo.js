import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export default function Demo({ children, name }) {
  const siteTitle = `${name} | Demo`;
  return (
    <>
      <div className="mt-2 mb-2 px-4">
        <Head>
          <link rel="icon" href="./favicon.ico" />
          <meta name="description" content={`A demo of ${name}`} />
          <meta
            property="og:image"
            content={`https://og-image.now.sh/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          <h2 className={utilStyles.headingLg}>{name}</h2>
        </header>
        <main>{children}</main>
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      </div>
    </>
  );
}
