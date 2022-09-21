import * as fsEx from "fs-extra";
import * as fs from "fs";
import * as path from "path";
import prettier from "prettier";
import { fileURLToPath } from "url";
import { CaptalizeString } from "../../utils/index.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.resolve(path.dirname(""));
const templateBasePath = path.join(__filename, "..", "templates");
function CreateNewPage(PageName, currentPath, typescript) {
  fsEx.ensureDirSync(currentPath);

  PageName = PageName.replace(/([^\w\s])/gi, "").replace(/\d+/g, "");
  PageName = CaptalizeString(PageName);
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
  const templatePath = path.join(
    templateBasePath,
    "TypeScript",
    "template.tsx"
  );
  const componentPath = path.join(currentPath, `${PageName}.tsx`);

  if (fs.existsSync(componentPath)) {
    console.log("Um componente com esse nome já existe!");
    return false;
  }

  let tsxTemplate = fs.readFileSync(templatePath).toString();
  tsxTemplate = TreatTemplate(tsxTemplate, PageName);

  fs.writeFileSync(path.join(currentPath, `${PageName}.tsx`), tsxTemplate);
  return true;
}
function CreateNewJSXPage(PageName, currentPath) {
  console.log("Criando novo componente .JSX...");
  const templatePath = path.join(
    templateBasePath,
    "JavaScript",
    "template.jsx"
  );
  const componentPath = path.join(currentPath, `${PageName}.jsx`);

  if (fs.existsSync(componentPath)) {
    console.log("Um componente com esse nome já existe!");
    return false;
  }

  let jsxTemplate = fs.readFileSync(templatePath).toString();

  jsxTemplate = TreatTemplate(jsxTemplate, PageName);
  fs.writeFileSync(componentPath, jsxTemplate);
  return true;
}

function TreatTemplate(templateString, PageName) {
  templateString = templateString.replace(/(template)/gm, PageName); // Regex para alterar o nome "template", par ao nome escolhido

  // templateString = templateString.replace(/(\\n\\n$)/gm, "aaaa"); // Regex para remover espaços desncessários
  return decomment(templateString);
}

function decomment(jsCodeStr) {
  const options = {
    printWidth: 80,
    singleQuote: false,
    trailingComma: "none",
    Semicolons: false,
    jsxSingleQuote: false,
    parser: "css",
  };

  // actually strip comments:
  options.parser = (text, { babel }) => {
    const ast = babel(text);
    delete ast.comments;
    return ast;
  };

  return prettier.format(jsCodeStr, options);
}

export default CreateNewPage;
