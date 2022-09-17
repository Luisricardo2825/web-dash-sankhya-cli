import * as fsEx from "fs-extra";
import * as fs from "fs";
import * as path from "path";

import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.resolve(path.dirname(""));
const templateBasePath = path.join(__filename, "..", "templates");
function CreateNewPage(PageName, currentPath, typescript) {
  fsEx.ensureDirSync(currentPath);

  PageName = PageName.replace(/([^\w\s])/gi, "").replace(/\d+/g, "");
  const ext = path.extname(PageName); // File extension
  if (ext) {
    PageName = path.parse(PageName).name;
    console.log(PageName);
  }
  if (typescript) return CreateNewTSXPage(PageName, currentPath);

  return CreateNewJSXPage(PageName, currentPath);
}

function CreateNewTSXPage(PageName, currentPath) {
  console.log("Criando novo componente .TSX...");
  let tsxTemplate = fs
    .readFileSync(path.join(templateBasePath, "TypeScript", "template.tsx"))
    .toString();
  PageName = CaptalizeString(PageName);
  tsxTemplate = tsxTemplate.replace(/(template)/gm, PageName);
  fs.writeFileSync(path.join(currentPath, `${PageName}.tsx`), tsxTemplate);
  return true;
}
function CreateNewJSXPage(PageName, currentPath) {
  console.log("Criando novo componente .JSX...");

  let jsxTemplate = fs
    .readFileSync(path.join(templateBasePath, "JavaScript", "template.jsx"))
    .toString();
  PageName = CaptalizeString(PageName);
  jsxTemplate = jsxTemplate.replace(/(template)/gm, PageName);
  fs.writeFileSync(path.join(currentPath, `${PageName}.jsx`), jsxTemplate);
  return true;
}

export function CaptalizeString(string) {
  return (
    `${string[0]}`.toUpperCase() +
    string.substring(1, string.length).toLowerCase()
  );
}

export default CreateNewPage;
