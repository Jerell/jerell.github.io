export default function SimulationForm() {
  return (
    <>
      <form className="w-full text-black">
        <div className="shadow rounded-md px-4 py-5 bg-white w-full grid grid-cols-6 gap-4">
          <div className="sm:col-span-2">
            <label
              htmlFor="supplier"
              className="block text-sm font-medium text-gray-700"
            >
              Supplier
            </label>
            <select
              id="supplier"
              name="supplier"
              autoComplete="supplier"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Supplier 1</option>
              <option>Supplier 2</option>
              <option>Supplier 3</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="amount"
                id="amount"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="1000"
                autoComplete="off"
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
                  <option>KG</option>
                  <option>L</option>
                </select>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              autoComplete="off"
            />
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
