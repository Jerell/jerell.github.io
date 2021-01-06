function Case({ name = "Example case 1", id = "example_1", selected = false }) {
  return (
    <>
      <div class="flex items-center">
        <input
          id={id}
          name="case"
          type="radio"
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          defaultChecked={selected}
        />
        <label for={id} class="ml-3 block text-sm font-medium text-gray-700">
          {name}
        </label>
      </div>
    </>
  );
}

export default function CaseSelection() {
  const cases = {
    example_1: "Example case 1",
    example_2: "Example case 2",
    example_3: "Example case 3",
  };
  return (
    <>
      <form className="w-full text-black">
        <div className="shadow rounded-md px-4 py-5 bg-white w-full grid grid-cols-6 gap-4">
          <fieldset className="col-span-6 text-left">
            <div>
              <legend class="text-base font-medium text-gray-900">
                Select a case
              </legend>
              <p class="text-sm font-normal text-gray-500">
                These are example states for the system.
              </p>
            </div>
            <div class="mt-4 space-y-4">
              {Object.keys(cases).map((c, i) => (
                <Case name={cases[c]} id={c} key={c} selected={i === 0}></Case>
              ))}
            </div>
          </fieldset>
        </div>
      </form>
    </>
  );
}
