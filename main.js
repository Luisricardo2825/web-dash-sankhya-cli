#!/usr/bin/env node
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { buildCommand, paramCommand } from "./src/commands/index.js";

let yarg = yargs(hideBin(process.argv)).usage("Usage: rsc");
yarg = paramCommand(yarg);
yarg = buildCommand(yarg);
yarg.help("h").alias("h", "help").scriptName("").argv;
