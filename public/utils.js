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
  // const f = 0.013615299; // Darcy friction factor
  const molarMass = 44;
  const r = 0.0821;
  const viscosity = 0.0000150941;

  const mtpaToM3ps = (mtpa) => {
    const secondsInAYear = 60 * 60 * 24 * 365.25;

    const tpa = mtpa * 10 ** 6;

    const kgpa = tpa * 1000;
    const kgps = kgpa / secondsInAYear;
    const molesps = kgps / molarMass;
    console.log({ molesps });
    const m3ps = (molesps * r * (temperature[0] + 273)) / pressure[0];

    const result = m3ps;
    console.log(result);
    return result;
  };
  const velocity = mtpaToM3ps(flowrate) / area;
  console.log({ velocity });
  const re = (density * velocity * length) / viscosity;
  console.log({ re });
  const e = 0.000025;
  let f =
    re > 5000
      ? 1.325 / Math.log(e / (3.7 * diameter) + 5.74 / re ** 0.9) ** 2
      : 0.0119;
  console.log({ re, f });

  console.log({ velocity });
  const drop = ((density * velocity ** 2 * f) / (2 * diameter)) * length;
  const paToBar = (pa) => pa / 10 ** 5;
  return drop ? paToBar(drop) : "-";
}

export function pressureDrop2({
  length,
  diameter,
  flowrate,
  temperature = [10, 10],
  pressure,
}) {
  // console.log({ length, diameter, flowrate, temperature, pressure });
  if (!pressure) {
    return "-";
  }
  length = length * 1000; // km to m
  diameter = diameter * 0.0254; // inches to m
  const area = (diameter / 2) ** 2 * Math.PI;
  const density = 92.92;
  // const f = 0.013615299; // Darcy friction factor
  const molarMass = 44;
  const r = 0.0821;
  const viscosity = 0.0000150941;
  const tempKelvin = temperature[0] + 273;

  let moles;

  const mtpaToM3ps = (mtpa) => {
    const secondsInAYear = 60 * 60 * 24 * 365.25;

    const tpa = mtpa * 10 ** 6;

    const kgpa = tpa * 1000;
    const kgps = kgpa / secondsInAYear;
    const molesps = kgps / molarMass;
    moles = molesps;
    // console.log({ molesps });
    const m3ps = (molesps * r * tempKelvin) / pressure[0];

    return m3ps;
  };

  const barToMPa = (bar) => {
    return bar / 10;
  };

  const velocity = mtpaToM3ps(flowrate) / area;
  const re = (density * velocity * length) / viscosity;
  const e = 0.000025;
  let f =
    re > 5000
      ? 1.325 / Math.log(e / (3.7 * diameter) + 5.74 / re ** 0.9) ** 2
      : 0.0119;

  const compressibilityFactor =
    (pressure[0] * mtpaToM3ps(flowrate)) / (moles * r * tempKelvin);

  const temperatureStandard = 273;
  const pressureStandard = barToMPa(1.0132);
  const densityStandard = 1.973;

  const flowrateStandard =
    ((mtpaToM3ps(flowrate) / compressibilityFactor) *
      (temperatureStandard / tempKelvin) *
      barToMPa(pressure[0])) /
    pressureStandard;

  const drop =
    (barToMPa(pressure[0]) -
      Math.sqrt(
        barToMPa(pressure[0]) ** 2 -
          (((5.7 * 10 ** -4 * f * length) / 1000) *
            compressibilityFactor *
            tempKelvin *
            densityStandard *
            flowrateStandard ** 5) /
            (diameter * 1000) ** 3
      )) *
    10 ** 6; // MPa

  const paToBar = (pa) => pa / 10 ** 5;

  return drop ? paToBar(drop) : 0;
}
