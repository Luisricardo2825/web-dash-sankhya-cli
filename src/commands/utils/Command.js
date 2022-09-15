export const CommandString = (baseCommand, params) => {
  let command = baseCommand;
  params.forEach((item) => {
    command += ` [${item.name}]`;
  });

  return command;
};

export const TreatDefaultValues = (yargs, data = []) => {
  let RetObject = {};
  data.forEach((item) => {
    const adItem = yargs.default(item.name, item.default);
    RetObject = { ...RetObject, adItem };
  });
  return RetObject;
};
