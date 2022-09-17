import * as fs from "fs";
import path from "path";
import { checkIfFileExists } from "./file.js";

export const ParamsFile = async (DirPath) => {
  const filePath = path.join(DirPath, "params.json");

  if (checkIfFileExists(filePath)) return JSON.parse(fs.readFileSync(filePath));

  fs.writeFileSync(filePath, JSON.stringify({}));
  
  return JSON.parse(fs.readFileSync(filePath));
};
