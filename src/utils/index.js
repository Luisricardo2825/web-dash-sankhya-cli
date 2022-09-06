import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.resolve(path.dirname(""));
export const rootPath = path.resolve(__dirname);
