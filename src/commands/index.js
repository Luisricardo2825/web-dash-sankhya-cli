import { ParamHandler, paramsAskOptions } from "./functions/param.js";
import { buildAskParams } from "./functions/build.js";
import Build from "./scripts/Build/index.js";
import { CommandString, TreatDefaultValues } from "./utils/index.js";

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
