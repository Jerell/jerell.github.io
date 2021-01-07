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

export function pressureDrop({ length, diameter, flowrate = 1 }) {
  length = length * 1000; // km to m
  const area = (diameter / 2) ** 2 * Math.PI;
  const density = 1.976;
  const f = 0.013615299; // Darcy friction factor

  const mtpaToM3ps = (mtpa) => {
    const tpa = mtpa / 10 ** 6;
    const kgpa = tpa / 1000;
    const m3pa = kgpa / density;
    const secondsInAYear = 60 * 60 * 24 * 365.25;
    return m3pa / secondsInAYear;
  };
  const velocity = mtpaToM3ps(flowrate) / area;

  const drop = ((4 * density * velocity ** 2 * f) / (2 * diameter)) * length;
  const paToBar = (pa) => pa * 10 ** 5;
  return drop ? paToBar(drop) : "-";
}
