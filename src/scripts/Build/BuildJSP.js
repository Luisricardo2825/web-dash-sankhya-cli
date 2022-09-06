import fs from "fs";
import archiver from "archiver";
import { Sanitizehtml } from "./cherrio.js";
import path from "path";
import { rootPath } from "../../utils/index.js";

export function BuildJsp(spinner, currentPath) {
  const jspHeader = fs
    .readFileSync(path.join(rootPath, "src", "templates", "Java", "header.jsp"))
    .toString();
  return new Promise(function (resolve, reject) {
    Sanitizehtml(
      path.join(currentPath, "SankhyaBuild", "index.html"),
      spinner
    ).then((data) => {
      let result = jspHeader + "\n" + data;

      result = result.replace("%PUBLIC_URL%", "${BASE_FOLDER}");

      // TreatJSFiles();
      // TreatMEDIAFiles();
      fs.writeFile(
        "./SankhyaBuild/index.jsp",
        result,
        "utf8",
        async function (err) {
          if (err) return console.log(err);
          zipDirectory("./SankhyaBuild", "./SankhyaBuild.zip", spinner)
            .then(() => {
              resolve(true);
            })
            .catch((err) => {
              reject(err);
            });
        }
      );
    });
  });
}

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath, spinner) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on("error", (err) => reject(err))
      .pipe(stream);
    archive.on("progress", (progress) => {
      spinner.color = "red";
      spinner.text = `"[ZIP]" ${progress.entries.processed}/ ${progress.entries.total}`;
    });
    stream.on("close", () => {
      return resolve();
    });

    archive.finalize();
  });
}
