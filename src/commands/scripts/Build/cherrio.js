import * as fs from "fs";
import * as cheerio from "cheerio";
import { ParamsFile } from "../../utils/index.js";

export async function Sanitizehtml(file, spinner, currentPath) {
  const parameters = JSON.stringify(ParamsFile(currentPath, "cherrriooo"));
  var $ = cheerio.load(fs.readFileSync(file), {
    xmlMode: true,
    decodeEntities: false,
    selfClosingTags: false,
  });
  spinner.color = "cyan";
  spinner.text = `Alterando caminho dos links...`;
  $("head link").each(async function (i, elm) {
    $(this).attr("href", "${BASE_FOLDER}" + $(this).attr("href"));
  });

  spinner.color = "yellow";
  spinner.text = `Alterando caminho dos scripts...`;
  $("head script").each(async function (i, elm) {
    if ($(this).attr("src")) {
      $(this).attr("src", "${BASE_FOLDER}" + $(this).attr("src"));
    }
  });

  spinner.color = "green";
  spinner.text = `Injetando parametros do sankhya...`;
  $("#sankhyaVariable").each(async function (i, elm) {
    $(this).text(`var Params = ${parameters};
    localStorage.setItem("base_folder", "\${BASE_FOLDER}");`);
  });

  return $.xml().toString();
}
