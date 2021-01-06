import { getUnit } from "../public/utils";

function Property({ prop, value }) {
  return (
    <>
      <label htmlFor={prop} className="block text-sm font-medium text-gray-700">
        {prop.charAt(0).toUpperCase() + prop.slice(1)}
      </label>
      <div className="mt-1 relative rounded-md border border-gray-300 bg-white shadow-sm flex">
        <input
          type="number"
          name={prop}
          id={prop}
          className="my-0.5 flex flex-grow py-2 pl-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          min="1"
          max="1000"
          placeholder={value}
        />
        <div className="inset-y-0 right-0 flex items-center">
          <span class="inline-flex items-center px-2 text-gray-400 font-normal text-sm">
            {getUnit(prop)}
          </span>
        </div>
      </div>
    </>
  );
}

export default function ModifyNode({ properties = [], values = [], name }) {
  return (
    <>
      <form className="w-full text-black">
        <div className="shadow rounded-md px-4 py-5 bg-white w-full grid grid-cols-6 gap-4">
          <div className="col-span-6 text-left">
            <legend class="text-base font-medium text-gray-900">{name}</legend>
            <p class="text-sm font-normal text-gray-500">
              Adjust the values below to create a new case.
            </p>
          </div>
          {properties.map((p, i) => (
            <div className="sm:col-span-2" key={i}>
              <Property prop={p} value={values[i]}></Property>
            </div>
          ))}
          <div className="col-span-6">
            <button
              // type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e) => e.preventDefault()}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
