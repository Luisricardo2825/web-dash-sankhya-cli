import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { removeParam, setNewParams } from "./src/scripts/parameters/Parameters.js";
import { ask } from "./src/utils/ask.js";

yargs(hideBin(process.argv))
  .usage("Usage: npx $0")
  .command({
    command: "build  [app]",
    aliases: ["build", "b"],
    desc: "Build a app",
    builder: (yargs) => yargs.default("app", undefined),
    handler: (argv) => {
      console.log(`Building the app: ${argv.app}...`);
    },
  })
  .command({
    command: "param  [name] [action]",
    aliases: ["param", "p"],
    desc: "Build a app",
    builder: (yargs) => {
      let app = yargs.default("name", undefined);
      let action = yargs.default("action", undefined);
      return { ...action, ...app };
    },
    handler: async (argv) => {
      const params = [
        { name: "name", message: "Digte o nome do parametro:" },
        { name: "action", message: "Escolha a ação a ser executada:" },
      ];
      argv = await AskForMissing(params, argv);
      const { name, action } = argv;
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
    },
  })
  .help().argv;

function CreateOption(name, message, type) {
  return {
    [name]: {
      // inquirer
      message: message,
      // shared
      type: type || "string",
    },
  };
}

async function AskForMissing(params, argv) {
  const options = {};

  params.forEach((key) => {
    if (argv[key.name] === undefined) {
      Object.assign(options, CreateOption(key.name, key.message));
    }
  });

  argv = { ...argv, ...(await ask(options)) };
  return argv;
}
