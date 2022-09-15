#!/usr/bin/env node
import arg from "arg";
import Build from "./scripts/Build/index.js";
import { ask } from "./utils/ask.js";
import { removeParam, setNewParams } from "./scripts/parameters/Parameters.js";
import CreateNewPage from "./scripts/Components/index.js";

const currentPath = process.cwd();

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--typescript": Boolean,
      "--build": Boolean,
      "--param": Boolean,
      "--name": String,
      "--delete": Boolean,
      "--create": Boolean,
      "--component": String,
      "-n": "--name",
      "-": "--component",
      "-t": "--typescript",
      "-p": "--param",
      "-b": "--build",
      "-c": "--create",
      "-d": "--delete",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    typescript: args["--typescript"] || false,
    param: args["--param"] || false,
    build: args["--build"] || false,
    name: args["--name"] || undefined,
    create: args["--create"] || false,
    delete: args["--delete"] || false,
    component: args["--component"] || undefined,
  };
}

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

const ParamDash = async (action, name) => {
  let options = name
    ? {}
    : {
        name: {
          // inquirer
          message: "Digite o nome do parametro",
          // yargs
          demandOption: false,
          describe: "Nome do parametro",
          // shared
          type: "string",
        },
      };
  if (action.length <= 0) {
    options = {
      ...options,
      acao: {
        // inquirer
        message: "Escolha o que deseja fazer com o parametro",
        choices: ["create", "delete"],
        // yargs
        demandOption: false,
        describe: "Ação a realizar com o parametro informado",
        // shared
        type: "list",
      },
    };
  }
  const argv = await ask(options);

  action = argv.acao ? argv.acao : action;

};
const ComponentDash = async (name) => {
  let options = {
    name: {
      // inquirer
      message: "Digite o nome do componente",
      // yargs
      demandOption: false,
      describe: "Nome do componente",
      // shared
      type: "string",
    },
  };

  const argv = await ask(options);
};
