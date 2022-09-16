import { ParamHandler, paramsAskOptions } from "./functions/param.js";
import { buildAskParams } from "./functions/build.js";
import { componentAskParams } from "./functions/component.js";
import Build from "./scripts/Build/index.js";
import CreateNewPage from "./scripts/Components/index.js";
import {
  AskForMissing,
  CommandString,
  TreatDefaultValues,
} from "./utils/index.js";

export const buildCommand = (yargs) => {
  const baseCommand = "build";
  const command = CommandString(baseCommand, buildAskParams);
  return yargs.command({
    command: command,
    aliases: [baseCommand],
    desc: "Build a app",
    builder: (yargs) => TreatDefaultValues(yargs, buildAskParams),
    handler: (argv) => {
      Build(argv.DirPath);
    },
  });
};
export const paramCommand = (yargs) => {
  const baseCommand = "param";
  const command = CommandString(baseCommand, paramsAskOptions);
  return yargs.command({
    command: command,
    aliases: [baseCommand, baseCommand.substring(0, 4)],
    desc: "Create or delete parameters",
    builder: (yargs) => TreatDefaultValues(yargs, paramsAskOptions),
    handler: ParamHandler,
  });
};
export const componentCommand = (yargs) => {
  const baseCommand = "component";
  const command = CommandString(baseCommand, componentAskParams);
  console.log(command + " [ts]");
  return yargs.command({
    command: command,
    aliases: [baseCommand],
    desc: "Create new component",
    builder: (yargs) => TreatDefaultValues(yargs, componentAskParams),
    handler: async (argv) => {
      console.log(argv);
      if (argv.typescript && argv.componentName) {
        argv = await AskForMissing(componentAskParams, argv);
      } else {
        argv.typescript = true;
      }
      argv.typescript = false;
      CreateNewPage(argv.componentName, "./src/pages", argv.typescript);
    },
  });
};
