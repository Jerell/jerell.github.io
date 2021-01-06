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
  const density = 1.976;
  const area = (diameter / 2) ** 2 * Math.PI;
  const velocity = flowrate / area; // convert flowrate units
  const f = 0.013615299; // Darcy friction

  const drop = ((4 * density * velocity ** 2 * f) / (2 * diameter)) * length;
  return drop ? drop.toFixed(4) : "-";
}
