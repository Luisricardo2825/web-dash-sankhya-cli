import inquirer from "inquirer";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

function getPrompts(options) {
  return Object.entries(options).map(
    ([name, { choices, default: _default, message, type, ...rest }]) => ({
      choices,
      default: _default,
      message,
      name,
      type,
      ...rest,
    })
  );
}

function getOptions(options) {
  return Object.entries(options).reduce(
    (
      previous,
      [name, { choices, default: _default, demandOption, describe, type }]
    ) => {
      previous[name] = {
        default: _default,
        demandOption,
        describe,
        type,
      };
      return previous;
    },
    {}
  );
}

export const ask = async (options) => {
  const hideBinArgv = hideBin(process.argv);
  let inquirerOptions = getPrompts(options);
  let selectedOptions = [];

  selectedOptions = hideBinArgv
    .filter((option) => option.includes("--") && option)
    .map((option) => option.replace("--", ""));
  if (selectedOptions.length < inquirerOptions.length) {
    inquirerOptions = inquirerOptions.filter(
      (option) => !selectedOptions.includes(option.name) && option
    );

    const answers = await inquirer.prompt(inquirerOptions);
    Object.entries(answers).forEach(([key, value]) => {
      value && hideBinArgv.push(`--${key}`, value);
    });
  }

  const argv = yargs(hideBinArgv)
    .usage("Usage: npx $0")
    .options(getOptions(options))
    .parseSync();

  return argv;
};
