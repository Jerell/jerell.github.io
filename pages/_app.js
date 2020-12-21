import "../styles/global.scss";
import { parseISO, format } from "date-fns";
import { name } from "../components/layout";

const links = [
  { text: "GitHub", url: "https://github.com/jerell" },
  {
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/jerell-james-831b12158/",
  },
];

const FootLink = ({ text, url }) => {
  return (
    <>
      <a href={url} target="_">
        {text}
      </a>{" "}
    </>
  );
};

export default function App({ Component, pageProps }) {
  const date = new Date("2020-01-01");

  return (
    <>
      <Component {...pageProps} />
      <footer className="bg-gray-100 w-full text-center">
        {links.map((l) => (
          <FootLink {...l}></FootLink>
        ))}
        <p>
          &#169;{" "}
          <time dateTime={date}>
            {format(date, "yyyy")} {name}
          </time>{" "}
        </p>
      </footer>
    </>
  );
}
