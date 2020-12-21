import "../styles/global.css";
import { parseISO, format } from "date-fns";
import { name } from "../components/layout";

export default function App({ Component, pageProps }) {
  const date = new Date();

  return (
    <>
      <Component {...pageProps} />
      <footer className="bg-gray-100 w-full text-center">
        <a href="https://github.com/jerell" target="_">
          GitHub
        </a>
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
