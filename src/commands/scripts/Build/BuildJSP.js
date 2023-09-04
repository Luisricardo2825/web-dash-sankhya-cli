import fs from "fs";
import archiver from "archiver";
import { Sanitizehtml } from "./cherrio.js";
import * as path from "path";
import { fileURLToPath } from "url";
import { checkIfFileExists } from "../../utils/file.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.resolve(path.dirname(""));
export function BuildJsp(spinner, currentPath) {
  const jspHeader = fs
    .readFileSync(path.join(__filename, "..", "Java", "header.jsp"))
    .toString();
  const importsPath = path.join(process.cwd(), "custom.jsp");
  const jspCustomImports = checkIfFileExists(importsPath)
    ? fs.readFileSync(importsPath).toString()
    : "";

  return new Promise(function (resolve, reject) {
    Sanitizehtml(
      path.join(currentPath, "SankhyaBuild", "index.html"),
      spinner,
      currentPath
    ).then((data) => {
      let result = jspHeader + "\n" + jspCustomImports + "\n" + data;

      // TreatJSFiles();
      // TreatMEDIAFiles();
      fs.writeFile(
        path.join(currentPath, "SankhyaBuild", "index.jsp"),
        result,
        "utf8",
        async function (err) {
          if (err) return console.log(err);
          zipDirectory(
            path.join(currentPath, "SankhyaBuild"),
            path.join(currentPath, "./SankhyaBuild.zip"),
            spinner
          )
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
