import * as fs from "fs";
import * as cheerio from "cheerio";
import { ParamsFile } from "../../utils/index.js";

const pattern = /[A-Za-z]/; // Somente letras
const javaRegex = /^\$JAVA\((.*)\)/;

export async function Sanitizehtml(file, spinner, currentPath) {
  const parameters = JSON.stringify(ParamsFile(currentPath, "cherrriooo"));
  const params_obj = JSON.parse(parameters);
  const java_code_params = {};
  for (const [key, value] of Object.entries(params_obj)) {
    // Check if is a java code
    if (javaRegex.test(value)) {
      const regexGroups = value.match(javaRegex);
      // Remove $JAVA
      const new_value = regexGroups[1];
      java_code_params[key] = new_value;
      delete params_obj[key];
    }
  }

  var $ = cheerio.load(fs.readFileSync(file), {
    xmlMode: true,
    decodeEntities: false,
    selfClosingTags: false,
  });
  spinner.color = "cyan";
  spinner.text = `Alterando caminho dos links...`;
  $("head link").each(async function (i, elm) {
    const attr = $(this).attr("href");

    if (!pattern.test(attr[0]))
      $(this).attr("href", "${BASE_FOLDER}" + $(this).attr("href"));
  });

  spinner.color = "yellow";
  spinner.text = `Alterando caminho dos scripts...`;
  $("head script").each(async function (i, elm) {
    const attr = $(this).attr("src");
    if ($(this).attr("src") && !pattern.test(attr[0])) {
      $(this).attr("src", "${BASE_FOLDER}" + $(this).attr("src"));
    }
  });

  spinner.color = "green";
  spinner.text = `Injetando parametros do sankhya...`;
  $("#sankhyaVariable").each(async function (i, elm) {
    let script = ` var Params = ${JSON.stringify(params_obj)};
    localStorage.setItem("base_folder", "\${BASE_FOLDER}");
    `;

    for (const [key, value] of Object.entries(java_code_params)) {
      script += `Params.${key} = ${value};`;
    }

    $(this).text(script);
  });

  return $.html({
    lowerCaseAttributeNames: false,
    selfClosingTags: true,
  }).toString();
}

function unescapeSlashes(str) {
  // add another escaped slash if the string ends with an odd
  // number of escaped slashes which will crash JSON.parse
  let parsedStr = str.replace(/(^|[^\\])(\\\\)*\\$/, "$&\\");

  // escape unescaped double quotes to prevent error with
  // added double quotes in json string
  parsedStr = parsedStr.replace(/(^|[^\\])((\\\\)*")/g, "$1\\$2");

  try {
    parsedStr = JSON.parse(`"${parsedStr}"`);
  } catch (e) {
    return str;
  }
  return parsedStr;
}
