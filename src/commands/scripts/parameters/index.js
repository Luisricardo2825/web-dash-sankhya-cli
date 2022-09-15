import { writeFile } from "fs/promises";
import path from "path";
import { ParamsFile } from "../../utils/Params.js";

export function setNewParams(param, currentPath) {
  const parameters = ParamsFile(process.cwd());
  return new Promise(async function (resolve, reject) {
    const parametrosSankhya = parameters;

    parametrosSankhya[param] = `\${${param}}`;

    try {
      await writeFile(
        path.join(process.cwd(), "params.json"),
        JSON.stringify(parametrosSankhya)
      );
      resolve(`${param}`);
    } catch (error) {
      reject(error);
    }
  });
}
export function removeParam(param, currentPath) {
  const parameters = ParamsFile(process.cwd());
  return new Promise(async function (resolve, reject) {
    const parametrosSankhya = parameters;

    delete parametrosSankhya[param];

    try {
      await writeFile(
        path.join(process.cwd(), "params.json"),
        JSON.stringify(parametrosSankhya)
      );
      resolve(`${param}`);
    } catch (error) {
      reject(error);
    }
  });
}
