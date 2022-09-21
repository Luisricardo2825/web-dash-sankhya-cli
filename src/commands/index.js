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
import { routeAskOptions, RouteHandler } from "./functions/route.js";

export const buildCommand = (yargs) => {
  const baseCommand = "build";
  const command = CommandString(baseCommand, buildAskParams);
  return yargs.command({
    command: command,
    aliases: [baseCommand, baseCommand[0]],
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
    aliases: [baseCommand, baseCommand[0]],
    desc: "Create or delete parameters",
    builder: (yargs) => TreatDefaultValues(yargs, paramsAskOptions),
    handler: ParamHandler,
  });
};
export const componentCommand = (yargs) => {
  const baseCommand = "component";
  const command = CommandString(baseCommand, componentAskParams);
  return yargs.command({
    command: command,
    aliases: [baseCommand, baseCommand[0]],
    desc: "Create new component",
    builder: (yargs) =>
      Object.assign(TreatDefaultValues(yargs, componentAskParams), {
        desc: "Teste",
      }),
    handler: async (argv) => {
      const args = await argv;
      if (argv.ts) {
        argv.lang = "TypeScript";
      }
      if (!argv.name) {
        let askQ = componentAskParams.filter((arg) =>
          !args[arg.name] ? arg : null
        );

        argv = await AskForMissing(askQ, argv);
      }
      const useTs = argv.lang === "TypeScript" ? true : false;
      CreateNewPage(argv.name, "./src/pages", useTs);
    },
  });
};

export const routeCommand =(yargs) => {
  const baseCommand = "route";
  const command = CommandString(baseCommand, routeAskOptions);
  return yargs.command({
    command: command,
    aliases: [baseCommand, baseCommand[0]],
    desc: "Create route",
    builder: (yargs) => TreatDefaultValues(yargs, routeAskOptions),
    handler: RouteHandler,
  });
};
