#!/usr/bin/env node
import { BuildJsp } from "./BuildJSP.js";
import * as fsExt from "fs-extra";
import * as fs from "fs";
import ora from "ora";
import * as path from "path";
import chalk from "chalk";

const Build = async (currentPath) => {
  const spinner = ora({
    spinner: "flip",
    prefixText: "Iniciando...\n",
  }).start();

  const buildPath = path.join(currentPath, "build");
  const destPath = path.join(currentPath, "SankhyaBuild");
  const zipPath = path.join(currentPath, "SankhyaBuild.zip");

  if (fs.existsSync(destPath))
    fs.rmSync(destPath, { recursive: true, force: true });
  if (fs.existsSync(zipPath)) fs.rmSync(zipPath, { recursive: true, force: true });

  // copy source folder to destination
  await fsExt.copy(buildPath, destPath, function (err) {
    if (err) {
      spinner.fail("Ocorreu um erro durante a build: " + err.message);
      return;
    }
    const antes = Date.now();
    BuildJsp(spinner, currentPath)
      .then(function (build) {
        const duracao = Date.now() - antes;
        spinner.stop();
        spinner.succeed("Finished building");
        console.log("\nDuracao: " + chalk.green(+duracao + "ms"));
      })
      .catch(function (err) {
        spinner.fail("A error occurred during building:" + err.message);
      });
  });
};

export default Build;
