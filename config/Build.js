#!/usr/bin/env node
import { BuildJsp } from "./BuildJSP.js";
import * as fsExt from "fs-extra";
import ora from "ora";
import * as path from "path";
import chalk from "chalk";
const dir = "./SankhyaBuild";

const Build = async () => {
  const spinner = ora({
    spinner: "arc",
    prefixText: "Iniciando...\n",
  }).start();
  const currentPath = process.cwd();
  // copy source folder to destination
  await fsExt.copy(path.join(currentPath, "build"), dir, function (err) {
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
