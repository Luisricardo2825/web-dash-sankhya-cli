import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { buildCommand, paramCommand,componentCommand } from "./src/commands/index.js";

let yarg = yargs(hideBin(process.argv)).usage("Usage: npx $0");
yarg = paramCommand(yarg);
yarg = buildCommand(yarg);
yarg = componentCommand(yarg);
yarg.argv;
