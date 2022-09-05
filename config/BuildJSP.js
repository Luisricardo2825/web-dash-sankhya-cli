import fs, { readFileSync } from "fs";
import archiver from "archiver";
import { Sanitizehtml } from "./cherrio.js";
import path from "path";
import { ParamsFile } from "./Params.js";
const parameters = ParamsFile(process.cwd())
const jspHeader = `<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8" isELIgnored ="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="java.util.*" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib prefix="snk" uri="/WEB-INF/tld/sankhyaUtil.tld" %>`;

export function BuildJsp(spinner, currentPath) {
  return new Promise(function (resolve, reject) {
    Sanitizehtml(
      path.join(currentPath, "SankhyaBuild", "index.html"),
      spinner
    ).then((data) => {
      let result = jspHeader + "\n" + data;

      result = result.replace("%PUBLIC_URL%", "${BASE_FOLDER}");
      result = result.replace(`"$SANKHYA_PARAMETERS$"`, `${parameters}`);

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
