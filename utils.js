export const units = {
  pressure: " bara",
  flowrate: " MTPA",
  temperature: "°C",
  outlettemperature: "°C",
  composition: "%",
  length: "km",
  diameter: '"',
  power: " W",
};

export function getUnit(prop = "") {
  prop = prop.split(" ").join("");
  return units[prop] ? units[prop] : "";
}

export function pressureDrop({
  length,
  diameter,
  flowrate,
  temperature = [10, 10],
  pressure,
}) {
  console.log({ length, diameter, flowrate, temperature, pressure });
  if (!pressure) {
    return "-";
  }
  length = length * 1000; // km to m
  diameter = diameter * 0.0254; // inches to m
  const area = (diameter / 2) ** 2 * Math.PI;
  const density = 92.92;
  const f = 0.013615299; // Darcy friction factor
  const molarMass = 44;
  const r = 0.0821;

  const mtpaToM3ps = (mtpa) => {
    const secondsInAYear = 60 * 60 * 24 * 365.25;

    const tpa = mtpa * 10 ** 6;

    const kgpa = tpa * 1000;
    const kgps = kgpa / secondsInAYear;
    const molesps = kgps / molarMass;

    const m3ps = (molesps * r * temperature[0]) / pressure[0];

    const result = m3ps;
    console.log(result);
    return result;
  };
  const velocity = mtpaToM3ps(flowrate) / area;
  console.log({ velocity });
  const drop = ((density * velocity ** 2 * f) / (2 * diameter)) * length;
  const paToBar = (pa) => pa / 10 ** 5;
  return drop ? paToBar(drop) : "-";
}
