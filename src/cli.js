#!/usr/bin/env node
import Build from "./scripts/Build/index.js";

const currentPath = process.cwd();

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  let action = "";
  if (options.param) {
    console.log("Entrou aqui PARAM");
    if (options.create) {
      action = "create";
    }
    if (options.delete) {
      action = "delete";
    }
    await ParamDash(action, options.name);
  }
  if (options.build) {
    await Build(currentPath);
  }
  if (options.component) {
    // const status = CreateNewPage(
    //   options.component,
    //   currentPath,
    //   options.typescript
    // );
    // if (status) {
    //   console.log("Componente criado com sucesso!");
    // }
    ComponentDash();
  }
}
