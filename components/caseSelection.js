function CaseOption({
  name = "Example case 1",
  id = "example_1",
  selected = false,
  disabled = false,
}) {
  return (
    <>
      <div className="flex items-center">
        <input
          id={id}
          name="case"
          type="radio"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          defaultChecked={selected}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className="ml-3 block text-sm font-medium text-gray-700"
        >
          {name}
        </label>
      </div>
    </>
  );
}

export default function CaseSelection({ cb }) {
  const cases = {
    case_1: "Example case 1",
    case_2: "Example case 2",
    case_3: "Example case 3",
    case_4: "Example case 4",
    case_5: "Example case 5",
  };
  function handleChange(e) {
    console.log(e.target.id);
    if (cb) {
      const index = e.target.id.split("_")[1] - 1;
      cb(index);
    }
  }
  return (
    <>
      <form className="w-full text-black">
        <div className="shadow rounded-md px-4 py-5 bg-white w-full grid grid-cols-6 gap-4">
          <fieldset className="col-span-6 text-left">
            <div>
              <legend className="text-base font-medium text-gray-900">
                Select a case
              </legend>
              <p className="text-sm font-normal text-gray-500">
                These are example states for the system.
              </p>
            </div>
            <div className="mt-4 space-y-4" onChange={handleChange}>
              {Object.keys(cases).map((c, i) => (
                <CaseOption
                  name={cases[c]}
                  id={c}
                  key={c}
                  selected={i === 0}
                  disabled={i >= 2}
                ></CaseOption>
              ))}
            </div>
          </fieldset>
        </div>
      </form>
    </>
  );
}
