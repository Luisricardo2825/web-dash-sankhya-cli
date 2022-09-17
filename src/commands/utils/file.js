import * as fs from "fs";

export const checkIfFileExists = (path) => {
  if (!fs.existsSync(path)) return false;
  return true;
};

