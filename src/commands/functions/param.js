import { AskForMissing } from "../utils/index.js";
import { setNewParams, removeParam } from "../scripts/parameters/index.js";

export const ParamHandler = async (argv, params) => {
  argv = await AskForMissing(params || paramsAskOptions, argv);
  const { name, action } = argv;
  if (action == "create") {
    await setNewParams(name, process.cwd())
      .then(function (newParams) {
        console.log("Parametro criado:", newParams);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  }
  if (action == "delete") {
    await removeParam(name, process.cwd())
      .then(function (param) {
        console.log("Parametro deletado:", param);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  }
};

export const paramsAskOptions = [
  {
    name: "name",
    message: "Digte o nome do parametro:",
    default: undefined,
  },
  {
    name: "action",
    message: "Escolha a ação a ser executada:",
    default: undefined,
    type: "list",
    choices: ["create", "delete"],
  },
];
