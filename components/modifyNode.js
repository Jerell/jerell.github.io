function Property({ prop, units, value }) {
  return (
    <>
      <label htmlFor={prop} className="block text-sm font-medium text-gray-700">
        {prop.charAt(0).toUpperCase() + prop.slice(1)}
      </label>
      <div className="mt-1 relative rounded-md border border-gray-300 bg-white shadow-sm">
        <input
          type="number"
          name={prop}
          id={prop}
          className="my-0.5 block w-9/12 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          min="1"
          max="1000"
          placeholder={value}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="unit" className="sr-only">
            Unit
          </label>
          <select
            id="unit"
            name="unit"
            className="focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 h-full py-0 px-1 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
            <option>bara</option>
            <option>Pa</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default function ModifyNode() {
  return (
    <>
      <form className="w-full text-black">
        <div className="shadow rounded-md px-4 py-5 bg-white w-full grid grid-cols-6 gap-4">
          <div className="sm:col-span-2">
            <Property prop="pressure" value="100"></Property>
          </div>
          <div className="sm:col-span-2">
            <Property prop="temperature" value="30"></Property>
          </div>
          <div className="sm:col-span-2">
            <Property prop="flow rate" value="10"></Property>
          </div>
          <div className="col-span-6">
            <button
              // type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e) => e.preventDefault()}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
