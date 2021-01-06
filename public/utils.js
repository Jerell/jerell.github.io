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
export function getUnit(prop) {
  prop = prop.replaceAll(" ", "");
  return units[prop] ? units[prop] : "";
}
