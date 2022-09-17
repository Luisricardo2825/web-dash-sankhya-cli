import * as fs from "fs";
import path from "path";
const routes = fs.readFileSync(path.join("./routes.jsx")).toString();

export function AddRoute(FileName = "") {
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

  fs.writeFileSync(
    "./routes.jsx",
    file.join("\n").replace(`${mathcr[0]}`, routesArray.join("\n")) // Faz o replace do "Routes" altual, com o atualizado
  );
}
