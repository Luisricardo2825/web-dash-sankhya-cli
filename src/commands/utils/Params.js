import * as fs from "fs";
import path from "path";
export const CheckParamsFile = (path) => {
  if (!fs.existsSync(path)) return false;
  return true;
};

export const ParamsFile = (DirPath) => {
  const filePath = path.join(DirPath, "params.json");
  if (CheckParamsFile(filePath)) return JSON.parse(fs.readFileSync(filePath));
  fs.writeFileSync(filePath, JSON.stringify({}));
  return JSON.parse(fs.readFileSync(filePath));
};
