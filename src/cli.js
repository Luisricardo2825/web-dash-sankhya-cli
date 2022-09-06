#!/usr/bin/env node
import arg from "arg";
import Build from "./scripts/Build/index.js";
import { ask } from "./utils/ask.js";
import { removeParam, setNewParams } from "./scripts/parameters/Parameters.js";
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--typescript": Boolean,
      "--build": Boolean,
      "--param": Boolean,
      "--name": String,
      "--delete": Boolean,
      "--create": Boolean,
      "-n": "--name",
      "-ts": "--typescript",
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
    skip: args["--yes"] || false,
    typescript: args["--typescript"] || false,
    param: args["--param"] || false,
    build: args["--build"] || false,
    name: args["--name"] || undefined,
    create: args["--create"] || false,
    delete: args["--delete"] || false,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  let action = "";
  if (options.param) {
    if (options.create) {
      action = "create";
    }
    if (options.delete) {
      action = "delete";
    }
    await ParamDash(action, options.name);
  }
  if (options.build) {
    await Build();
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
  if (action == "create") {
    await setNewParams(argv.name || name)
      .then(function (newParams) {
        console.log("Parametro criado:", newParams);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  }
  if (action == "delete") {
    await removeParam(argv.name || name)
      .then(function (param) {
        console.log("Parametro deletado:", param);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  }
};
