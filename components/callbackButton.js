export default function CBButton({ cb, classes = "", content }) {
  const classList = classes.split(" ");

  let cln = "font-extrabold rounded-md px-1 ";
  let a =
    "flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10";
  if (!classList.some((cls) => cls.startsWith("bg-"))) {
    classList.push("bg-indigo-600");
  }
  return (
    <button className={a + classList.join(" ")} onClick={cb}>
      {content}
    </button>
  );
}
