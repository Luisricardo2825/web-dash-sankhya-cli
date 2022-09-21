import * as fs from "fs";
import path from "path";
import prettier from "prettier";
import { CaptalizeString } from "../../utils/index.js";
let routeFile = path.join(process.cwd(), "src", "Router", "routes.tsx");
if (!fs.existsSync(routeFile)) {
  routeFile = path.join(process.cwd(), "src", "Router", "routes.jsx");
}
const routes = fs.readFileSync(routeFile).toString();

export function AddRoute(FileName = "") {
  FileName = CaptalizeString(FileName);
  const mathcr = routes.match(/(?:<Routes>)([\s\S]*)(?:<\/Routes>)/gim);
  let routesArray = mathcr[0].replace("\r", "").split(/\n/);
  const arrayEnd = routesArray.pop();
  //Aqui adiciona array novo
  routesArray.push(
    `<Route path="/${FileName.toLocaleLowerCase()}" element={<${FileName} {...props} />} />`
  );
  //Aqui fecha a tag "Routes"
  routesArray.push(arrayEnd);

  const file = routes
    .split(/\n/)
    .map((line) => {
      return line.replace(/\r/, "");
    })
    .filter((line) => line);

  const rotaTeste = `import ${FileName} from "../pages/${FileName}";`;

  let initialValue = "";
  file.reduce((previousValue, currentValue) => {
    //   console.log(`${currentValue}`);

    if (previousValue.includes("import") && currentValue.includes("function")) {
      // Aqui adiciona o import
      file.splice(file.indexOf(currentValue), 0, rotaTeste);
      // Aqui adiciona uma quebra de linha entre o import e a função
      file.splice(file.indexOf(currentValue), 0, "\r");
    }
    return currentValue;
  }, initialValue);

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

  const code = prettier.format(
    file.join("\n").replace(`${mathcr[0]}`, routesArray.join("\n")),
    options
  ); // Format code

  fs.writeFileSync(routeFile, code);
}
