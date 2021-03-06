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
    const m3ps = (molesps * r * (temperature[0] + 273)) / pressure[1];

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
    return 0;
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
    const m3ps = (molesps * r * tempKelvin) / pressure[1];

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
    (pressure[1] * mtpaToM3ps(flowrate)) / (moles * r * tempKelvin);

  const temperatureStandard = 273;
  const pressureStandard = barToMPa(1.0132);
  const densityStandard = 1.973;

  const flowrateStandard =
    ((mtpaToM3ps(flowrate) / compressibilityFactor) *
      (temperatureStandard / tempKelvin) *
      barToMPa(pressure[1])) /
    pressureStandard;

  const drop =
    (barToMPa(pressure[1]) -
      Math.sqrt(
        barToMPa(pressure[1]) ** 2 -
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

export function outletPressureSeek({
  sourceNode,
  pipe,
  targetPressure,
  precision = 1,
  calc = pressureDrop2,
}) {
  targetPressure = +targetPressure.toFixed(precision);

  const drop = () =>
    calc({
      ...pipe,
      flowrate: sourceNode.properties["flow rate"],
      ...sourceNode.properties,
    });

  const resultingPressure = (dropAmt = 0) => {
    return +(sourceNode.properties.pressure[1] - dropAmt).toFixed(precision);
  };

  let high = 50;
  let low = 0;

  let guesses = 0;

  while (guesses <= 30 && low <= high) {
    if (!pipe.length) {
      sourceNode.properties.pressure[0] = sourceNode.properties.pressure[1] = Number(
        targetPressure.toFixed(precision)
      );
      return { outletPressure: targetPressure, drop: 0 };
    }
    let mid = (high + low) / 2;
    sourceNode.properties.pressure[1] = mid;
    let dropAmt = drop();
    let result = resultingPressure(dropAmt);

    if (result === targetPressure) {
      return { outletPressure: mid, drop: dropAmt };
    }

    if (result > targetPressure) {
      high = mid;
    } else {
      low = mid;
    }
  }
  return -1;
}

export function multiPipePressureSeek({
  nodes = [],
  pipes = [],
  precision = 1,
  seek = outletPressureSeek,
}) {
  const firstNode = nodes[0];
  const finalNode = nodes[nodes.length - 1];

  const targetPressure = [finalNode.properties.pressure[0]];
  if (!targetPressure) return -1;
  // console.group("input data");
  // console.table(nodes);
  // console.table(pipes);
  // console.groupEnd();

  let sr;
  for (let p in pipes) {
    // console.group(`pass ${p}`);
    // console.table(targetPressure);
    let n = nodes.length - 2 - p;
    // console.log(n, nodes[n], pipes[n]);

    // console.log("Source");
    // console.table(nodes[n].properties);

    const seekResult = seek({
      sourceNode: nodes[n],
      pipe: pipes[n],
      targetPressure: targetPressure[0],
    });
    sr = seekResult;
    // console.log(seekResult);

    const nodePressure = seekResult.outletPressure;

    if (nodes[n + 1]) {
      nodes[n + 1].properties.pressure[0] = nodePressure - seekResult.drop;
    }

    targetPressure.unshift(nodePressure);
    // console.groupEnd();
  }
  // console.log(nodes);

  return sr;
}
